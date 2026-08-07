export type ProjectCategory = 'featured' | 'professional' | 'practice' | 'learning';

export interface Project {
  id: string;
  title: string;
  titleAr?: string;
  category: ProjectCategory;
  priority: number;
  tech: string[];
  description: string;
  descriptionAr?: string;
  challenges: string;
  challengesAr?: string;
  results: string;
  resultsAr?: string;
  link: string;
  github: string;
  image?: string;
  images?: string[];
}
