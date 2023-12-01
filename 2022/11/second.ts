const input = await Deno.readTextFile("input.txt");

const instructions = input.split("\r\n\r\n");

type Monkey = {
  items: number[];
  operation: (n: number) => number;
  condition: (n: number) => number;
  count: number;
  divisor: number;
};

const monkeys: Monkey[] = [];

for (const instruction of instructions) {
  const lines = instruction.split("\r\n");
  const divisor = parseInt(lines[3].replace("  Test: divisible by ", ""));

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
      const trueMonkey = parseInt(lines[4].replace("    If true: throw to monkey ", ""));
      const falseMonkey = parseInt(lines[5].replace("    If false: throw to monkey ", ""));

      if (n % divisor === 0) return trueMonkey;
      return falseMonkey;
    },
    count: 0,
    divisor: divisor,
  };

  monkeys.push(monkey);
}

const modulo = monkeys.reduce((a, b) => a * b.divisor, 1);

for (let i = 0; i < 10000; i++) {
  for (const monkey of monkeys) {
    while (monkey.items.length > 0) {
      monkey.count++;
      const item = monkey.items.shift()!;
      const result = monkey.operation(item) % modulo;
      const nextMonkey = monkey.condition(result);
      monkeys[nextMonkey].items.push(result);
    }
  }
}

const [mostActive, secondMostActive] = monkeys.sort((a, b) => b.count - a.count);

console.log(mostActive.count * secondMostActive.count);
