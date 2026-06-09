export const translations = {
  en: {
    navbar: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hello, I'm",
      role: 'Frontend Developer',
      basedIn: 'based in Cairo, Egypt.',
      viewWork: 'View My Work',
      contactMe: 'Contact Me',
    },
    about: {
      title: 'About Me',
      description: 'Highly motivated and detail-oriented Business Information Systems (BIS) graduate with a strong passion for Front-End Development. Seeking a Front-End Developer role where I can apply my skills in HTML, CSS, JavaScript, React, and Next.js to build responsive and user-friendly web applications, while contributing to innovative projects and continuously improving my technical abilities in a professional environment.',
      yearsOfExperience: 'Years of Experience',
      projectsCompleted: 'Projects Completed',
      happyClients: 'Happy Clients',
    },
    experience: {
      title: 'Professional Experience',
    },
    projects: {
      title: 'Featured Projects',
      viewProject: 'View Live Demo',
      viewGithub: 'View Source',
      techStack: 'Tech Stack',
    },
    skills: {
      title: 'Interactive Skills Galaxy',
      description: 'Hover, drag, and explore the elements. A comprehensive toolkit for building modern web experiences.',
      snapBack: 'Snap Back to Orbit',
    },
    contact: {
      title: 'Get In Touch',
      description: 'Currently looking for new full-time opportunities.',
      sayHello: 'Say Hello',
      copyEmail: 'Copy Email',
      copyPhone: 'Copy Phone',
    },
    footer: {
      copyright: '© 2026 Mostafa Ali Emam. All rights reserved.',
      builtWith: 'Built with React, Tailwind & Framer Motion.',
    }
  },
  ar: {
    navbar: {
      about: 'نبذة عني',
      experience: 'الخبرات',
      projects: 'المشاريع',
      skills: 'المهارات',
      contact: 'تواصل معي',
    },
    hero: {
      greeting: 'مرحباً، أنا',
      role: 'مطور واجهات أمامية',
      basedIn: 'مقيم في القاهرة، مصر.',
      viewWork: 'شاهد أعمالي',
      contactMe: 'تواصل معي',
    },
    about: {
      title: 'نبذة عني',
      description: 'خريج نظم معلومات الأعمال (BIS) ذو حافز عالي واهتمام قوي بتطوير الواجهات الأمامية. أبحث عن وظيفة كمطور واجهات أمامية لتطبيق مهاراتي في HTML, CSS, JavaScript, React, و Next.js لبناء تطبيقات ويب متجاوبة وسهلة الاستخدام، والمساهمة في مشاريع مبتكرة مع الاستمرار في تطوير قدراتي التقنية في بيئة مهنية.',
      yearsOfExperience: 'سنوات خبرة',
      projectsCompleted: 'مشروع منجز',
      happyClients: 'عملاء سعداء',
    },
    experience: {
      title: 'الخبرات المهنية',
    },
    projects: {
      title: 'أبرز المشاريع',
      viewProject: 'عرض مباشر',
      viewGithub: 'الكود المصدري',
      techStack: 'التقنيات المستخدمة',
    },
    skills: {
      title: 'مجرة المهارات التفاعلية',
      description: 'قم بالتمرير والسحب واستكشاف العناصر. مجموعة أدوات متكاملة لبناء تجارب ويب حديثة.',
      snapBack: 'إعادة إلى المدار',
    },
    contact: {
      title: 'تواصل معي',
      description: 'أبحث حالياً عن فرص وظيفية جديدة.',
      sayHello: 'قل مرحباً',
      copyEmail: 'نسخ البريد الإلكتروني',
      copyPhone: 'نسخ رقم الهاتف',
    },
    footer: {
      copyright: '© 2026 مصطفى علي إمام. جميع الحقوق محفوظة.',
      builtWith: 'تم البناء باستخدام React, Tailwind & Framer Motion.',
    }
  }
};

export type Language = 'en' | 'ar';
export type TranslationKey = keyof typeof translations.en;
