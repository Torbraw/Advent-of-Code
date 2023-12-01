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
const edgeCount = (xLength * 2) + (yLength * 2) - 4;

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

let sum = 0;

for (let x = 1; x < xLength - 1; x++) {
  for (let y = 1; y < yLength - 1; y++) {
    const currentPointValue = points.find((p) => p.x === x && p.y === y)?.value ?? 0;
    const tops = points.filter((p) => p.x < x && p.y === y).map((p) => p.value);
    const bottoms = points.filter((p) => p.x > x && p.y === y).map((p) => p.value);
    const lefts = points.filter((p) => p.x === x && p.y < y).map((p) => p.value);
    const rights = points.filter((p) => p.x === x && p.y > y).map((p) => p.value);

    const topMax = tops.length > 0 ? Math.max(...tops) : 0;
    const bottomMax = bottoms.length > 0 ? Math.max(...bottoms) : 0;
    const leftMax = lefts.length > 0 ? Math.max(...lefts) : 0;
    const rightMax = rights.length > 0 ? Math.max(...rights) : 0;

    if (
      currentPointValue > topMax || currentPointValue > bottomMax || currentPointValue > leftMax ||
      currentPointValue > rightMax
    ) {
      sum++;
    }
  }
}

console.log(sum + edgeCount);
