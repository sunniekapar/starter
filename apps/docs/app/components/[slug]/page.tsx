import { notFound } from "next/navigation";
import { catalog } from "@/app/_docs/catalog";
import { ComponentPage } from "@/app/_docs/component-page";
import { PropsTable, type PartDoc } from "@/app/_docs/props-table";
import propsData from "@/app/_docs/generated/props.json";

export function generateStaticParams() {
  return catalog.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const component = catalog.find((item) => item.slug === slug);
  return { title: component ? `${component.name} · sunnie/ui` : "Component not found" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const component = catalog.find((item) => item.slug === slug);
  if (!component) notFound();
  const parts: PartDoc[] = propsData[component.slug];
  return (
    <ComponentPage key={slug} component={component} propsTable={<PropsTable parts={parts} />} />
  );
}
