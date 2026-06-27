import React from 'react';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '../../ui/Icons';
import { AnimatedButton } from '../../ui/AnimatedButton';
import { useLanguage } from '../../../context/LanguageContext';
import type { ProjectCategory } from './types';

interface ProjectActionsProps {
  link: string;
  github: string;
  category?: ProjectCategory;
}

export const ProjectActions: React.FC<ProjectActionsProps> = ({ link, github, category }) => {
  const { t } = useLanguage();
  const isCompact = category === 'learning';

  return (
    <div className="flex gap-4">
      {link !== '#' && (
        <AnimatedButton 
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          className={`flex-1 justify-center !py-2.5 ${isCompact ? '!text-xs !px-3' : '!text-sm !px-5'}`}
        >
          <ExternalLink size={isCompact ? 14 : 16} />
          {t('projects', 'viewProject')}
        </AnimatedButton>
      )}
      {github !== '#' && (
        <AnimatedButton 
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          className={`flex-1 justify-center !py-2.5 ${isCompact ? '!text-xs !px-3' : '!text-sm !px-5'}`}
        >
          <GithubIcon size={isCompact ? 14 : 16} />
          {t('projects', 'viewGithub')}
        </AnimatedButton>
      )}
    </div>
  );
};
