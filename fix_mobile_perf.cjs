const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'sections');

function processDir(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let modified = false;
      content = content.replace(/className=["']([^"']*)["']/g, (match, classes) => {
        if (classes.includes('blur-') && !classes.includes('blob-blur') && !classes.includes('backdrop-blur')) {
          modified = true;
          return `className="${classes} blob-blur"`;
        }
        return match;
      });
      
      if (modified) {
        fs.writeFileSync(fullPath, content);
        console.log(`Added blob-blur to ${file}`);
      }
    }
  }
}

processDir(dir);

// Also do it for footer
const footerPath = path.join(__dirname, 'src', 'components', 'ui', 'Footer.tsx');
if (fs.existsSync(footerPath)) {
  let footerContent = fs.readFileSync(footerPath, 'utf8');
  let footerModified = false;
  footerContent = footerContent.replace(/className=["']([^"']*)["']/g, (match, classes) => {
    if (classes.includes('blur-') && !classes.includes('blob-blur') && !classes.includes('backdrop-blur')) {
      footerModified = true;
      return `className="${classes} blob-blur"`;
    }
    return match;
  });
  if (footerModified) {
    fs.writeFileSync(footerPath, footerContent);
    console.log('Added blob-blur to Footer.tsx');
  }
}
