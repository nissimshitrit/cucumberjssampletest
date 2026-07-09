const fs = require('fs');
const convert = require('cucumber-junit');

const inputPath = process.argv[2] || 'cucumber-report.json';
const outputPath = process.argv[3] || 'cucumber-report.xml';

if (!fs.existsSync(inputPath)) {
  console.error(`Input report not found: ${inputPath}`);
  process.exit(1);
}

const jsonReportRaw = fs.readFileSync(inputPath, 'utf-8');
const xmlReport = convert(jsonReportRaw);

fs.writeFileSync(outputPath, xmlReport);
console.log(`JUnit report generated at ${outputPath}`);

