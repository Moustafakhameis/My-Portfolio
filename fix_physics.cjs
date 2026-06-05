const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components');

function processDir(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let modified = false;
      
      // Swap spring for tween globally
      if (content.includes('type: "spring"')) {
        content = content.replace(/type:\s*"spring"(?:\s*as\s*any)?/g, 'type: "tween", ease: "easeOut"');
        modified = true;
      }
      
      // Clean up orphaned bounce/stiffness props if present so it doesn't log warnings
      if (modified) {
        content = content.replace(/,\s*bounce:\s*[\d.]+/g, '');
        content = content.replace(/,\s*stiffness:\s*[\d.]+/g, '');
      }

      if (modified) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated physics in ${file}`);
      }
    }
  }
}

processDir(dir);
