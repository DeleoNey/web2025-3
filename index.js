const { Command } = require('commander');
const program = new Command();

program
    .version('1.0.0')
    .description('Програма для обробки аргументів командного рядка')
    .option('-n, --name <type>', 'Maksym')
    .parse(process.argv);

const options = program.opts();
if (options.name) {
    console.log(`Привіт, ${options.name}!`);
} else {
    console.log('Введіть своє ім\'я за допомогою опції -n або --name');
}
