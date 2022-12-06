const input = await Deno.readTextFile("input.txt");

let result = 0;
for (let index = 0; index < input.length; index++) {
  try {
    const currentChars = input.slice(index - 4, index);
    const set = new Set(currentChars);
    if (set.size === 4) {
      result = index;
      break;
    }
  } catch (e) {
    //
  }
}

console.log(result);
