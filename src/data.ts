import { Project, Skill, Experience, Testimonial } from "./types";

export const projectsData: Project[] = [
  {
    id: "savoria",
    number: "01",
    title: "Savoria Fine Dining",
    description: "An immersive, cinematic restaurant website with dark themes, warm golden lighting accents, elegant menus, and an integrated real-time reservation system.",
    tech: ["React", "GSAP ScrollTrigger", "Tailwind CSS", "IntersectionObserver"],
    link: "https://drive.google.com/file/d/1coFGFUzQhBcLQu4sVXy7eKM9AqEUrH_b/view?usp=sharing",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
    category: "Hospitality & Brand Experience"
  },
  {
    id: "forma-studio",
    number: "02",
    title: "Forma Architectural Studio",
    description: "A luxury interior and exterior design showcase utilizing custom parallax reveals, horizontal-scrolling project galleries, and highly refined architectural layouts.",
    tech: ["Next.js", "GSAP Core", "Three.js", "CSS Grid"],
    link: "https://drive.google.com/file/d/1VHqTcmtDumkEJKizzLvDO1zx3Sgr9Jes/view?usp=sharing",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    category: "Creative Portfolio"
  },
  {
    id: "elysian-retreats",
    number: "03",
    title: "Elysian Retreats",
    description: "A full-screen immersive resort experience featuring continuous scroll-controlled room walkthroughs, rich video loops, and dynamic reservation dashboards.",
    tech: ["HTML5 Video", "GSAP ScrollTrigger", "Tailwind CSS", "Node.js"],
    link: "https://drive.google.com/file/d/15fxwKf1yT5h05jxpFen4pwylfVILORoS/view?usp=sharing",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop",
    category: "Luxury Travel & E-com"
  },
  {
    id: "nexus-properties",
    number: "04",
    title: "Nexus Modern Real Estate",
    description: "A cutting-edge properties platform built with reactive search filters, interactive map pins, custom detailed fly-outs, and animated real estate analytics.",
    tech: ["React", "Leaflet Maps", "Framer Motion", "Express API"],
    link: "https://drive.google.com/file/d/1wyN2TXAw2Wn_5PTTnuoK7N3AC35X6Yuh/view?usp=sharing",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    category: "Enterprise Web App"
  },
  {
    id: "maripos-cork",
    number: "05",
    title: "Maripos Premium Aesthetics",
    description: "An elegant clinic interface with soft rose-gold/blush visual schemes, smooth step-by-step treatment configurations, and localized clinician selection.",
    tech: ["Vue.js", "GSAP Core", "Tailwind CSS", "Supabase Auth"],
    link: "https://drive.google.com/file/d/1oUzV2HEDa7AJJVDyH8olIdy64txHfCTx/view?usp=sharing",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
    category: "E-Commerce & Service Platform"
  },
  {
    id: "pearlsmile-dental",
    number: "06",
    title: "PearlSmile Dental",
    description: "A highly clean medical layout displaying interactive service cards, animated team highlights, and an frictionless calendar appointment booking system.",
    tech: ["React.js", "ChartJS", "Tailwind Utility", "EmailJS Services"],
    link: "https://drive.google.com/file/d/1oUzV2HEDa7AJJVDyH8olIdy64txHfCTx/view?usp=sharing",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop",
    category: "B2C Medical Web App"
  }
];

export const skillsData: Skill[] = [
  // Frontend
  { name: "Creative Webflow & GSAP", level: 98, category: "frontend" },
  { name: "React, Next.js & Gatsby", level: 95, category: "frontend" },
  { name: "HTML5/CSS3/ES6 Modern JS", level: 96, category: "frontend" },
  { name: "Tailwind CSS & Utility-First", level: 97, category: "frontend" },
  { name: "Three.js & WebGL Shaders", level: 82, category: "frontend" },
  
  // Design
  { name: "UI/UX & Interactive Prototyping", level: 90, category: "design" },
  { name: "Motion Design & Stagger Loops", level: 92, category: "design" },
  { name: "Typography & Layout Rhythms", level: 94, category: "design" },
  { name: "Awwwards-Grade Creative Direction", level: 88, category: "design" },

  // Tools & Backend
  { name: "Git, GitHub & Version Control", level: 95, category: "tools" },
  { name: "Vite, Rollup & Build Systems", level: 93, category: "tools" },
  { name: "Node.js, Express & Server Proxies", level: 86, category: "tools" },
  { name: "Figma File Conversion to Code", level: 95, category: "tools" },
  { name: "Vercel, Cloud Run & Netlify", level: 90, category: "tools" }
];

export const experienceData: Experience[] = [
  {
    id: "exp-1",
    company: "Zenith Creative Agency",
    role: "Senior Lead Interactive Developer",
    duration: "2023 - Present",
    description: "Spearheading frontend development for award-winning high-tier brand portfolios. Championing smooth scrolling systems, WebGL-focused parallax, and ultra-high speed web experiences. Managed a team of 3 developers while coordinating directly with design directors."
  },
  {
    id: "exp-2",
    company: "Form & Function Studio",
    role: "Creative Frontend Engineer",
    duration: "2021 - 2023",
    description: "Built pixel-perfect, highly animated consumer interfaces for e-commerce, real estate, and hospitality sectors. Championed modular GSAP setups, CSS Grid bento grids, and automated visual optimization, yielding an average performance boost of 35% across client sites."
  },
  {
    id: "exp-3",
    company: "Freelance Creative Dev",
    role: "Interactive UI Specialist",
    duration: "2019 - 2021",
    description: "Designed and developed bespoke digital properties for tech startups, dental clinics, and aesthetic platforms global clients. Hand-crafted unique motion timelines, reservation backends, and responsive, accessibility-compliant components in pure React, Vue, and GSAP."
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "test-1",
    quote: "Rahul possesses an extraordinary talent for blending technical precision with high-concept design. Our brand engagement doubled after publishing his immersive fine-dining experience.",
    author: "Elena Rostov",
    role: "Creative Director",
    company: "Savoria Luxury Group"
  },
  {
    id: "test-2",
    quote: "Unbelievable motion performance. Rahul converted our Figma layouts into ultra-fast, smooth, horizontal-scrolling responsive pages that literally take our clients' breath away.",
    author: "Marcus Vance",
    role: "Managing Principal",
    company: "Forma Studio"
  },
  {
    id: "test-3",
    quote: "Working with Rahul was a revelation. He speaks both the designer's and developer's language flawlessly, creating interactions that aren't just flashy, but truly enhance conversion.",
    author: "Sarah Lin",
    role: "Product Lead",
    company: "Elysian Resorts Inc."
  },
  {
    id: "test-4",
    quote: "Rahul pushed custom animation bounds in our platform without sacrificing loading times or SEO. He is a master of production-ready GSAP and ScrollTrigger implementation.",
    author: "David Kross",
    role: "VP of Engineering",
    company: "Nexus Real Estate Platform"
  },
  {
    id: "test-5",
    quote: "The subtle micro-animations and smooth transition flows Rahul brought to our clinic interface established immediate brand trust. Our online bookings rose by 40% in two weeks.",
    author: "Dr. Amara Thorne",
    role: "Founder & Chief Surgeon",
    company: "Maripos Aesthetics"
  }
];
