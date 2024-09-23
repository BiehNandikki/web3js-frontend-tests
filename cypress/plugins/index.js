const fs = require('fs');
const path = require('path');

module.exports = (on, config) => {
  on('task', {
    logToTxt({ filename, data }) {
      const filePath = path.join(__dirname, '..', filename);
      
      // Append data to the file
      fs.appendFile(filePath, data + '\n', (err) => {
        if (err) {
          console.error('Error writing to log file:', err);
        }
      });

      return null;
    }
  });
};
