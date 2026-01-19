export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://devadath.dev/",
    "name": "Devadath S",
    "url": "https://devadath.dev/",
    "givenName": "Devadath",
    "familyName": "S",
    "alternateName": "Devadath",
    "gender": "Male",
    "description": "Developer, AI & Robotics Engineer, and Entrepreneur building innovative AI systems, robots, and software products.",
    "email": "mailto:devadaths3@gmail.com",
    "nationality": "Indian",
    "jobTitle": [
      "AI & Robotics Developer",
      "Full Stack Developer",
      "Software Engineer",
      "Founder"
    ],
    "image": "https://devadath.dev/avatar.jpg",
    "sameAs": [
      "https://www.linkedin.com/in/dev-devadath",
      "https://github.com/Dev-devadath",
      "https://twitter.com/Dev_devadath",
      "https://instagram.com/dev.devadath"
    ],
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "Robotics",
      "AI Agents",
      "Natural Language Processing",
      "Computer Vision",
      "Software Development",
      "Web and App Development",
      "Robotic Perception",
      "Autonomous Systems",
      "Object Detection",
      "Speech and Voice Interfaces",
      "Embedded Systems"
    ],
    "skills": [
      "Python",
      "JavaScript",
      "React",
      "Django",
      "TensorFlow",
      "OpenCV",
      "ROS2",
      "ESP32 Robotics",
      "AI Model Integration",
      "Full Stack Development"
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Devbotics"
      }
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Devbotics",
      "url": "https://devadath.dev/"
    },
    "hasOccupation": [
      {
        "@type": "Occupation",
        "name": "AI Developer"
      },
      {
        "@type": "Occupation",
        "name": "Robotics Engineer"
      },
      {
        "@type": "Occupation",
        "name": "Software Engineer"
      }
    ],
    "portfolio": [
      {
        "@type": "CreativeWork",
        "name": "Jarvis AI Humanoid Robot",
        "description": "An advanced AI humanoid companion robot with NLP, voice interaction, facial & object recognition, and gesture understanding.",
        "url": "https://devadath.dev/projects/",
        "keywords": [
          "AI",
          "Humanoid Robot",
          "NLP",
          "Computer Vision",
          "Robotics"
        ]
      },
      {
        "@type": "CreativeWork",
        "name": "WhaToEat",
        "description": "AI-driven smart food discovery platform that recommends best dishes and restaurants using ratings and reviews.",
        "url": "https://devadath.dev/projects",
        "keywords": ["AI", "Recommendation System", "Web App"]
      },
      {
        "@type": "CreativeWork",
        "name": "ChapterGenie",
        "description": "Web tool that auto-generates YouTube video chapters by analyzing transcripts with AI.",
        "url": "https://devadath.dev/projects",
        "keywords": ["AI", "Transcript Analysis", "Web Tool"]
      }
    ],

    "award": [
      "Young Innovator Award",
      "NASA Space Apps Challenge Winner",
      "Multiple Hackathon Winner",
      "Indian Science Fair Champion"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "devadaths3@gmail.com",
      "contactType": "work"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

