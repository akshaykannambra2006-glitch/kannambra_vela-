const https = require('https');
const fs = require('fs');
const path = require('path');

const downloadFile = (fileId, destPath) => {
  return new Promise((resolve, reject) => {
    const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
    
    https.get(url, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
          if (redirectRes.headers['content-type'].includes('text/html')) {
            console.error(`Received HTML instead of video for ${fileId} - likely a virus scan warning or auth issue.`);
            reject(new Error('Drive virus scan prompt encountered'));
            return;
          }
          const fileStream = fs.createWriteStream(destPath);
          redirectRes.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            resolve(destPath);
          });
        }).on('error', reject);
      } else {
        const fileStream = fs.createWriteStream(destPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(destPath);
        });
      }
    }).on('error', reject);
  });
};

const main = async () => {
  const publicDir = path.join(__dirname, 'public', 'videos');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log('Downloading Kumatti video...');
  try {
    await downloadFile('1RCNon0ulxSte8oeNSxw33-Pb4_3BKsOL', path.join(publicDir, 'kumatti.mp4'));
    console.log('Kumatti video downloaded.');
  } catch (e) {
    console.error(e);
  }

  console.log('Downloading Vela video...');
  try {
    await downloadFile('1kGRaQ3UJxVMBSd7EJsxw6xLGQbHUJ4SC', path.join(publicDir, 'vela.mp4'));
    console.log('Vela video downloaded.');
  } catch (e) {
    console.error(e);
  }
};

main();
