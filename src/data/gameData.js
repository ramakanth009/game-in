// Game questions data
export const questions = [
  {
    title: "Do you prefer...",
    subtitle: "Choose what appeals to you more",
    option1: { 
      emoji: "🛠️", 
      text: "Building things", 
      description: "Creating solutions from scratch"
    },
    option2: { 
      emoji: "📊", 
      text: "Analyzing data", 
      description: "Finding patterns and insights"
    },
    traits: {
      option1: { creative: 10, analytical: 5, social: 0, technical: 15 },
      option2: { creative: 5, analytical: 15, social: 0, technical: 10 }
    }
  },
  {
    title: "Are you more of a...",
    subtitle: "What's your thinking style?",
    option1: { 
      emoji: "🎨", 
      text: "Visual thinker", 
      description: "You think in images and designs"
    },
    option2: { 
      emoji: "🧮", 
      text: "Logical thinker", 
      description: "You think in systems and procedures"
    },
    traits: {
      option1: { creative: 15, analytical: 5, social: 5, technical: 5 },
      option2: { creative: 5, analytical: 15, social: 0, technical: 10 }
    }
  },
  {
    title: "Do you enjoy...",
    subtitle: "Where do you focus your energy?",
    option1: { 
      emoji: "👥", 
      text: "Working with people", 
      description: "Collaborating and communicating"
    },
    option2: { 
      emoji: "💻", 
      text: "Working with technology", 
      description: "Focusing on technical challenges"
    },
    traits: {
      option1: { creative: 5, analytical: 0, social: 20, technical: 5 },
      option2: { creative: 5, analytical: 10, social: 0, technical: 15 }
    }
  },
  {
    title: "Which appeals to you more?",
    subtitle: "Consider your natural interests",
    option1: { 
      emoji: "🔒", 
      text: "Security & Protection", 
      description: "Safeguarding systems and data"
    },
    option2: { 
      emoji: "📱", 
      text: "User Experience", 
      description: "Creating intuitive interfaces"
    },
    traits: {
      option1: { creative: 0, analytical: 15, social: 5, technical: 10 },
      option2: { creative: 15, analytical: 5, social: 10, technical: 0 }
    }
  },
  {
    title: "Which do you value more?",
    subtitle: "In your work approach",
    option1: { 
      emoji: "🔍", 
      text: "Depth & Detail", 
      description: "Diving deep into specific areas"
    },
    option2: { 
      emoji: "🌐", 
      text: "Breadth & Versatility", 
      description: "Working across multiple domains"
    },
    traits: {
      option1: { creative: 5, analytical: 10, social: 0, technical: 15 },
      option2: { creative: 10, analytical: 5, social: 10, technical: 5 }
    }
  },
  {
    title: "Do you prefer to...",
    subtitle: "Think about your problem-solving approach",
    option1: { 
      emoji: "📈", 
      text: "Optimize existing systems", 
      description: "Making things more efficient"
    },
    option2: { 
      emoji: "🚀", 
      text: "Innovate new solutions", 
      description: "Creating novel approaches"
    },
    traits: {
      option1: { creative: 5, analytical: 15, social: 0, technical: 10 },
      option2: { creative: 15, analytical: 5, social: 5, technical: 5 }
    }
  },
  {
    title: "Are you drawn to...",
    subtitle: "Which motivates you more?",
    option1: { 
      emoji: "🎯", 
      text: "Strategic planning", 
      description: "Setting goals and planning campaigns"
    },
    option2: { 
      emoji: "⚙️", 
      text: "Technical execution", 
      description: "Building functional systems"
    },
    traits: {
      option1: { creative: 10, analytical: 10, social: 10, technical: 0 },
      option2: { creative: 5, analytical: 5, social: 0, technical: 20 }
    }
  },
  {
    title: "Do you enjoy...",
    subtitle: "How do you approach problems?",
    option1: { 
      emoji: "🧩", 
      text: "Solving puzzles", 
      description: "Finding solutions to complex problems"
    },
    option2: { 
      emoji: "🗣️", 
      text: "Storytelling", 
      description: "Communicating ideas and narratives"
    },
    traits: {
      option1: { creative: 5, analytical: 15, social: 0, technical: 10 },
      option2: { creative: 15, analytical: 0, social: 15, technical: 0 }
    }
  },
  {
    title: "Do you prefer to focus on...",
    subtitle: "Which aspect interests you more?",
    option1: { 
      emoji: "📊", 
      text: "Data and algorithms", 
      description: "Working with information and processes"
    },
    option2: { 
      emoji: "🖥️", 
      text: "Interfaces and experiences", 
      description: "Creating what users interact with"
    },
    traits: {
      option1: { creative: 0, analytical: 20, social: 0, technical: 10 },
      option2: { creative: 15, analytical: 0, social: 10, technical: 5 }
    }
  },
  {
    title: "Final question: Which role suits you better?",
    subtitle: "Consider your ideal work environment",
    option1: { 
      emoji: "🛡️", 
      text: "Defender", 
      description: "Protecting systems from threats"
    },
    option2: { 
      emoji: "🏗️", 
      text: "Builder", 
      description: "Creating new products and features"
    },
    traits: {
      option1: { creative: 0, analytical: 15, social: 5, technical: 10 },
      option2: { creative: 15, analytical: 5, social: 5, technical: 5 }
    }
  }
];

