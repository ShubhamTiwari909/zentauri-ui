"use client";

import { useState } from "react";

import PreviewCodeShowcase from "@/components/code-showcase/PreviewCodeShowcase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zentauri-ui/zentauri-components/ui/select";

import { ApiEndpointCardDemo } from "./demo";
import { API_METHODS } from "./data";
import { apiEndpointCardSnippet } from "./snippets";
import type { ApiEndpointMethod } from "./types";

export function ApiEndpointCardPlayground() {
  const [method, setMethod] = useState<ApiEndpointMethod>("GET");

  const code = apiEndpointCardSnippet({ method });

  return (
    <div className="mt-6 rounded-xl">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-slate-900 dark:text-white">
            Method
          </span>
          <Select
            multiple={false}
            value={[method]}
            onChange={(values) => {
              const next = values[0];
              if (next) {
                setMethod(next as ApiEndpointMethod);
              }
            }}
          >
            <SelectTrigger variant="outline" size="sm" className="w-full">
              <SelectValue placeholder={method} />
            </SelectTrigger>
            <SelectContent
              appearance="default"
              size="sm"
              className="max-h-72 overflow-y-auto"
            >
              {API_METHODS.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
      </div>
      <PreviewCodeShowcase code={code}>
        <ApiEndpointCardDemo method={method} />
      </PreviewCodeShowcase>
    </div>
  );
}
