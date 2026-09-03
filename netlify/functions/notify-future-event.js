// Sends an email notification whenever a Future event is added or edited
// via the Dashboard. Called (fire-and-forget) from
// src/context/EventsContext.jsx. Runs server-side only, via Netlify — sends
// through the site owner's own Gmail account over SMTP, using an app
// password read from an env var here that never reaches the browser
// bundle. (Previously used Resend's onboarding@resend.dev sandbox sender,
// which Resend restricts to only deliver to the account's own signup
// email — no good for a 3-person recipient list without a verified
// domain. Gmail SMTP has no such restriction.)
import nodemailer from "nodemailer";

const RECIPIENTS = [
  "ian.lancaster1971@gmail.com",
  "simon.green1960@virginmedia.com",
  "leonard.lu.77@gmail.com",
];

const SITE_URL = "https://expmo.netlify.app/";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  if (!gmailUser || !gmailAppPassword) {
    console.error("GMAIL_USER / GMAIL_APP_PASSWORD is not set");
    return { statusCode: 500, body: "Email not configured" };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const { action, title, date, location, venue } = payload;
  if (!title) {
    return { statusCode: 400, body: "Missing title" };
  }

  const verb = action === "updated" ? "updated" : "added";
  const subject = `Future event ${verb}: ${title}`;
  const html = `
    <p>A future event has been ${verb} on the Ex-Ford PMO Meet Up site:</p>
    <ul>
      <li><strong>Event title:</strong> ${escapeHtml(title)}</li>
      <li><strong>Date:</strong> ${escapeHtml(date || "Not set")}</li>
      <li><strong>Location:</strong> ${escapeHtml(location || "Not set")}</li>
      <li><strong>Where?:</strong> ${escapeHtml(venue || "Not set")}</li>
    </ul>
    <p>More details: <a href="${SITE_URL}">${SITE_URL}</a></p>
  `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailAppPassword },
  });

  try {
    await transporter.sendMail({
      from: `"Ex-Ford PMO Meet Up" <${gmailUser}>`,
      to: RECIPIENTS,
      subject,
      html,
    });
  } catch (err) {
    console.error("Gmail send error:", err);
    return { statusCode: 502, body: "Failed to send email" };
  }

  return { statusCode: 200, body: "OK" };
};

function escapeHtml(str) {
  return String(str).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
