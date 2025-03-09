const { program } = require('commander');
const fs = require('fs');

program
    .requiredOption('-i, --input <path>', 'Input file path')
    .option('-o, --output <path>', 'Output file path')
    .option('-d, --display', 'Display output in console');

program.parse(process.argv);
const options = program.opts();

if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1);
}

if (!fs.existsSync(options.input)) {
    console.error('Cannot find input file');
    process.exit(1);
}

// Читання JSON-файлу
const rawData = fs.readFileSync(options.input, 'utf8');
let jsonData;
try {
    jsonData = JSON.parse(rawData);
} catch (error) {
    console.error('Invalid JSON format');
    process.exit(1);
}

// Фільтрація потрібних категорій
const result = jsonData
    .filter(entry => entry.indicator === 'Доходи, усього' || entry.indicator === 'Витрати, усього')
    .map(entry => `${entry.indicator}:${entry.value}`)
    .join('\n');

if (options.output) {
    fs.writeFileSync(options.output, result);
}
if (options.display) {
    console.log(result);
}
