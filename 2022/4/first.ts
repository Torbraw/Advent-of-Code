const input = await Deno.readTextFile("input.txt");

const lines = input.split("\r\n");

const isBeetwen = (value: number, min: number, max: number) => {
  return value >= min && value <= max;
};

const areBeetwen = (
  firstValue: number,
  secondValue: number,
  min: number,
  max: number,
) => {
  return isBeetwen(firstValue, min, max) && isBeetwen(secondValue, min, max);
};

let result = 0;

for (const line of lines) {
  const assignements = line.split(",").map((assignment) => assignment.split("-"));
  const [firstAssignment, secondAssignment] = assignements;
  const [firstStart, firstEnd] = firstAssignment.map((value) => parseInt(value));
  const [secondStart, secondEnd] = secondAssignment.map((value) => parseInt(value));

  if (
    areBeetwen(firstStart, firstEnd, secondStart, secondEnd) ||
    areBeetwen(secondStart, secondEnd, firstStart, firstEnd)
  ) {
    result++;
  }
}

console.log(result);
