import type { Metadata } from "next";
import DemoSection from "@/components/home/DemoSection";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "Thirty minutes with an editor, not a salesperson. Bring us a real fixture and a real market.",
};

export default function DemoPage() {
  return <DemoSection />;
}
