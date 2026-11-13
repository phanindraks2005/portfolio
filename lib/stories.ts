export type Media = { video?: string; poster: string; alt: string };

export type Step = {
  title: string;
  text: string;
  laptop?: Media;
  phone?: Media;
};

const clip = (name: string, alt: string): Media => ({ video: `/media/${name}`, poster: `/media/${name}.webp`, alt });

// Each project's story: the device stays put while these steps scroll past, and its screen follows the active step.
export const stories: Record<string, Step[]> = {
  stride: [
    {
      title: "The day at a glance",
      text: "Today leads with the current and best streak, a 12-week heatmap and goals hit per tracker this week, with a one-line read of the week from Libra. Any logged day counts toward the streak.",
      laptop: clip("stride-streak", "Stride's Today page loading: the streak counts up and the heatmap fills in"),
      phone: { poster: "/shots/stride-today-phone.webp", alt: "Stride's Today page on a phone" },
    },
    {
      title: "Trackers that fill as you log",
      text: "Track anything with a unit and a daily target. Each tracker has its own colour and a wave that fills toward the target; quick-add buttons are sized to its unit and update the total instantly.",
      laptop: clip("stride-trackers", "Scrolling to Stride's tracker cards and opening a tracker's entries"),
    },
    {
      title: "Libra, the AI copilot",
      text: "A Gemini copilot with function calling. It reads your trackers, logs, notes and workouts, and can log entries, create trackers and write meal or workout plans. Replies stream in, and what it did shows as chips.",
      laptop: clip("stride-libra", "Libra's chat: logged entries shown as chips and a workout plan as a checklist"),
    },
    {
      title: "Week, month and year",
      text: "Progress reads the period in one line, charts every tracker against its goal and compares it with the period before. It pages through every log, so long histories aren't cut off at Supabase's 1,000-row limit.",
      laptop: clip("stride-progress", "Stride's Progress page switching from week to month to year"),
    },
  ],
  medivault: [
    {
      title: "One calendar for the whole family",
      text: "Due and overdue vaccinations and prescription dates on a month view, each family member in their own colour. Red is kept for overdue items and allergies.",
      laptop: clip("mv-dashboard", "MediVault's dashboard with the family calendar and what's coming up"),
      phone: { poster: "/shots/medivault-public-card.webp", alt: "MediVault's public emergency card on a phone" },
    },
    {
      title: "Prescriptions read by Gemini",
      text: "Upload a photo or PDF and Gemini pulls out the doctor, the date and each medicine with dose and frequency. The record page shows the original next to what was read, so anything can be corrected.",
      laptop: clip("mv-record", "Opening a record: the prescription next to the doctor, date and medicines read from it"),
    },
    {
      title: "Doc answers from your records",
      text: "A chat assistant grounded in the family's own records: “what is Dad taking for blood pressure?”. It gives general guidance only and points to a doctor for anything serious.",
      laptop: clip("mv-doc", "Asking Doc what Dad takes for blood pressure and getting an answer from the records"),
    },
    {
      title: "A QR card for emergencies",
      text: "A public card a paramedic can open without logging in: allergies first, blood group, current medicines, Call 112 / 108. The link's 256-bit token is stored only as a SHA-256 hash and can be revoked or set to expire.",
      laptop: clip("mv-qr", "The emergency card and its Share via QR panel with downloads, expiry and last opened times"),
      phone: clip("mv-card-phone", "The public emergency card opened from the QR on a phone"),
    },
  ],
  roadsense: [
    {
      title: "A reading every second",
      text: "While tracking is on, the phone streams GPS readings (time, position, speed) to a FastAPI backend once a second.",
    },
    {
      title: "Finding the speed drop",
      text: "When a trip ends the backend scans the trace for candidate events: a speed drop of at least 20% that recovers within 5 seconds. Slowing for traffic or a turn looks different.",
    },
    {
      title: "Scoring each event",
      text: "A scikit-learn Random Forest scores each event on speed before, minimum speed, drop, deceleration, recovery time and jerk, keeping those above 0.70. A bump is confirmed once it's detected twice within 20 m. The current model is trained on synthetic data.",
    },
    {
      title: "Warning the driver",
      text: "Every user sees confirmed bumps on an OpenStreetMap map, with a “Speed Bump Ahead” banner and a voice alert at 400 m and again at 60 m.",
    },
  ],
};
