import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@sunnie/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@sunnie/ui/table";

export type PropDoc = {
  name: string;
  type: string;
  required: boolean;
  default: string | null;
};
export type PartDoc = { name: string; props: PropDoc[] };

function PropsPartTable({ props }: { props: PropDoc[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Prop</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Default</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.map((prop) => (
          <TableRow key={prop.name}>
            <TableHead scope="row" className="p-3">
              <code>{prop.name}</code>
              {prop.required && (
                <span className="mt-1 block text-[11px] text-muted-foreground">Required</span>
              )}
            </TableHead>
            <TableCell>
              <code>{prop.type}</code>
            </TableCell>
            <TableCell>
              <code>{prop.default ?? "—"}</code>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function PropsTable({ parts }: { parts: PartDoc[] }) {
  return (
    <div className="flex flex-col gap-4">
      {parts.length > 0 ? (
        <Accordion multiple defaultValue={parts[0] ? [parts[0].name] : []}>
          {parts.map((part) => (
            <AccordionItem key={part.name} value={part.name}>
              <AccordionTrigger>
                <code>{part.name}</code>
                <span className="text-xs font-normal text-muted-foreground">
                  {part.props.length} props
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <PropsPartTable props={part.props} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p className="text-sm text-muted-foreground">No component-specific props.</p>
      )}
    </div>
  );
}
