export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  image: string;
  category: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: "frontend" | "design" | "tools";
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}
