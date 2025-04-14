import { db } from ".";
import { files_table, type DB_FileType } from "./schema";

export const QUERIES = {};

export const MUTATIONS = {
  createFile: async function (input: {
    file: {
      name: string;
      size: number;
      url: string;
      parent: number;
    };
    userId: string;
  }) {
    return await db.insert(files_table).values(input.file);
  },
};
