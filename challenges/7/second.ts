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

const spaceByDir: number[] = [];

const traverse = (dir: Dir) => {
  let sum = dir.files.reduce((a, b) => a + b, 0);

  for (const subDir of dir.dirs) {
    sum += traverse(subDir);
  }

  spaceByDir.push(sum);
  return sum;
};

const rootSpace = traverse(root);

const spaceNeeded = 30000000 - (70000000 - rootSpace);

let totalSum = 0;
spaceByDir.sort((a, b) => a - b);
for (const space of spaceByDir) {
  if (space > spaceNeeded) {
    totalSum = space;
    break;
  }
}

console.log(totalSum);
