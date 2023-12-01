const input = await Deno.readTextFile("./input.txt");

let score = 0;
const rounds = input.split("\r\n");
const pickPoints = {
  "X": 1,
  "Y": 2,
  "Z": 3,
};

const outcomePoints = {
  "A X": 3,
  "A Y": 6,
  "A Z": 0,
  "B X": 0,
  "B Y": 3,
  "B Z": 6,
  "C X": 6,
  "C Y": 0,
  "C Z": 3,
};

for (const round of rounds) {
  let roundScore = outcomePoints[round as keyof typeof outcomePoints];

  const yourPick = round.split(" ").pop();
  roundScore += pickPoints[yourPick as keyof typeof pickPoints];

  score += roundScore;
}

console.log("score:", score);
