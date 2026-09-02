// Sends an email notification whenever a Future event is added or edited
// via the Dashboard. Called (fire-and-forget) from
// src/context/EventsContext.jsx. Runs server-side only, via Netlify — the
// Resend API key is read from an env var here and never reaches the
// browser bundle.
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
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

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Ex-Ford PMO Meet Up <onboarding@resend.dev>",
      to: RECIPIENTS,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Resend error:", res.status, text);
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
