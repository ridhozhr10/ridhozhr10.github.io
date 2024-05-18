import Link from "next/link";
import "./markdown.css";
import "./style.scss";
import "highlight.js/styles/monokai.css";

export type BlogPostProps = {
  content: string;
  title: string;
};

export default function BlogPost({ content, ...post }: BlogPostProps) {
  return (
    <>
      <article>
        <h1 className="text-4xl mb-5 mt-12 font-bold ">
          <Link href="" className="no-underline">
            {post.title}
          </Link>
        </h1>
        <div
          className="markdown-body mt-[30px]"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
      <hr className="bg-[#4e4e57] h-[1px]" />
      <div className="post-info">
        <p></p>
      </div>
      <div id="pagination"></div>
    </>
  );
}
