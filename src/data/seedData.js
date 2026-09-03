// Default demo content. This is what visitors see the first time the site
// runs (and what re-seeds Firestore if it's ever empty). Everything here can
// be edited, added to, or deleted from the Dashboard once the site is live.

export const seedSiteContent = {
  heroEyebrow: "Ex-PMO Team\nSocial Calendar",
  heroTitle: "",
  heroSubtitle: "",
  aboutTitle: "What is this, exactly?",
  aboutText:
    "A loose, very unofficial reunion crew for anyone who survived the Ford PMO. No agendas, no RAID logs, no steering committee — just a semi-regular excuse to catch up over food and a few drinks. Plan it, manage it, deliver it, and call it a success. That's the whole methodology.",
  ringLabels: [
    {
      key: "plan",
      title: "Plan",
      caption: "Pick a date everyone will still cancel on.",
    },
    {
      key: "manage",
      title: "Manage",
      caption: "Herd the group chat into one place, one time.",
    },
    {
      key: "deliver",
      title: "Deliver",
      caption: "Actually show up. Revolutionary, we know.",
    },
    {
      key: "succeed",
      title: "Succeed",
      caption: "A good night out and nobody mentions Agile.",
    },
  ],
};

export const seedEvents = [
  // ---------------------------------------------------------------- FUTURE
  {
    id: "brentwood-autumn-social",
    category: "future",
    title: "Brentwood Autumn Social",
    date: "2026-09-25",
    time: "19:00",
    location: "Brentwood, Essex",
    venue: "The Ropemakers, High Street",
    eats: "Pub grub & sharing boards",
    website: "https://example.com/the-ropemakers",
    directions: "https://maps.google.com/?q=The+Ropemakers+Brentwood",
    description:
      "First one of the autumn run. Nothing fancy — just a table booked, a few rounds in, and everyone comparing how much greyer we've all gotten.",
  },
  {
    id: "guildford-quiz-night",
    category: "future",
    title: "Guildford Quiz Night",
    date: "2026-10-16",
    time: "19:30",
    location: "Guildford, Surrey",
    venue: "The Astolat, Epsom Road",
    eats: "Sunday roast menu (Friday version)",
    website: "https://example.com/the-astolat",
    directions: "https://maps.google.com/?q=The+Astolat+Guildford",
    description:
      "Team up pub-quiz style. Ex-PMO team, so obviously we'll over-plan the table seating and still lose to the questions about pop music.",
  },

  // -------------------------------------------------------------- POTENTIAL
  {
    id: "colchester-christmas-do",
    category: "potential",
    title: "Colchester Christmas Do",
    date: "2026-12-11",
    time: "18:30",
    location: "Colchester, Essex",
    venue: "TBC — leaning towards The Hospital Tavern",
    eats: "Christmas set menu",
    website: "",
    directions: "https://maps.google.com/?q=Colchester+town+centre",
    description:
      "The big annual one. Needs numbers before we book a table, so vote if you're even vaguely thinking about it.",
    votes: 14,
  },
  {
    id: "chelmsford-curry-night",
    category: "potential",
    title: "Chelmsford Curry Night",
    date: "2026-11-06",
    time: "19:00",
    location: "Chelmsford, Essex",
    venue: "Bhoomi's, Duke Street",
    eats: "Indian",
    website: "",
    directions: "https://maps.google.com/?q=Chelmsford",
    description:
      "Low-key curry night, midweek-adjacent. Someone always orders a vindaloo they can't handle. Vote if you're in.",
    votes: 9,
  },
  {
    id: "reunion-weekend-away",
    category: "potential",
    title: "Reunion Weekend Away",
    date: "2027-05-14",
    time: "",
    location: "Somewhere near the coast",
    venue: "Undecided — suggestions welcome",
    eats: "Whatever's local",
    website: "",
    directions: "",
    description:
      "The ambitious one. A full weekend away instead of just a Friday night. Needs a lot of votes (and a lot of planning) before it's real.",
    votes: 21,
  },

  // ------------------------------------------------------------------ PAST
  {
    id: "southend-meet-up",
    category: "past",
    title: "Southend Meet Up",
    date: "2026-08-28",
    time: "19:00",
    location: "Southend-on-Sea, Essex",
    venue: "Mawsons, Southchurch Road",
    eats: "Indian",
    website: "https://example.com/mawsons",
    directions: "https://maps.google.com/?q=Mawsons+Southchurch+Road+Southend",
    description:
      "Meet at Mawsons on Southchurch Road before heading for an Indian nearby.",
    recap:
      "Good turnout, terrible weather. Mawsons kept us dry, the curry house kept us fed. Already talking about doing Southend again.",
  },
  {
    id: "basildon-summer-bbq",
    category: "past",
    title: "Basildon Summer BBQ",
    date: "2026-06-20",
    time: "13:00",
    location: "Basildon, Essex",
    venue: "Wickford Memorial Park",
    eats: "BBQ (someone brought a gazebo)",
    website: "",
    directions: "https://maps.google.com/?q=Wickford+Memorial+Park",
    description: "Daytime BBQ meet up, kids and dogs welcome.",
    recap:
      "Sunniest day of the year, obviously the one we picked for a BBQ. Ten out of ten, minimal burnt sausages.",
  },
  {
    id: "chelmsford-christmas-social",
    category: "past",
    title: "Chelmsford Christmas Social",
    date: "2025-12-12",
    time: "19:00",
    location: "Chelmsford, Essex",
    venue: "The Ivory Peg, Duke Street",
    eats: "Christmas menu",
    website: "",
    directions: "https://maps.google.com/?q=The+Ivory+Peg+Chelmsford",
    description: "The annual Christmas get-together.",
    recap:
      "Secret Santa produced at least three regifted mugs. A tradition now, apparently.",
  },
];
