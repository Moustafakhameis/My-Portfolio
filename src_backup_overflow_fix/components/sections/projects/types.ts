export type ProjectCategory = 'featured' | 'professional' | 'practice' | 'learning';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  priority: number;
  tech: string[];
  description: string;
  challenges: string;
  results: string;
  link: string;
  github: string;
  image?: string;
  images?: string[];
}
