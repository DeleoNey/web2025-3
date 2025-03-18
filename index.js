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

    const dataArray = Array.isArray(data) ? data : [data]; // Переконаємось, що data - це масив

    // Фільтруємо доходи та витрати
    const incomeCategory = dataArray.filter(item => item.parent === "BS2_IncomeTotal");
    const expenseCategory = dataArray.filter(item => item.parent === "BS2_ExpensesTotal");

    // Підсумовуємо значення
    const totalIncome = incomeCategory.reduce((sum, item) => sum + item.value, 0);
    const totalExpense = expenseCategory.reduce((sum, item) => sum + item.value, 0);

    const result = `Доходи, усього: ${totalIncome}\nВитрати, усього: ${totalExpense}`;

    if (params.display) {
      console.log(result);
    }

    if (params.output) {
      fs.writeFileSync(params.output, result);
    }
  } catch (error) {
    console.error('Помилка при обробці файлу:', error.message);
    process.exit(1);
  }
}

main();
