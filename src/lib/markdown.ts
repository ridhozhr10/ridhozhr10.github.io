import { unified } from "unified";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkToc from "remark-toc";
import remarkEmbedder from "@remark-embedder/core";
import oembedTransformer from "@remark-embedder/transformer-oembed";
import type { Config } from "@remark-embedder/transformer-oembed";
import remarkAttrs from "./remark-attrs";

export default async function mdToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkToc, {
      maxDepth: 3,
    })
    .use(remarkEmbedder, {
      transformers: [oembedTransformer],
      handleHTML(html, info) {
        if (html === null) {
          return html;
        }
        return html
          .replace(`width="200"`, `width="600"`)
          .replace(`height="113"`, `height="337"`);
      },
    })
    .use(remarkAttrs)
    .use(remarkGfm)
    .use(remarkUnwrapImages)
    .use(remarkRehype, {
      // handlers: {
      // }
    })
    .use(rehypeSlug)
    .use(rehypeStringify, {})
    .use(rehypeHighlight)
    .process(markdown);
  return String(result);
}
