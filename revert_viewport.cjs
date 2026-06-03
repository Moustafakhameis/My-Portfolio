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
      
      // Revert once: true to once: false
      if (content.includes('once: true')) {
        content = content.replace(/once:\s*true/g, 'once: false');
        modified = true;
      }
      
      // Revert margin "-50px" to "-100px"
      if (content.includes('margin: "-50px"')) {
        content = content.replace(/margin:\s*"-50px"/g, 'margin: "-100px"');
        modified = true;
      }
      
      if (modified) {
        fs.writeFileSync(fullPath, content);
        console.log(`Reverted viewport animations in ${file}`);
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
  if (footerContent.includes('once: true')) {
    footerContent = footerContent.replace(/once:\s*true/g, 'once: false');
    footerModified = true;
  }
  if (footerContent.includes('margin: "-50px"')) {
    footerContent = footerContent.replace(/margin:\s*"-50px"/g, 'margin: "-100px"');
    footerModified = true;
  }
  if (footerModified) {
    fs.writeFileSync(footerPath, footerContent);
    console.log('Reverted viewport animations in Footer.tsx');
  }
}
