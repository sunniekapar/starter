import type { Metadata } from "next";
import { EasingGrid } from "../_docs/easing-grid";
import { getEasings } from "../_docs/easings";

export const metadata: Metadata = {
  title: "Easings · sunnie/ui",
  description: "Easing curves from the @sunnie/ui CSS variables.",
};

export default async function Page() {
  return <EasingGrid easings={await getEasings()} />;
}
