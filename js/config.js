/* =========================================================================
   PORTFOLIO CONFIGURATION — the single place to edit site content.
   -------------------------------------------------------------------------
   • Everything rendered in Expertise, Experience, Projects, Education,
     Learning, Philosophy and Contact comes from this file.
   • Leave a link as an empty string ("") to hide it everywhere on the site.
   • Paths are relative so the site works on GitHub Pages project URLs.
   ========================================================================= */
window.PORTFOLIO = {
  /* ---------------------------------------------------------------- PERSON */
  person: {
    name: "Mohiminul Islam",
    shortName: "Mohiminul",
    monogram: "MI.",
    location: "Chattogram, Bangladesh",
    email: "mohiminulshorif1201@gmail.com",
    phone: "+8801866594721",
    showPhone: true, // set to false to hide the phone number everywhere
    availability: "Open to opportunities & collaborations",
    careerStart: "2021-01", // used to calculate "years of professional experience"
  },

  /* ----------------------------------------------------------------- LINKS */
  links: {
    github: "https://github.com/mohiminul-islam"  , 
    linkedin: "https://www.linkedin.com/in/mohiminul-islam-marketing/" ,
    resume: "assets/documents/resume.pdf",
  },

  /* ---------------------------------------------------------- CONTACT FORM */
  contact: {
    /* Optional: a Formspree (https://formspree.io) form endpoint, e.g.
       "https://formspree.io/f/abcdwxyz". When empty, the form opens the
       visitor's email app with the message pre-filled (works with no setup). */
    formEndpoint: "",
  },

  /* ------------------------------------------------------------ HERO ROLES */
  roles: [
    "Software Developer",
    "ERP Solution Builder",
    "Digital Growth Strategist",
    "Business Automation Enthusiast",
    "Creative Problem Solver",
  ],

  /* ------------------------------------------------------------- EXPERTISE
     status: "applied"  → used in professional work
             "learning" → currently being learned (shown differently)        */
  expertise: [
    {
      id: "web",
      title: "Web Development",
      icon: "code",
      status: "applied",
      summary: "CMS-driven websites and PHP web applications, from WordPress builds to Laravel projects.",
      skills: ["WordPress", "PHP", "Laravel", "CMS-based solutions", "Web application development"],
      size: "wide",
    },
    {
      id: "erp",
      title: "ERP & Business Automation",
      icon: "workflow",
      status: "applied",
      summary: "Bringing operations onto systems: ERP rollout, automated workflows and better reporting.",
      skills: ["ERP implementation", "Workflow automation", "Business process optimization", "Reporting & operational systems"],
      size: "tall",
    },
    {
      id: "growth",
      title: "Digital Marketing & Growth",
      icon: "trending-up",
      status: "applied",
      summary: "Multi-channel campaigns planned around data, not guesswork.",
      skills: ["SEO", "Google Ads", "Social media advertising", "CRM systems", "Campaign management", "Marketing analytics"],
      size: "",
    },
    {
      id: "ops",
      title: "Business & Operations",
      icon: "briefcase",
      status: "applied",
      summary: "Commercial thinking from pricing tables to showroom floors.",
      skills: ["Strategic planning", "Market research", "Product pricing", "Sales operations", "Customer relationship management"],
      size: "",
    },
    {
      id: "learning",
      title: "Currently Learning",
      icon: "sparkles",
      status: "learning",
      summary: "Actively building skills in the Python ecosystem and modern full-stack development.",
      skills: ["Python", "Django", "Django REST Framework", "React & modern full-stack concepts"],
      size: "full",
    },
  ],

  /* ------------------------------------------------------------ EXPERIENCE */
  experience: [
    {
      role: "Senior Marketing Officer",
      company: "Shodesh Polli",
      companyNote: "Under Prottashi NGO",
      location: "Chattogram",
      start: "Feb 2023",
      end: "Present",
      current: true,
      points: [
        "Lead marketing strategy across multiple showroom locations, keeping every outlet aligned with company growth objectives.",
        "Coordinate showroom sales teams, pinpointing performance challenges and introducing data-driven fixes.",
        "Shape pricing strategy and oversee product distribution to optimise revenue.",
        "Plan and run targeted promotional and digital campaigns across Facebook, Instagram, LinkedIn, YouTube and paid advertising.",
        "Build and maintain marketing databases and run email campaigns.",
        "Implemented an automated ERP system that improved company-wide efficiency and reporting.",
      ],
      tags: ["Marketing Strategy", "Pricing", "Sales Teams", "Digital Campaigns", "ERP Automation"],
    },
    {
      role: "Solution Sales Executive",
      company: "Robi Axiata Ltd.",
      companyNote: "",
      location: "Chattogram",
      start: "Jun 2022",
      end: "Feb 2023",
      current: false,
      points: [
        "Researched client needs and business challenges to position the right solutions.",
        "Delivered sales presentations and product demonstrations to prospective clients.",
        "Negotiated contracts and pricing to reach mutually beneficial agreements.",
        "Built long-term client relationships that supported retention and repeat business.",
        "Managed the sales pipeline and tracked leads, meeting monthly targets through data-driven planning.",
      ],
      tags: ["Solution Sales", "Negotiation", "Client Relations", "Pipeline Management"],
    },
    {
      role: "Computer Operator",
      company: "Babul and Brothers",
      companyNote: "",
      location: "Chattogram",
      start: "Jan 2021",
      end: "Jun 2022",
      current: false,
      points: [
        "Operated computer systems, databases and network operations for smooth daily workflow.",
        "Provided software, hardware and system troubleshooting support.",
        "Oversaw data entry, storage and security with a focus on accuracy and confidentiality.",
        "Implemented and maintained data backup routines to prevent loss and enable recovery.",
        "Worked with IT teams to improve system efficiency and integrate updated software.",
      ],
      tags: ["Systems", "Databases", "Tech Support", "Data Security"],
    },
  ],

  /* -------------------------------------------------------------- PROJECTS
     category ids: "software" | "marketing" | "operations"
     cover: optional image path (e.g. "assets/images/projects/doorsdeal.webp").
            Without one, a generated cover is drawn using `accent` + `icon`.  */
  projectFilters: [
    { id: "all", label: "All" },
    { id: "software", label: "Software & ERP" },
    { id: "marketing", label: "Marketing & Growth" },
    { id: "operations", label: "Operations" },
  ],

  projects: [
    {
      id: "doorsdeal",
      featured: true,
      name: "DoorsDeal",
      category: "E-Commerce Website & ERP Solution",
      categories: ["software", "operations"],
      year: "",
      market: "United States",
      role: "Website & ERP development",
      url: "https://doorsdeal.com/",
      icon: "shopping-cart",
      accent: ["#4F8CFF", "#22D3EE"],
      cover: "",
      summary:
        "Developed the DoorsDeal e-commerce website and ERP solution for a business serving the United States market, bringing its digital storefront and business-management requirements together.",
      contributions: [
        "Website development for the customer-facing online store",
        "ERP-related system development for business management",
        "Digital commerce experience for a U.S. audience",
        "Supporting business workflows with operational technology",
      ],
      tags: ["E-Commerce", "ERP", "Web Development", "Business Workflows"],
    },
    {
      id: "grassrootsbd",
      name: "GrassrootsBD",
      category: "Handcrafted Products · Retail",
      categories: ["marketing", "software", "operations"],
      year: "2024",
      role: "Marketing, software development & operations",
      url: "",
      icon: "store",
      accent: ["#22D3EE", "#10B981"],
      summary:
        "Led marketing, software development and full-scale operations for a handcrafted-product business with 30+ outlets across Cox's Bazar, Dhaka and Chittagong.",
      contributions: ["Marketing leadership", "Software development involvement", "Operational management across 30+ outlets"],
      tags: ["Marketing", "Software", "Operations", "Retail"],
      highlight: "30+ outlets",
    },
    {
      id: "pro-marketing-club",
      name: "Pro Marketing Club",
      category: "Marketing Agency",
      categories: ["marketing", "operations"],
      year: "2022 – Present",
      role: "Founder",
      url: "",
      icon: "megaphone",
      accent: ["#8B5CF6", "#EC4899"],
      summary:
        "Founded and run a marketing agency that has delivered marketing services to more than 100 businesses.",
      contributions: ["Digital marketing", "Business development", "Growth strategies", "Client campaigns", "Agency operations"],
      tags: ["Agency", "Digital Marketing", "Growth"],
      highlight: "100+ businesses",
    },
    {
      id: "calorizen",
      name: "Calorizen",
      category: "Health-Focused Online Platform",
      categories: ["marketing", "operations"],
      year: "2024",
      role: "Operations & marketing support",
      url: "",
      icon: "heart-pulse",
      accent: ["#10B981", "#84CC16"],
      summary:
        "Assisted with operations and marketing for a health-focused platform offering dietary and healthy-food solutions through web and mobile applications.",
      contributions: ["Operations assistance", "Marketing assistance"],
      tags: ["Health-Tech", "Operations", "Marketing"],
    },
    {
      id: "bishwas",
      name: "Bishwas Mobile Training Institute",
      category: "Education · Marketing Strategy",
      categories: ["marketing"],
      year: "2023",
      role: "Marketing strategy & campaign lead",
      url: "https://bishwasbd.com/",
      icon: "smartphone",
      accent: ["#F59E0B", "#EF4444"],
      summary:
        "Led the full marketing strategy and campaigns for a mobile-servicing training institute in Chittagong's New Market.",
      contributions: ["End-to-end marketing strategy", "Campaign leadership"],
      tags: ["Marketing Strategy", "Campaigns", "Education"],
    },
    {
      id: "fiesta-panda",
      name: "Fiesta Mexico & Panda Town",
      category: "Restaurant Operations & Marketing",
      categories: ["operations", "marketing"],
      year: "2023",
      role: "Operations & marketing",
      url: "",
      icon: "utensils",
      accent: ["#EF4444", "#F59E0B"],
      summary: "Managed restaurant operations and carried out marketing strategies for two restaurant brands.",
      contributions: ["Restaurant operations management", "Marketing strategy"],
      tags: ["Hospitality", "Operations", "Marketing"],
    },
    {
      id: "freelancing-platform",
      name: "Freelancing Platform for Bangladeshi Freelancers",
      category: "Academic Software Development",
      categories: ["software"],
      year: "B.Sc. project",
      role: "Designer & developer",
      url: "",
      icon: "users",
      accent: ["#4F8CFF", "#8B5CF6"],
      summary:
        "University project: designed and developed a platform that connects local freelancers with potential clients.",
      contributions: ["Platform design", "Platform development"],
      tags: ["Academic", "Web Platform"],
    },
  ],

  /* ------------------------------------------------------------- EDUCATION */
  education: [
    {
      degree: "B.Sc. in Computer Science & Information Technology",
      school: "Premier University Chittagong",
      session: "2017 – 2021",
      details: [
        "Major: Software Development",
        "Final project: “Freelancing Website for Bangladeshi Freelancers”",
      ],
      primary: true,
    },
    {
      degree: "Higher Secondary Certificate (Science)",
      school: "Chittagong Biggan College",
      session: "2016 – 2017",
      details: [],
    },
    {
      degree: "Secondary School Certificate (Science)",
      school: "Ayub Bibi City Corporation School & College",
      session: "2014 – 2015",
      details: [],
    },
  ],

  /* -------------------------------------------------------------- LEARNING */
  currentCourse: {
    provider: "Ostad",
    title: "Web Development with Python & Django",
    url: "https://ostad.app/course/web-development-with-python-django",
    focus: "Python, Django and modern full-stack web development.",
    badges: ["Python", "Django"],
  },

  training: [
    { title: "Digital Marketing", provider: "Creative IT Institute", icon: "trending-up" },
    { title: "WordPress Customization", provider: "Nugor Tech IT Institute", icon: "layers" },
    { title: "PHP with Laravel Framework", provider: "BASIS Institute of Technology & Management", icon: "code" },
    { title: "Digital Marketing for Local Businesses", provider: "Udemy", icon: "map-pin" },
  ],

  /* ------------------------------------------------------------ PHILOSOPHY */
  philosophy: [
    { title: "Build with Purpose.", text: "Every website or system should solve a business problem someone can name." },
    { title: "Design for People.", text: "Customers, sales teams and operators all deserve tools that feel obvious." },
    { title: "Automate for Impact.", text: "Repetitive work belongs in software, so people can focus on decisions." },
    { title: "Grow with Technology.", text: "Marketing and engineering work best when they share the same data." },
  ],
};
