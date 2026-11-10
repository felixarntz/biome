import { join } from "node:path";
import {
  getGroups,
  getRuleFiles,
  rulesDir,
  writeBundle,
} from "./bundle-utils.mjs";

const groups = getGroups();
const files = groups.flatMap((group) => getRuleFiles({ group }));

writeBundle({
  files,
  generatorScript: "generate-all.mjs",
  outFile: join(rulesDir, "all.grit"),
  sourceDescription: "all rule group folders under rules/",
});
