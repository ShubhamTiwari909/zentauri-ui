import type { HashGeneratorProps } from "@zentauri-ui/zentauri-components/ui/hash-generator";

export type HashGeneratorAppearance = NonNullable<
  HashGeneratorProps["appearance"]
>;
export type HashGeneratorSize = NonNullable<HashGeneratorProps["size"]>;
export type HashGeneratorAlgorithm = NonNullable<
  HashGeneratorProps["algorithm"]
>;

export type HashGeneratorDemoProps = {
  algorithm: HashGeneratorAlgorithm;
};
