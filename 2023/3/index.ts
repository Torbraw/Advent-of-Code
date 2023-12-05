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
  const result = 0;

  for (const line of lines) {
  }

  console.log('Sum: ', result);
};
