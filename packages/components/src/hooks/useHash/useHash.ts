"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type HashGeneratorAlgorithm =
  | "sha1"
  | "sha224"
  | "sha256"
  | "sha384"
  | "sha512";

export const ALGORITHM_LABELS: Record<HashGeneratorAlgorithm, string> = {
  sha1: "SHA-1",
  sha224: "SHA-224",
  sha256: "SHA-256",
  sha384: "SHA-384",
  sha512: "SHA-512",
};

async function computeHash(
  algorithm: HashGeneratorAlgorithm,
  input: string,
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest(
    algorithm.toUpperCase().replace("SHA", "SHA-") as AlgorithmIdentifier,
    data,
  );
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export type UseHashResult = {
  hash: string;
  isHashing: boolean;
  error: Error | undefined;
  recompute: () => void;
};

/**
 * Computes a cryptographic hash of `input` using the Web Crypto API.
 *
 * Automatically recomputes whenever `input` or `algorithm` changes.
 * Returns `{ hash, isHashing, error, recompute }` for rendering.
 *
 * @param input - The string to hash.
 * @param algorithm - Hash algorithm (default `"sha256"`).
 * @returns `{ hash, isHashing, error, recompute }`
 */
export function useHash(
  input: string,
  algorithm: HashGeneratorAlgorithm = "sha256",
): UseHashResult {
  const [hash, setHash] = useState("");
  const [isHashing, setIsHashing] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const nonceRef = useRef(0);

  useEffect(() => {
    if (!input) {
      setHash("");
      setIsHashing(false);
      setError(undefined);
      return;
    }
    const nonce = ++nonceRef.current;
    setIsHashing(true);
    setError(undefined);
    computeHash(algorithm, input).then(
      (result) => {
        if (nonce === nonceRef.current) {
          setHash(result);
          setIsHashing(false);
        }
      },
      (err) => {
        if (nonce === nonceRef.current) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setIsHashing(false);
        }
      },
    );
  }, [algorithm, input]);

  const recompute = useCallback(() => {
    nonceRef.current += 1;
    const nonce = nonceRef.current;
    setIsHashing(true);
    setError(undefined);
    computeHash(algorithm, input).then(
      (result) => {
        if (nonce === nonceRef.current) {
          setHash(result);
          setIsHashing(false);
        }
      },
      (err) => {
        if (nonce === nonceRef.current) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setIsHashing(false);
        }
      },
    );
  }, [algorithm, input]);

  return { hash, isHashing, error, recompute };
}
