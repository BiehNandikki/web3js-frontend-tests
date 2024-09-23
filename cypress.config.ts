import { defineConfig } from "cypress";
import fs from 'fs';
import path from 'path';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        logToTxt({ filename, data }) {
          const filePath = path.join(__dirname, filename);

          // Append data to the file
          return new Promise((resolve, reject) => {
            fs.appendFile(filePath, data + '\n', (err) => {
              if (err) {
                console.error('Error writing to file:', err);
                return reject(err);
              }
              resolve(null);
            });
          });
        },

      });
      return config;
    },
  },
});
