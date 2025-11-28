import * as v from "valibot";
import { VideoSchema } from "./schemas";

export async function YTSearchAPI(query: string, sort: string, pageToken?: string) {
  const response = await fetch(
    `https://yt-worker.riven7897.workers.dev/search?q=${encodeURIComponent(query)}&order=${sort}&pageToken=${pageToken}`
  );

  if (!response.ok) throw new Error("Network response was not ok");

  const json = await response.json();
  const validated = v.safeParse(VideoSchema, json);

  if (!validated.success) {
    console.error("Validation error:", validated.issues);
    throw new Error("Invalid API response");
  }

  return validated.output;
}
