const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const files = walkDir(path.resolve(__dirname, 'src'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    // Replace the specific spring transition for variants that might have filter: blur
    const newContent = content.replace(/transition:\s*\{\s*type:\s*"spring"\s*as\s*any,\s*bounce:\s*0\.3,\s*duration:\s*1\s*\}/g, 'transition: { type: "tween", ease: "easeOut", duration: 1 }');
    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Fixed', file);
    }
});
