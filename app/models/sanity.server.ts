import { createClient } from "@sanity/client";
import { makeSafeQueryRunner } from "groqd";

export const client = createClient({
  projectId: process.env.SANITY_PUBLIC_PROJECT_ID,
  dataset: process.env.SANITY_PUBLIC_DATASET,
  apiVersion: process.env.SANITY_PUBLIC_API_VERSION,
  useCdn: true,
});

export const runQuery = makeSafeQueryRunner(
  (query: string, params: Record<string, number | string> = {}) =>
    client.fetch(query, params)
);
