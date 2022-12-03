const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\r\n");

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

let result = 0;

while (lines.length > 0) {
  const lineGroup = lines.splice(0, 3);
  for (
    let alphabetIndex = 0;
    alphabetIndex < alphabet.length;
    alphabetIndex++
  ) {
    const letter = alphabet[alphabetIndex];
    if (lineGroup.every((line) => line.includes(letter))) {
      console.log(letter);
      result += alphabetIndex + 1;
      break;
    }
  }
}

console.log(result);
