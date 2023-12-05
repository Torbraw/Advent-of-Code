import { getFileLines } from '../../utils';

export const firstChallenge = async () => {
  const lines = await getFileLines(__dirname, 'input.txt');
  let sum = 0;

  for (const line of lines) {
    const matches = [...line.matchAll(/\d/g)];
    if (matches.length === 0) continue;

    sum += parseInt(`${matches.at(0)?.[0]}${matches.at(-1)?.[0]}`);
  }

  console.log('Sum: ', sum);
};

export const secondChallenge = async () => {
  const matrix = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  };

  const lines = await getFileLines(__dirname, 'input.txt');
  let sum = 0;

  for (const line of lines) {
    const matches = [...line.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g)];
    if (matches.length === 0) continue;

    let firstMatch = matches.at(0)?.find((match) => match) as string;
    let lastMatch = matches.at(-1)?.find((match) => match) as string;

    firstMatch = firstMatch in matrix ? matrix[firstMatch as keyof typeof matrix] : firstMatch;
    lastMatch = lastMatch in matrix ? matrix[lastMatch as keyof typeof matrix] : lastMatch;

    sum += parseInt(`${firstMatch}${lastMatch}`);
  }

  console.log('Sum: ', sum);
};
