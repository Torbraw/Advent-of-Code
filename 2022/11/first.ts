const input = await Deno.readTextFile("input.txt");

const instructions = input.split("\r\n\r\n");

type Monkey = {
  items: number[];
  operation: (n: number) => number;
  condition: (n: number) => number;
  count: number;
};

const monkeys: Monkey[] = [];

for (const instruction of instructions) {
  const lines = instruction.split("\r\n");

  const monkey: Monkey = {
    items: lines[1].split(":")[1].split(",").map(Number),
    operation: (n: number) => {
      const [op, count] = lines[2].replace("  Operation: new = old ", "").split(" ");

      const amount = count === "old" ? n : parseInt(count);

      if (op === "+") return n + amount;
      if (op === "*") return n * amount;
      throw new Error("Invalid operation");
    },
    condition: (n: number) => {
      const conditition = parseInt(lines[3].replace("  Test: divisible by ", ""));
      const trueMonkey = parseInt(lines[4].replace("    If true: throw to monkey ", ""));
      const falseMonkey = parseInt(lines[5].replace("    If false: throw to monkey ", ""));

      if (n % conditition === 0) return trueMonkey;
      return falseMonkey;
    },
    count: 0,
  };

  monkeys.push(monkey);
}

for (let i = 0; i < 20; i++) {
  for (const monkey of monkeys) {
    while (monkey.items.length > 0) {
      monkey.count++;
      const item = monkey.items.shift()!;
      const result = Math.floor(monkey.operation(item) / 3);
      const nextMonkey = monkey.condition(result);
      monkeys[nextMonkey].items.push(result);
    }
  }
}

const [mostActive, secondMostActive] = monkeys.sort((a, b) => b.count - a.count);

console.log(mostActive.count * secondMostActive.count);
