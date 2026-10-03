import { readFile } from "node:fs/promises";
import { join } from "node:path";

export type Easing = {
  variable: string;
  name: string;
  direction: "in" | "out" | "in-out";
  value: string;
  points: [number, number, number, number];
};

export async function getEasings(): Promise<Easing[]> {
  const styles = await readFile(join(process.cwd(), "../../packages/ui/styles.css"), "utf8");

  // Read the shared tokens so the graphs always use the values in the stylesheet.
  const easings: Easing[] = [];
  for (const match of styles.matchAll(
    /(--ease-(in-out|in|out)-([\w-]+)):\s*(cubic-bezier\(([^)]+)\))/g,
  )) {
    const [, variable, direction, family, value, coordinates] = match;
    if (!variable || !direction || !family || !value || !coordinates) continue;

    easings.push({
      variable,
      name: `${direction === "in-out" ? "In Out" : direction === "in" ? "In" : "Out"} ${family.charAt(0).toUpperCase()}${family.slice(1)}`,
      direction: direction as Easing["direction"],
      value,
      points: coordinates.split(",").map(Number) as Easing["points"],
    });
  }
  return easings;
}
