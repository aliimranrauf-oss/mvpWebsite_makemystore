"use client";
import { widgets } from "./Widgets";
export default function ToolRunner({ slug }: { slug: string }) {
  const W = widgets[slug];
  return W ? <W /> : null;
}
