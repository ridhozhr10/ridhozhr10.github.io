import { Metadata } from "next";
import { getAboutContent } from "@/lib/api";
import BaseLayout from "@/app/_components/layout/BaseLayout";
import mdToHtml from "@/lib/markdown";
import Markdown from "@/app/_components/Markdown";

const { title, description, content } = getAboutContent();

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
};

export default async function About() {
  const contentParsed = await mdToHtml(content);

  return (
    <BaseLayout logoText="whoami">
      <main className="post">
        <article>
          <h1 className="text-5xl font-bold my-6">About</h1>
          <Markdown content={contentParsed} />
        </article>
      </main>
    </BaseLayout>
  );
}
