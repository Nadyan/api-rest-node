const fs = require('fs');

/* Not the best way to do it (Synchronous):
fs.readFile('../assets/img.jpg', (error, buffer) => {
    if (error) {
        console.log('Error fetching image');
    } else {
        fs.writeFile('../assets/img_copy.jpg', buffer, error => {
            if (error) {
                console.log('Error copying image');
            } else {
                console.log('Copy written successfully');
            }
        });
    }
});
*/

/* Asynchronous */
fs.createReadStream('../assets/img.jpg')
    .pipe(fs.createWriteStream('../assets/img_copy.jpg'))
    .on('finish', () => {
        console.log('Copy written successfully');
    });
