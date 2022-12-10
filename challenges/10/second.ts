const input = await Deno.readTextFile("input.txt");

const lines = input.split("\r\n");

let x = 1;
let currentRow = 0;
let pixelPosition = 0;

const screen: string[][] = Array.from({ length: 6 }, () => new Array(40).fill("."));

const drawPixel = () => {
  let pixel = ".";
  if (pixelPosition === x || pixelPosition === x + 1 || pixelPosition === x - 1) {
    pixel = "#";
  }
  screen[currentRow][pixelPosition] = pixel;
  pixelPosition++;

  if (pixelPosition % 40 === 0) {
    pixelPosition = 0;
    currentRow++;
  }
};

for (const line of lines) {
  const [instruction, value] = line.split(" ");
  const number = parseInt(value);

  if (instruction === "noop") {
    drawPixel();
  } else if (instruction === "addx") {
    for (let i = 0; i < 2; i++) {
      drawPixel();
    }
    x += number;
  }
}

screen.forEach((row) => {
  console.log(row.join(""));
});
