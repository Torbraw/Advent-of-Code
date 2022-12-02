const input = await Deno.readTextFile("./input.txt");

const foodsByElf = input.split("\r\n\r\n");

let highestCalories = 0;

for (const foods of foodsByElf) {
  const calories = foods.split("\r\n").map((l) => parseInt(l));
  const maximumCalories = calories.reduce((a, b) => a + b, 0);
  if (maximumCalories > highestCalories) {
    highestCalories = maximumCalories;
  }
}

console.log("Highest: ", highestCalories);
