const input = await Deno.readTextFile("input.txt");

const lines = input.split("\r\n");

type Dir = {
  parent?: Dir;
  name: string;
  files: number[];
  dirs: Dir[];
};

const root: Dir = {
  name: "/",
  files: [],
  dirs: [],
};

let currentDir = root;

for (const line of lines) {
  const [cmd, ...other] = line.split(" ");
  if (cmd === "$") {
    if (other[0] === "cd") {
      const dir = other[1];
      if (dir === "..") {
        currentDir = currentDir.parent!;
      } else if (dir === "/") {
        currentDir = root;
      } else {
        let newDir = currentDir.dirs.find((d) => d.name === dir);
        if (!newDir) {
          newDir = {
            parent: currentDir,
            name: dir,
            files: [],
            dirs: [],
          };
        }
        currentDir.dirs.push(newDir);
        currentDir = newDir;
      }
    }
  } else {
    if (cmd != "dir") {
      currentDir.files.push(parseInt(cmd));
    }
  }
}

let totalSum = 0;

const traverse = (dir: Dir) => {
  let sum = dir.files.reduce((a, b) => a + b, 0);

  for (const subDir of dir.dirs) {
    sum += traverse(subDir);
  }

  if (sum < 100000) {
    totalSum += sum;
  }
  return sum;
};

traverse(root);

console.log(totalSum);
