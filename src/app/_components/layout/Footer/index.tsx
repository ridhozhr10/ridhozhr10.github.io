import { baseURL } from "@/constants";
import style from "./style.module.scss";

const Footer = () => (
  <footer className={style.footer}>
    <div className={style.inner}>
      <div className={style.content}>
        <span>© 2024</span>
        <span>
          <a href={baseURL}>Ridho Azhar</a>
        </span>
        <span>
          Inspired by{" "}
          <a href="https://cyberknight777.dev/" target="_blank" rel="noopener">
            cyberknight777
          </a>
        </span>
      </div>
    </div>
    <div className={style.inner}>
      <div className={style.content}>
        <span>
          Powered by{" "}
          <a href="https://nextjs.org/" target="_blank" rel="noopener">
            Next.js
          </a>
        </span>
        <span>
          Theme inspired by{" "}
          <a
            href="https://www.djordjeatlialp.de/"
            target="_blank"
            rel="noopener"
          >
            Djordje Atlialp
          </a>
        </span>
        <span>
          <a
            href="https://github.com/ridhozhr10/ridhozhr10.github.io"
            target="_blank"
            rel="noopener"
          >
            source code
          </a>
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
