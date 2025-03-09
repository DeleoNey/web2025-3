const fs = require('fs');

// Зчитуємо JSON з файлу
const rawData = fs.readFileSync('data.json', 'utf8');
let jsonData;
try {
    jsonData = JSON.parse(rawData);
} catch (error) {
    console.error('Invalid JSON format');
    process.exit(1);
}

// Фільтруємо дані по id_api
const requiredData = jsonData.filter(entry => 
    entry.id_api === "BS2_IncomeTotal" || entry.id_api === "BS2_ExpensesTotal"
);

// Форматування результату
const result = requiredData.map(entry => `${entry.txt}:${entry.value}`).join('\n');

// Виведення результату в консоль
console.log(result);
