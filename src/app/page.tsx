import Image from "next/image";
import BaseLayout from "./_components/layout/BaseLayout";
import { BiEnvelope, BiLogoGithub, BiLogoLinkedinSquare } from "react-icons/bi";
import { baseMetadata } from "@/constants";

export const metadata = baseMetadata("");

export default function Home() {
  return (
    <BaseLayout>
      <main>
        <div>
          <Image
            src="/img/smug-ico.png"
            width={125}
            height={125}
            alt="current favorite picture"
            className="rounded-full mx-auto"
          />
          <h1 className="text-5xl mt-8 mb-2 font-bold">Ridho Azhar</h1>
          <p className="text-lg mb-2">
            I like playing, using and commanding computer.
          </p>
          <div className="text-5xl flex gap-2 justify-center">
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
        </div>
      </main>
    </BaseLayout>
  );
}
