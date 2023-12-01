const input = await Deno.readTextFile("./input.txt");

const foodsByElf = input.split("\r\n\r\n");

let highestCalories = 0;

for (const foods of foodsByElf) {
  const calories = foods.split("\r\n").map((l) => parseInt(l));
  const totalCalories = calories.reduce((a, b) => a + b, 0);
  if (totalCalories > highestCalories) {
    highestCalories = totalCalories;
  }
}

console.log("Highest: ", highestCalories);
