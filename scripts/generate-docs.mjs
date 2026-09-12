import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { catalog } from "../app/_docs/catalog.ts";

// Read the public component types without inherited React, DOM, and Base UI rendering props.
const root = process.cwd();
const configFile = ts.readConfigFile("tsconfig.json", ts.sys.readFile);
const config = ts.parseJsonConfigFileContent(configFile.config, ts.sys, root);
const files = fs
  .readdirSync("components/ui")
  .filter((file) => file.endsWith(".tsx"))
  .sort();
const actualSlugs = files.map((file) => file.replace(/\.tsx$/, ""));
const catalogSlugs = catalog.map((component) => component.slug);
const missing = actualSlugs.filter((slug) => !catalogSlugs.includes(slug));
const unknown = catalogSlugs.filter((slug) => !actualSlugs.includes(slug));
if (missing.length || unknown.length || new Set(catalogSlugs).size !== catalogSlugs.length) {
  throw new Error(
    `Docs catalog is out of sync. Missing: ${missing.join(", ")}. Unknown: ${unknown.join(", ")}. Check duplicate slugs too.`,
  );
}
const program = ts.createProgram(
  files.map((file) => path.join(root, "components/ui", file)),
  config.options,
);
const checker = program.getTypeChecker();
const output = {};
const inheritedPropPattern =
  /[/\\]@types[/\\]react[/\\]|[/\\]typescript[/\\]lib[/\\]|[/\\]@base-ui[/\\]react[/\\]internals[/\\]types\.d\.[mc]?ts$/;

for (const file of files) {
  const source = program.getSourceFile(path.join(root, "components/ui", file));
  const moduleSymbol = checker.getSymbolAtLocation(source);
  const parts = [];
  for (const exported of checker.getExportsOfModule(moduleSymbol)) {
    const name = exported.getName();
    if (!/^[A-Z]/.test(name)) continue;
    const symbol =
      exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;
    const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];
    if (!declaration) continue;
    const type = checker.getTypeOfSymbolAtLocation(symbol, declaration);
    const signatures = type.getCallSignatures();
    if (!signatures.length) continue;
    const defaults = {};
    if (ts.isFunctionDeclaration(declaration) || ts.isArrowFunction(declaration)) {
      const binding = declaration.parameters[0]?.name;
      if (binding && ts.isObjectBindingPattern(binding)) {
        for (const element of binding.elements) {
          if (element.initializer)
            defaults[(element.propertyName ?? element.name).getText()] =
              element.initializer.getText();
        }
      }
    }
    // Merge overloads and discriminated union branches instead of losing branch-only props.
    const propsByName = new Map();
    for (const signature of signatures) {
      const parameter = signature.parameters[0];
      if (!parameter) continue;
      const propsType = checker.getTypeOfSymbolAtLocation(parameter, declaration);
      const branches = propsType.isUnion() ? propsType.types : [propsType];
      for (const branch of branches) {
        for (const prop of checker.getPropertiesOfType(branch)) {
          const propName = prop.getName();
          const declarations = prop.getDeclarations() ?? [];
          if (
            declarations.length > 0 &&
            declarations.every((node) => inheritedPropPattern.test(node.getSourceFile().fileName))
          ) {
            continue;
          }
          const propType = checker.getTypeOfSymbolAtLocation(prop, declaration);
          const typeText = checker
            .typeToString(propType, declaration, ts.TypeFormatFlags.NoTruncation)
            .replace(/import\("([^"\n]+)"\)\./g, (_, modulePath) =>
              modulePath.includes("@types/react/") ? "React." : "",
            );
          const previous = propsByName.get(propName);
          if (previous) {
            if (!previous.types.includes(typeText)) previous.types.push(typeText);
            previous.required &&= !(prop.flags & ts.SymbolFlags.Optional);
            continue;
          }
          propsByName.set(propName, {
            name: propName,
            types: [typeText],
            required:
              !(prop.flags & ts.SymbolFlags.Optional) &&
              branches.every((branch) => checker.getPropertyOfType(branch, propName)),
            default: defaults[propName] ?? null,
          });
        }
      }
    }
    const props = [...propsByName.values()]
      .map(({ types, ...prop }) => ({ ...prop, type: types.join(" | ") }))
      .sort((a, b) => {
        const order = [
          "variant",
          "size",
          "state",
          "orientation",
          "value",
          "defaultValue",
          "checked",
          "defaultChecked",
          "disabled",
          "open",
          "defaultOpen",
        ];
        const rank = (name) => (order.includes(name) ? order.indexOf(name) : order.length);
        return rank(a.name) - rank(b.name) || a.name.localeCompare(b.name);
      });
    if (props.length > 0) parts.push({ name, props });
  }
  const slug = file.replace(/\.tsx$/, "");
  const primaryName = slug
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("");
  const primary =
    {
      resizable: "ResizablePanelGroup",
      direction: "DirectionProvider",
      chart: "ChartContainer",
      toast: "Toaster",
    }[slug] ?? primaryName;
  parts.sort(
    (a, b) =>
      Number(b.name.toLowerCase() === primary.toLowerCase()) -
        Number(a.name.toLowerCase() === primary.toLowerCase()) || a.name.localeCompare(b.name),
  );
  output[slug] = parts;
}
fs.mkdirSync("app/_docs/generated", { recursive: true });
fs.writeFileSync("app/_docs/generated/props.json", JSON.stringify(output));
console.log(
  `Read props for ${files.length} component files (${Object.values(output).flat().length} exports).`,
);
