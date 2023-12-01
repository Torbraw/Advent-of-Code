const input = await Deno.readTextFile("./input.txt");

const foodsByElf = input.split("\r\n\r\n");

const caloriesByElf = [];

for (const foods of foodsByElf) {
  const calories = foods.split("\r\n").map((l) => parseInt(l));
  const totalCalories = calories.reduce((a, b) => a + b, 0);
  caloriesByElf.push(totalCalories);
}

const sortedCaloriesByElf = caloriesByElf.sort((a, b) => b - a);
const result = sortedCaloriesByElf[0] + sortedCaloriesByElf[1] +
  sortedCaloriesByElf[2];

console.log("result: ", result);
