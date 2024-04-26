import { Navbar } from "@/components";

export default function Home() {
  return (
    <main className="flex items-start overflow-x-hidden">
      <Navbar />
      <span className="flex">Content</span>
    </main>
  );
}
