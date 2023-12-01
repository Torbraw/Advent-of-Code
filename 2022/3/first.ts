const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\r\n");

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

let result = 0;

for (const line of lines) {
  const middleIndex = line.length / 2;
  const first = line.slice(0, middleIndex);
  const second = line.slice(middleIndex, line.length);

  for (const letter of first) {
    if (second.includes(letter)) {
      result += alphabet.indexOf(letter) + 1;
      break;
    }
  }
}

console.log(result);
