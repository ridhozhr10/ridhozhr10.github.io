import { Metadata } from "next";
import { getAboutContent } from "@/lib/api";
import BaseLayout from "@/app/_components/layout/BaseLayout";
import mdToHtml from "@/lib/markdown";
import Markdown from "@/app/_components/Markdown";
import { BiEnvelope, BiLogoGithub, BiLogoLinkedinSquare } from "react-icons/bi";
import { baseURL } from "@/constants";

const { title, description } = getAboutContent();

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: `${baseURL}/about`,
    images: ["/img/smug-ico.png"],
    type: "website",
  },
};

export default async function About() {
  const { content } = getAboutContent();
  const contentParsed = await mdToHtml(content);

  return (
    <BaseLayout logoText="whoami">
      <main className="post">
        <article>
          <h1 className="text-5xl font-bold my-6">About</h1>
          <Markdown content={contentParsed} />
          <div className="mt-5 text-5xl flex gap-2 justify-start">
            <a
              href="mailto:azharridho42@gmail.com"
              target="_blank"
              rel="me noopener"
            >
              <BiEnvelope />
            </a>
            <a
              href="https://www.linkedin.com/in/ridhozhr10/"
              target="_blank"
              rel="me noopener"
            >
              <BiLogoLinkedinSquare />
            </a>
            <a
              href="https://github.com/ridhozhr10"
              target="_blank"
              rel="me noopener"
            >
              <BiLogoGithub />
            </a>
          </div>
        </article>
      </main>
    </BaseLayout>
  );
}
