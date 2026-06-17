import { PropsTable } from "@/components/api/PropsTable";
import { Section } from "@/components/common/Section";

type PreviewApiSectionProps = {
  slug: string;
};

export function PreviewApiSection({ slug }: PreviewApiSectionProps) {
  return (
    <Section>
      <PropsTable slug={slug} />
    </Section>
  );
}
