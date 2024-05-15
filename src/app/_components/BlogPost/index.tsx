import "./markdown.css";
import "highlight.js/styles/monokai.css";

export type BlogPostProps = {
  content: string;
  title: string;
};
// TODO: selesain, kalo bingung liat aja contohnya referensi
export default function BlogPost({ content }: BlogPostProps) {
  return (
    <>
      <h1 className="my-20 block mx-auto text-5xl text-center">
        WIP: CONSTRUCTION
      </h1>
      <article
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
}
