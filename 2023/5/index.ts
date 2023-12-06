import { getFileLines } from '../../utils';

export const firstChallenge = async () => {
  const lines = await getFileLines(__dirname, 'input.txt');
  const inputs =
    lines
      .shift()
      ?.split(':')[1]
      ?.trim()
      ?.split(' ')
      .map((s) => parseInt(s)) ?? [];

  let mappedSeedIndexes: number[] = [];
  for (const line of lines) {
    if (!line) {
      continue;
    }

    if (line.includes('map')) {
      mappedSeedIndexes = [];
      continue;
    }

    const [destinationStart, sourceStart, range] = line.split(' ').map((x) => parseInt(x));
    if (destinationStart === undefined || sourceStart === undefined || range === undefined) {
      continue;
    }

    for (let i = 0; i < inputs.length; i++) {
      if (mappedSeedIndexes.includes(i)) {
        continue;
      }

      const input = inputs[i]!;
      if (input >= sourceStart && input < sourceStart + range) {
        const diff = destinationStart - sourceStart;
        inputs[i] = input + diff;
        mappedSeedIndexes.push(i);
      }
    }
  }

  console.log('Result:', Math.min(...inputs));
};

export const secondChallenge = async () => {
  const lines = await getFileLines(__dirname, 'input.txt');
  const result = 0;

  console.log('Result: ', result);
};
