const input = await Deno.readTextFile("input.txt");

const [cratesRowsString, directions] = input.split("\r\n\r\n");

const cratesRows = cratesRowsString.split("\r\n").reverse();
const numberOfCratesRow = cratesRows.shift()?.split("   ").length || 0;

const stacks = new Map<number, string[]>();

for (let i = 0; i < numberOfCratesRow; i++) {
  for (const crateRow of cratesRows) {
    const currentCrate = crateRow.slice(i * 4, i * 4 + 3).trim().match(/\w/)?.[0] || null;
    if (currentCrate) {
      stacks.set(i + 1, [...stacks.get(i + 1) || [], currentCrate]);
    }
  }
}

const lines = directions.split("\r\n");
for (const line of lines) {
  const numbers = line.match(/\d+/g);
  const [quantity, from, to] = numbers?.map((n) => parseInt(n)) as number[];

  const currentStack = stacks.get(from) as string[];
  const cratesToMove: string[] = [];
  for (let i = 0; i < quantity; i++) {
    cratesToMove.push(currentStack.pop() as string);
  }

  if (quantity > 1) {
    cratesToMove.reverse();
  }
  stacks.set(to, [...stacks.get(to) || [], ...cratesToMove]);
}

const result = Array.from(stacks.values()).map((stack) => stack.pop()).join("");

console.log(result);