// Career paths data
export const careerPaths = {
  fullstack: {
    name: "Full Stack Developer",
    emoji: "👨‍💻",
    tagline: "The versatile builder of the digital world",
    description: "You enjoy building complete systems and are comfortable with many technologies. Your versatility and love for creating functional products makes Full Stack Development the perfect path for you!",
    skills: [
      "JavaScript, React, Node.js for frontend and backend development",
      "Database management and system architecture",
      "API development and integration skills",
      "DevOps fundamentals and deployment practices"
    ],
    careers: [
      "Full Stack Developer at tech companies or startups",
      "Web Application Developer creating responsive web apps",
      "Software Engineer building integrated systems",
      "Independent Consultant or Freelancer"
    ],
    thresholds: {
      creative: 60,
      analytical: 60,
      social: 30,
      technical: 80
    },
    color: "#6366f1",
    model: "laptopCoding"
  },
  datascience: {
    name: "Data Scientist",
    emoji: "📊",
    tagline: "The analytical mind uncovering insights",
    description: "You have a strong analytical mindset and enjoy finding patterns in data. Your ability to think logically and solve complex problems makes Data Science an ideal career path for you!",
    skills: [
      "Python, R, and SQL for data manipulation and analysis",
      "Statistical analysis and machine learning algorithms",
      "Data visualization and storytelling with data",
      "Problem-solving with large and complex datasets"
    ],
    careers: [
      "Data Scientist extracting insights from complex data",
      "Machine Learning Engineer building predictive models",
      "Business Intelligence Analyst supporting decision making",
      "Data Engineer creating data pipelines and infrastructure"
    ],
    thresholds: {
      creative: 30,
      analytical: 90,
      social: 40,
      technical: 70
    },
    color: "#8b5cf6",
    model: "dataAnalytics"
  },
  marketing: {
    name: "Digital Marketing Specialist",
    emoji: "📱",
    tagline: "The strategic communicator driving engagement",
    description: "You have a creative mind paired with strategic thinking and social skills. Your ability to communicate effectively and understand user psychology makes Digital Marketing an excellent fit for you!",
    skills: [
      "Content strategy and social media management",
      "SEO and SEM techniques for improved visibility",
      "Analytics tools to measure campaign effectiveness",
      "Understanding user behavior and conversion optimization"
    ],
    careers: [
      "Digital Marketing Manager overseeing online campaigns",
      "Social Media Strategist building brand presence",
      "SEO/SEM Specialist optimizing online visibility",
      "Content Marketing Manager creating compelling content"
    ],
    thresholds: {
      creative: 70,
      analytical: 50,
      social: 80,
      technical: 30
    },
    color: "#ec4899",
    model: "marketingStrategy"
  },
  cybersecurity: {
    name: "Cybersecurity Specialist",
    emoji: "🔒",
    tagline: "The guardian of digital systems",
    description: "You have a detail-oriented mind and enjoy solving complex security puzzles. Your analytical thinking and focus on protection makes Cybersecurity an ideal career path for you!",
    skills: [
      "Network security and threat detection",
      "Security auditing and vulnerability assessment",
      "Incident response and security protocols",
      "Understanding of encryption and security standards"
    ],
    careers: [
      "Security Analyst monitoring and responding to threats",
      "Penetration Tester finding vulnerabilities",
      "Security Engineer designing secure systems",
      "Cybersecurity Consultant advising organizations"
    ],
    thresholds: {
      creative: 20,
      analytical: 80,
      social: 40,
      technical: 90
    },
    color: "#10b981",
    model: "securityShield"
  },
  uxui: {
    name: "UX/UI Designer",
    emoji: "🎨",
    tagline: "The creative mind behind intuitive experiences",
    description: "You have a creative mindset with a strong focus on user needs. Your ability to think visually and empathize with users makes UX/UI Design the perfect career path for you!",
    skills: [
      "User research and persona development",
      "Wireframing and prototyping tools",
      "Visual design principles and interface design",
      "User testing and iterative design processes"
    ],
    careers: [
      "UX Designer focusing on user experience and flow",
      "UI Designer creating visually appealing interfaces",
      "Product Designer shaping digital products",
      "Interaction Designer creating engaging experiences"
    ],
    thresholds: {
      creative: 90,
      analytical: 40,
      social: 70,
      technical: 30
    },
    color: "#f59e0b",
    model: "designCreative"
  }
};