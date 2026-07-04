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
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
      {link !== '#' && (
        <AnimatedButton 
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          className={`w-full sm:w-auto flex-1 justify-center whitespace-nowrap !py-2.5 ${isCompact ? '!text-xs !px-3 min-w-[100px]' : '!text-sm !px-5 min-w-[130px]'}`}
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
          className={`w-full sm:w-auto flex-1 justify-center whitespace-nowrap !py-2.5 ${isCompact ? '!text-xs !px-3 min-w-[100px]' : '!text-sm !px-5 min-w-[130px]'}`}
        >
          <GithubIcon size={isCompact ? 14 : 16} />
          {t('projects', 'viewGithub')}
        </AnimatedButton>
      )}
    </div>
  );
};
