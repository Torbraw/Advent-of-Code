const input = await Deno.readTextFile("./input.txt");

let score = 0;
const rounds = input.split("\r\n");
const pickPoints = {
  "X": 0,
  "Y": 3,
  "Z": 6,
};

const outcomePoints = {
  "A X": 3,
  "A Y": 1,
  "A Z": 2,
  "B X": 1,
  "B Y": 2,
  "B Z": 3,
  "C X": 2,
  "C Y": 3,
  "C Z": 1,
};

for (const round of rounds) {
  let roundScore = outcomePoints[round as keyof typeof outcomePoints];

  const yourPick = round.split(" ").pop();
  roundScore += pickPoints[yourPick as keyof typeof pickPoints];

  score += roundScore;
}

console.log("score:", score);
