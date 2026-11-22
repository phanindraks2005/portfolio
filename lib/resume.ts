// Same content as public/resume.pdf, minus the phone number and the CGPA (the CGPA is only in the PDF).

export const resume = {
  name: "K S Phanindra",
  location: "Bengaluru, Karnataka",
  portfolio: "https://phanindra-ks.vercel.app",
  education: {
    school: "BMS College of Engineering",
    place: "Bengaluru",
    degree: "B.E. in Computer Science and Engineering",
    years: "2023 – 2027",
    interests: "Full-Stack Web Development, AI-Integrated Applications, Database Management Systems, Software Development",
  },
  leadership: [
    {
      org: "Utsav — Cultural Fest, BMSCE",
      role: "Junior Coordinator, Volunteering Committee",
      year: "2025",
      place: "Bengaluru",
      points: [
        "Led a team of 12 volunteers to ensure smooth execution of the cultural fest across all event areas.",
        "Coordinated task allocation, managed volunteer schedules, and handled on-ground logistics throughout the fest.",
      ],
    },
    {
      org: "PhaseShift — Technical Fest, BMSCE",
      role: "Volunteer",
      year: "2025",
      place: "Bengaluru",
      points: ["Contributed to technical fest operations and supported event management activities."],
    },
    {
      org: "Deathscapes — College Event, BMSCE",
      role: "Technical Team Member",
      year: "2025",
      place: "Bengaluru",
      points: ["Worked in the technical execution team, handling technical setup and coordination."],
    },
  ],
  skills: [
    { label: "Languages", items: "TypeScript, JavaScript, Python, Dart, SQL, HTML, CSS, C, C++, Java" },
    {
      label: "Frameworks & Libraries",
      items: "Next.js, React, Node.js, FastAPI, Flutter, Tailwind CSS, Framer Motion, Recharts, scikit-learn, pandas, NumPy",
    },
    { label: "Databases & Tools", items: "PostgreSQL (Supabase), SQLite, Gemini API, REST APIs, Git, GitHub, GitHub Actions, Vercel, Render" },
    { label: "CS Fundamentals", items: "DSA, DBMS, Operating Systems, Computer Networks, OOP, AI" },
    { label: "Soft Skills", items: "Problem-solving, Communication, Teamwork, Time Management, Adaptability" },
  ],
  projects: [
    {
      name: "MediVault",
      tagline: "Family Health Records & AI Assistant",
      stack: "Next.js, TypeScript, Supabase (PostgreSQL), Gemini API, Tailwind CSS, Vercel",
      github: "https://github.com/phanindraks2005/medivault",
      live: "https://medivault-ks.vercel.app/demo",
      points: [
        "Built and deployed a family health records app that reads prescription photos with Gemini OCR and organises each member’s medicines, records and vaccinations on one calendar.",
        "Secured medical data with PostgreSQL Row-Level Security, a private per-user storage bucket, token-verified API routes and per-user AI rate limits; found and fixed a cross-account file-access vulnerability during a QA audit.",
        "Built a QR emergency card that paramedics can scan without logging in, using hashed revocable tokens, expiry dates, rate limiting and a field allowlist so only emergency details are exposed.",
        "Added Doc, an AI assistant that answers questions from a family’s records, plus symptom triage and a drug-interaction checker; raised mobile Lighthouse performance from 52 to 95+.",
      ],
    },
    {
      name: "Stride",
      tagline: "Full-Stack Fitness & Habit Tracking Platform",
      stack: "Next.js, JavaScript, Supabase (PostgreSQL), Gemini API, Framer Motion, Recharts, Vercel",
      github: "https://github.com/phanindraks2005/stride",
      live: "https://stride-ks.vercel.app/demo",
      points: [
        "Built and deployed a fitness and habit tracker with workout logging, custom trackers, streaks, notes and progress charts.",
        "Integrated Libra, an in-app AI copilot on the Gemini API with tool-calling that logs activity, creates trackers, and generates meal and workout plans from natural conversation.",
        "Secured multi-user data with Supabase Auth and PostgreSQL Row-Level Security, isolating each user’s data on every table.",
        "Fixed multi-step AI requests so every tool call runs and failures are reported, and paged past Supabase’s 1,000-row limit that was silently dropping older history from streaks and charts.",
      ],
    },
    {
      name: "RoadSense",
      tagline: "Road Safety & Speed-Bump Detection App",
      stack: "Flutter, Dart, FastAPI, Python, scikit-learn, pandas, SQLite, OpenStreetMap, Render",
      github: "https://github.com/phanindraks2005/roadsense-app",
      points: [
        "Built a Flutter Android app that streams GPS speed readings every second, shows detected bumps on an OpenStreetMap map, and gives a banner and voice alert at 400 m and again at 60 m.",
        "Built a FastAPI backend on Render with SQLite that flags candidate bumps where speed drops 20%+ and recovers within 5 s.",
        "Classified each event with a scikit-learn Random Forest on 7 features (speed before, minimum speed, drop, drop %, deceleration, recovery time, jerk), keeping detections above 0.70 confidence.",
        "Added crowd validation that confirms a bump after 2 detections within 20 m, plus nearby places and CSV export.",
      ],
    },
  ],
};
