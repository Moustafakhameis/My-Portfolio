import type { Project, ProjectCategory } from './types';

export const groupProjectsByCategory = (projects: Project[]) => {
  const grouped: Record<ProjectCategory, Project[]> = {
    featured: [],
    professional: [],
    practice: [],
    learning: []
  };

  projects.forEach((project) => {
    grouped[project.category].push(project);
  });

  // Sort each category by priority
  Object.keys(grouped).forEach((key) => {
    grouped[key as ProjectCategory].sort((a, b) => a.priority - b.priority);
  });

  return grouped;
};
