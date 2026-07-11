const fs = require('fs');
const path = require('path');

const brainDir = '/home/riddhesh/.gemini/antigravity/brain/438eecf4-2d6e-419e-aef2-f74c3971f30c';
const publicDir = '/home/riddhesh/Desktop/portfolio/public';

try {
    const files = fs.readdirSync(brainDir);
    files.forEach(f => {
        if (f.endsWith('.webp')) {
            let newName = '';
            if (f.startsWith('learnstack')) newName = 'learnstack_demo.webp';
            else if (f.startsWith('returno')) newName = 'returno_demo.webp';
            else if (f.startsWith('portfolio')) newName = 'portfolio_demo.webp';
            else if (f.startsWith('cricket')) newName = 'cricket_demo.webp';
            
            if (newName) {
                fs.copyFileSync(path.join(brainDir, f), path.join(publicDir, newName));
                console.log('Copied ' + newName);
            }
        }
    });
} catch (e) {
    console.error(e);
}
