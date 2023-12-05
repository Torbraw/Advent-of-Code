import { readFile } from 'fs/promises';
import { resolve } from 'path';

export const getFileLines = async (dirname: string, path: string): Promise<string[]> => {
  const input = await readFile(resolve(dirname, path), 'utf8');

  return input.split('\r\n');
};

export const getAdjacentTiles = (map: string[][], y: number, x: number) => {
  return [
    map[y - 1]?.[x - 1],
    map[y - 1]?.[x],
    map[y - 1]?.[x + 1],
    map[y]?.[x - 1],
    map[y]?.[x + 1],
    map[y + 1]?.[x - 1],
    map[y + 1]?.[x],
    map[y + 1]?.[x + 1],
  ];
};
