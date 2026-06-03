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
      
      // Replace once: false with once: true
      content = content.replace(/once:\s*false/g, 'once: true');
      
      // Smooth out the margins
      content = content.replace(/margin:\s*["']-100px["']/g, 'margin: "-50px"');
      
      fs.writeFileSync(fullPath, content);
      console.log(`Updated ${file}`);
    }
  }
}

processDir(dir);

// Also do it for footer
const footerPath = path.join(__dirname, 'src', 'components', 'ui', 'Footer.tsx');
if (fs.existsSync(footerPath)) {
  let footerContent = fs.readFileSync(footerPath, 'utf8');
  footerContent = footerContent.replace(/once:\s*false/g, 'once: true');
  fs.writeFileSync(footerPath, footerContent);
  console.log('Updated Footer.tsx');
}
