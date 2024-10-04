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
        // Add logToCsv task
        logToCsv({ filename, data }) {
          const logsDir = path.join(__dirname, '.', 'logs');
          const csvFilePath = path.join(logsDir, filename);

          // Ensure the logs directory exists
          if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir);
          }

          // If the CSV file doesn't exist, create it and write the header
          if (!fs.existsSync(csvFilePath)) {
            const header = 'Method,Average Load Time (ms),Title,Total iterations ran\n';
            fs.writeFileSync(csvFilePath, header);
          }

          // Append the data row to the CSV file
          fs.appendFileSync(csvFilePath, data);
          return null;
        }
      });
      return config;
    },
  },
});
