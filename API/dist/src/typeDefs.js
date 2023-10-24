import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
const loadedFiles = loadFilesSync(path.join(path.resolve("./src/schema"), "*.graphql"));
const typeDefs = mergeTypeDefs(loadedFiles);
console.log(loadedFiles.at(0));
export default typeDefs;
