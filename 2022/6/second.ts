const input = await Deno.readTextFile("input.txt");

let result = 0;
for (let index = 0; index < input.length; index++) {
  try {
    const currentChars = input.slice(index - 14, index);
    const set = new Set(currentChars);
    if (set.size === 14) {
      result = index;
      break;
    }
  } catch (_e) {
    //
  }
}

console.log(result);
