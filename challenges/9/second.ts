const input = await Deno.readTextFile("input.txt");

const lines = input.split("\r\n");

type Point = {
  x: number;
  y: number;
};

const rope: Point[] = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
];

const visitedPoints = new Set<string>();

const getNewCoord = (p1: Point, p2: Point): Point => {
  const currentPoint = { ...p2 };
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;

  if (Math.abs(dx) > 1) {
    // Different x axis, determine which direction to move
    if (dx > 0) {
      currentPoint.x++;
    } else {
      currentPoint.x--;
    }
    // Validate diagonal
    if (Math.abs(dy) !== 0) {
      if (dy > 0) {
        currentPoint.y++;
      } else {
        currentPoint.y--;
      }
    }
  } else if (Math.abs(dy) > 1) {
    // Different y axis, determine which direction to move
    if (dy > 0) {
      currentPoint.y++;
    } else {
      currentPoint.y--;
    }
    // Validate diagonal
    if (Math.abs(dx) !== 0) {
      if (dx > 0) {
        currentPoint.x++;
      } else {
        currentPoint.x--;
      }
    }
  }

  return currentPoint;
};

for (const line of lines) {
  const [direction, value] = line.split(" ");
  const valueAsNumber = parseInt(value);

  for (let i = 0; i < valueAsNumber; i++) {
    const headPosition = { ...rope[0] };

    if (direction === "U") {
      headPosition.y++;
    } else if (direction === "D") {
      headPosition.y--;
    } else if (direction === "L") {
      headPosition.x--;
    } else if (direction === "R") {
      headPosition.x++;
    }
    rope[0] = headPosition;

    for (let i = 0; i < rope.length - 1; i++) {
      rope[i + 1] = getNewCoord(rope[i], rope[i + 1]);
    }

    visitedPoints.add(`${rope[9].x},${rope[9].y}`);
  }
}

console.log(visitedPoints.size);
