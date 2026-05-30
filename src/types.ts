export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  docUrl?: string;
  demoUrl?: string;
  imageUrl: string;
  screenshots?: string[];
  architectureDiagram?: string;
  longDescription?: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}
