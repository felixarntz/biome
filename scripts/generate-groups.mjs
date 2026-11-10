import { join } from "node:path";
import {
  getGroups,
  getRuleFiles,
  rulesDir,
  writeBundle,
} from "./bundle-utils.mjs";

for (const group of getGroups()) {
  writeBundle({
    files: getRuleFiles({ group }),
    generatorScript: "generate-groups.mjs",
    outFile: join(rulesDir, `${group}.grit`),
    sourceDescription: `rules/${group}/`,
  });
}
