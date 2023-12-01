const input = await Deno.readTextFile("input.txt");

const lines = input.split("\r\n");

type Point = {
  x: number;
  y: number;
  value: number;
};

const points: Point[] = [];
const xLength = lines.length;
const yLength = lines[0].length;

for (let r = 0; r < xLength; r++) {
  const chars = lines[r].split("");
  for (let c = 0; c < yLength; c++) {
    const char = chars[c];
    const point: Point = {
      x: r,
      y: c,
      value: parseInt(char),
    };
    points.push(point);
  }
}

const findIndex = (numbers: number[], value: number) => {
  let index = 0;
  for (const n of numbers) {
    index++;
    if (value <= n) {
      return index;
    }
  }
  return index;
};

let highest = 0;

for (let x = 0; x < xLength; x++) {
  for (let y = 0; y < yLength; y++) {
    const currentPointValue = points.find((p) => p.x === x && p.y === y)?.value ?? 0;
    const tops = points.filter((p) => p.x < x && p.y === y).sort((a, b) => b.x - a.x).map((p) => p.value);
    const bottoms = points.filter((p) => p.x > x && p.y === y).sort((a, b) => a.x - b.x).map((p) => p.value);
    const lefts = points.filter((p) => p.x === x && p.y < y).sort((a, b) => b.y - a.y).map((p) => p.value);
    const rights = points.filter((p) => p.x === x && p.y > y).sort((a, b) => a.y - b.y).map((p) => p.value);

    const topIndex = findIndex(tops, currentPointValue);
    const bottomIndex = findIndex(bottoms, currentPointValue);
    const leftIndex = findIndex(lefts, currentPointValue);
    const rightIndex = findIndex(rights, currentPointValue);

    const scenicScore = topIndex * bottomIndex * leftIndex * rightIndex;

    if (scenicScore > highest) {
      highest = scenicScore;
    }
  }
}

console.log(highest);
