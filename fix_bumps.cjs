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
      
      // Reduce aggressive bounce
      if (content.match(/bounce:\s*0\.[3-6]/)) {
        content = content.replace(/bounce:\s*0\.[3-6]/g, 'bounce: 0.1');
        modified = true;
      }
      
      // Remove animate-pulse from large backgrounds
      if (content.includes('animate-pulse')) {
        content = content.replace(/animate-pulse/g, 'duration-1000'); // replace with something benign
        modified = true;
      }
      
      // Reduce stiffness
      if (content.match(/stiffness:\s*[2-5][0-9]{2}/)) {
        content = content.replace(/stiffness:\s*[2-5][0-9]{2}/g, 'stiffness: 100');
        modified = true;
      }
      
      if (modified) {
        fs.writeFileSync(fullPath, content);
        console.log(`Smoothed animations in ${file}`);
      }
    }
  }
}

processDir(dir);
