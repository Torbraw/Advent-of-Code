import { getFileLines } from '../../utils';

export const firstChallenge = async () => {
  const lines = await getFileLines(__dirname, 'input.txt');
  let result = 0;
  const maximumMatrix = {
    red: 12,
    green: 13,
    blue: 14,
  };

  for (const line of lines) {
    const split = line.split(':');
    const gameId = split[0]?.match(/\d+/g)?.[0];
    if (!gameId) continue;

    const cubes = split[1]?.match(/\d+( ){1}((blue)|(red)|(green))/g) ?? [];
    let isGameValid = true;
    for (const cube of cubes) {
      const [score, color] = cube.split(' ');
      if (!score || !color || isNaN(+score) || !Object.keys(maximumMatrix).includes(color)) {
        continue;
      }

      if (+score > maximumMatrix[color as keyof typeof maximumMatrix]) {
        isGameValid = false;
        break;
      }
    }

    if (isGameValid) {
      result += Number(gameId);
    }
  }

  console.log('Sum: ', result);
};

export const secondChallenge = async () => {
  const lines = await getFileLines(__dirname, 'input.txt');
  let result = 0;

  for (const line of lines) {
    const split = line.split(':');
    const cubes = split[1]?.match(/\d+( ){1}((blue)|(red)|(green))/g) ?? [];

    const minResult = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for (const cube of cubes) {
      const [score, color] = cube.split(' ');
      if (!score || !color || isNaN(+score) || !Object.keys(minResult).includes(color)) {
        continue;
      }

      if (minResult[color as keyof typeof minResult] < +score) {
        minResult[color as keyof typeof minResult] = +score;
      }
    }
    result += minResult.red * minResult.green * minResult.blue;
  }

  console.log('Sum: ', result);
};
