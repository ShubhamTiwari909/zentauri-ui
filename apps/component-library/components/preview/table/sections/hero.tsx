import { Section, SectionCard } from "@/components/common/Section";
import { PreviewHeroSeoBlock } from "@/components/preview/seo/hero-seo-block";
import type { PreviewSeoDocument } from "@/lib/preview-seo";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@zentauri-ui/zentauri-components/ui/table";

export function TableHeroSection({ seo }: { seo: PreviewSeoDocument }) {
  return (
    <Section variant="hero">
      <PreviewHeroSeoBlock seo={seo} />

      <SectionCard className="overflow-x-auto">
        <Table appearance="striped" size="sm">
          <TableCaption className="text-slate-800 dark:text-slate-400">
            Recent deploys
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Region</TableHead>
              <TableHead className="text-right">Latency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>API</TableCell>
              <TableCell>iad</TableCell>
              <TableCell className="text-right">42ms</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Workers</TableCell>
              <TableCell>fra</TableCell>
              <TableCell className="text-right">28ms</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </SectionCard>
    </Section>
  );
}
