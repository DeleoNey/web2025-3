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

// Якщо нічого не виводимо, просто завершуємо програму
if (!options.output && !options.display) {
    process.exit(0);
}

// Читання JSON-файлу
const data = fs.readFileSync(options.input, 'utf8');
console.log('Файл успішно прочитаний');

if (options.output) {
    fs.writeFileSync(options.output, data);
}
if (options.display) {
    console.log(data);
}
