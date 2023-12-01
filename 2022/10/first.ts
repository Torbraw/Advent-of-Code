const input = await Deno.readTextFile("input.txt");

const lines = input.split("\r\n");

let x = 1;
let signalSums = 0;
let currentCycle = 0;
let lastCycle = 0;

const incrementSignalSums = () => {
  signalSums += currentCycle * x;
};

const incrementCycle = () => {
  currentCycle++;
  if (currentCycle === 20 || lastCycle + 40 === currentCycle) {
    incrementSignalSums();
    lastCycle = currentCycle;
  }
};

for (const line of lines) {
  const [instruction, value] = line.split(" ");
  const number = parseInt(value);

  if (instruction === "noop") {
    incrementCycle();
  } else if (instruction === "addx") {
    for (let i = 0; i < 2; i++) {
      incrementCycle();
    }
    x += number;
  }
}

console.log(signalSums);
