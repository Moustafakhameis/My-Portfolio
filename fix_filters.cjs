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
        } else if (file.endsWith('.tsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walkDir(path.resolve(__dirname, 'src'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Completely remove filter: blur(...) from animations to prevent Framer Motion spring errors
    // and to significantly improve rendering performance.
    content = content.replace(/,\s*filter:\s*'blur\([^)]+\)'/g, '');
    content = content.replace(/filter:\s*'blur\([^)]+\)'\s*,?/g, '');

    if (content !== fs.readFileSync(file, 'utf8')) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Removed blur filters from', file);
    }
});
