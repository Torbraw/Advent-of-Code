import { getFileLines } from '../../utils';

export const firstChallenge = async () => {
  const lines = await getFileLines(__dirname, 'input.txt');
  let result = 0;

  for (const line of lines) {
    const numbers = line.split(':')[1]?.split('|') ?? [];
    const winningNumbers = [...(numbers[0]?.matchAll(/\d+/g) ?? [])].map((match) => match[0]);
    const myNumbers = [...(numbers[1]?.matchAll(/\d+/g) ?? [])].map((match) => match[0]);

    let score = 0;
    for (const number of winningNumbers) {
      if (myNumbers.includes(number)) {
        score = score * 2 || 1;
      }
    }
    result += score;
  }

  console.log('Sum: ', result);
};

export const secondChallenge = async () => {
  const lines = await getFileLines(__dirname, 'input.txt');
  let result = lines.length;
  const toProcess = Array.from({ length: lines.length }, (_, i) => i);
  const seenLines: Record<number, number[]> = {};

  while (toProcess.length > 0) {
    const index = toProcess.pop();
    if (index === undefined) {
      break;
    }

    const numbers = (
      seenLines[index] ? seenLines[index] : getMatchingNumbers(lines[index] ?? '', index + 1)
    ) as number[];
    seenLines[index] = numbers;
    toProcess.push(...numbers);

    result += numbers.length;
  }

  console.log('Sum: ', result);
};

const getMatchingNumbers = (line: string, index: number) => {
  if (!line) {
    return [];
  }

  const numbers = line.split(':')[1]?.split('|') ?? [];
  const winningNumbers = [...(numbers[0]?.matchAll(/\d+/g) ?? [])].map((match) => match[0]);
  const myNumbers = [...(numbers[1]?.matchAll(/\d+/g) ?? [])].map((match) => match[0]);

  return winningNumbers.filter((number) => myNumbers.includes(number)).map((_, i) => index + i);
};
