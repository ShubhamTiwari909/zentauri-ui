import type { HashGeneratorProps } from "@zentauri-ui/zentauri-components/ui/hash-generator";

export const HASH_GENERATOR_ALGORITHMS = [
  "sha1",
  "sha256",
  "sha384",
  "sha512",
] as const satisfies readonly NonNullable<HashGeneratorProps["algorithm"]>[];
