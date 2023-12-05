import { getFileLines, getAdjacentTiles } from '../../utils';

export const firstChallenge = async () => {
  const lines = await getFileLines(__dirname, 'input.txt');
  const map = lines.map((line) => line.split(''));
  const symbolsRegex = new RegExp(/[^A-z\s\d\.][\\\^]?/g);
  let result = 0;

  for (let y = 0; y < map.length; y++) {
    const row = map[y] as string[];
    let currentPart = '';

    for (let x = 0; x < row.length; x++) {
      const element = row[x] as string;

      if (element.match(/\d/g)) {
        currentPart += element;
      }

      if (!element.match(/\d/g) || x === row.length - 1) {
        for (let l = 0; l < currentPart.length; l++) {
          const adjacent = getAdjacentTiles(map, y, x - 1 - l);
          if (adjacent.some((adj) => adj?.match(symbolsRegex))) {
            console.log(currentPart);
            result += parseInt(currentPart);
            break;
          }
        }

        currentPart = '';
      }
    }
  }

  console.log('Sum: ', result);
};

export const secondChallenge = async () => {
  const lines = await getFileLines(__dirname, 'input.txt');
  let result = 0;

  type PartNumber = {
    value: number;
    startX: number;
    endX: number;
    y: number;
  };
  type Asterisk = {
    x: number;
    y: number;
  };

  const numbers: PartNumber[] = [];
  const asterisks: Asterisk[] = [];

  for (const [i, line] of lines.entries()) {
    const numberMatches = [...line.matchAll(/\d+/g)];
    const asteriskMatches = [...line.matchAll(/\*/g)];

    for (const match of numberMatches) {
      const index = match.index as number;
      numbers.push({
        value: parseInt(match[0]),
        startX: index,
        endX: index + match[0].length - 1,
        y: i,
      });
    }

    for (const match of asteriskMatches) {
      asterisks.push({
        x: match.index as number,
        y: i,
      });
    }
  }

  for (const asterisk of asterisks) {
    const adjacentNumbers = numbers.filter(
      (number) =>
        asterisk.y <= number.y + 1 &&
        asterisk.y >= number.y - 1 &&
        asterisk.x <= number.endX + 1 &&
        asterisk.x >= number.startX - 1,
    );

    if (adjacentNumbers.length === 2) {
      result += (adjacentNumbers[0]?.value as number) * (adjacentNumbers[1]?.value as number);
    }
  }

  console.log('Sum: ', result);
};
