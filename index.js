const fs = require('fs');

// Функція для парсингу аргументів командного рядка
function parseArgs() {
  const args = process.argv.slice(2);
  const params = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '-i' || args[i] === '--input') {
      params.input = args[i + 1];
      i++;
    } else if (args[i] === '-o' || args[i] === '--output') {
      params.output = args[i + 1];
      i++;
    } else if (args[i] === '-d' || args[i] === '--display') {
      params.display = true;
    }
  }

  return params;
}

// Основна функція
function main() {
  const params = parseArgs();

  if (!params.input) {
    console.error('Please, specify input file');
    process.exit(1);
  }

  if (!fs.existsSync(params.input)) {
    console.error('Cannot find input file');
    process.exit(1);
  }

  try {
    const jsonData = fs.readFileSync(params.input, 'utf-8');
    const data = JSON.parse(jsonData);
    
    const dataArray = Array.isArray(data) ? data : data.data || [];

    const incomeCategory = dataArray.find(item => item.txt === "Доходи, усього");
    const expenseCategory = dataArray.find(item => item.txt === "Витрати, усього");

    let result = '';
    if (incomeCategory) result += `Доходи, усього:${incomeCategory.value}\n`;
    if (expenseCategory) result += `Витрати, усього:${expenseCategory.value}`;

    if (!result) {
      console.error('Не вдалося знайти потрібні категорії в даних');
      process.exit(1);
    }

    if (params.display) {
      console.log(result.trim());
    }

    if (params.output) {
      fs.writeFileSync(params.output, result.trim());
    }
  } catch (error) {
    console.error('Помилка при обробці файлу:', error.message);
    process.exit(1);
  }
}

main();
