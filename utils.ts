import { readFile } from 'fs/promises';
import { resolve } from 'path';

export const getFileLines = async (dirname: string, path: string): Promise<string[]> => {
  const input = await readFile(resolve(dirname, path), 'utf8');

  return input.split('\r\n');
};
