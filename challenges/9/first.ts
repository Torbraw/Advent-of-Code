const input = await Deno.readTextFile("input.txt");

const lines = input.split("\r\n");

type Point = {
  x: number;
  y: number;
};

const headPosition: Point = { x: 0, y: 0 };
let tailPosition: Point = { x: 0, y: 0 };
let lastPosition: Point = { x: 0, y: 0 };

const visitedPoints = new Set<string>();
visitedPoints.add(`${0},${0}`);

const areTouching = () => {
  if (Math.abs(headPosition.x - tailPosition.x) === 1 && Math.abs(headPosition.y - tailPosition.y) === 1) {
    return true;
  }

  const dx = headPosition.x - tailPosition.x;
  const dy = headPosition.y - tailPosition.y;
  return Math.sqrt(dx * dx + dy * dy) <= 1;
};

const moveTail = () => {
  if (!areTouching()) {
    tailPosition = { ...lastPosition };
    visitedPoints.add(`${tailPosition.x},${tailPosition.y}`);
  }
  lastPosition = { ...headPosition };
};

for (const line of lines) {
  const [direction, value] = line.split(" ");
  const valueAsNumber = parseInt(value);

  for (let i = 0; i < valueAsNumber; i++) {
    if (direction === "U") {
      headPosition.y++;
    } else if (direction === "D") {
      headPosition.y--;
    } else if (direction === "L") {
      headPosition.x--;
    } else if (direction === "R") {
      headPosition.x++;
    }
    moveTail();
  }
}

console.log(visitedPoints.size);
