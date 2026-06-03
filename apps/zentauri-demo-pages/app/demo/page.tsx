import { Badge } from "@zentauri-ui/zentauri-components/ui/badge";
import { Button } from "@zentauri-ui/zentauri-components/ui/buttons";
import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@zentauri-ui/zentauri-components/ui/card";
import { Heading, Text } from "@zentauri-ui/zentauri-components/ui/typography";

import { layoutRoutes } from "./landing-data";

export default function DemoIndexPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 sm:py-12 lg:px-8">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-4">
          <Badge appearance="gradient-teal" size="lg">
            Demo collection
          </Badge>
          <Heading
            level={1}
            displayLevel={1}
            className="max-w-4xl text-4xl sm:text-5xl lg:text-7xl"
          >
            Eight distinct Zentauri UI landing layouts with switchable themes.
          </Heading>
          <Text
            size="lg"
            tone="muted"
            className="max-w-2xl leading-7 sm:leading-8"
          >
            Choose a layout route, then use the theme tabs inside the page to
            preview the same content across visual styles.
          </Text>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {layoutRoutes.map((route) => (
            <Card key={route.slug} appearance="outline" rounded="lg" size="lg">
              <CardHeader className="">
                <CardTitle as="h2" className="" ref={undefined}>
                  {route.label}
                </CardTitle>
                <CardDescription className="" ref={undefined}>
                  {route.description}
                </CardDescription>
              </CardHeader>
              <CardBody className="gap-5 flex flex-col justify-between">
                <Text bold>
                  Shared content, route-level layout, local theme tabs.
                </Text>
                <Button
                  as="link"
                  href={`/demo/${route.slug}`}
                  appearance="gradient-teal"
                  className="w-full sm:w-auto"
                >
                  Open layout
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
