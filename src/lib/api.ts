import { Post } from "@/interfaces/post";
import { lstatSync, readFileSync, readdirSync } from "fs";
import { join, sep } from "path";
import matter from "gray-matter";

const postsDir = join(process.cwd(), "_contents", "posts");

export function getPostSlugs(): string[] {
  const readDir = (path: string): string[] | undefined => {
    if (lstatSync(path).isDirectory()) {
      return readdirSync(path)
        .map((childPath) => readDir(join(path, childPath)))
        .flat() as string[];
    } else {
      const pathSplit = path.split(sep);
      // get from year only
      const postsDirIndex = pathSplit.indexOf("posts");
      return [pathSplit.filter((_, i) => i > postsDirIndex).join("/")];
    }
  };

  return readDir(postsDir) || [];
}

export function getPostBySlug(slug: string): Post {
  const split = slug.split("/").map((d) => d.replace(/\.md$/, ""));
  const fullPath = join(postsDir, ...split);
  const fileContents = readFileSync(`${fullPath}.md`, "utf8");
  const { data, content } = matter(fileContents);
  return {
    ...data,
    path: split,
    content: content,
  } as Post;
}

export type SinglePagination = { prev?: Post; next?: Post };

export function getNextPreviousPost(post: Post): SinglePagination {
  const result: SinglePagination = {};

  const allPost = getAllPosts();
  const idxCurrent = allPost
    .map((d) => d.path.join("/"))
    .findIndex((d) => d === post.path.join("/"));

  if (allPost[idxCurrent - 1]) {
    result.prev = allPost[idxCurrent - 1];
  }
  if (allPost[idxCurrent + 1]) {
    result.next = allPost[idxCurrent + 1];
  }

  return result;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => {
      return a.path.join("/") > b.path.join("/") ? -1 : 1;
    });
  return posts;
}

type PostGroup = {
  year: string;
  data: {
    slug: string;
    title: string;
    date: Date;
  }[];
};

export function getPostGroupByYear(): PostGroup[] {
  const result: PostGroup[] = [];
  getAllPosts().forEach((post) => {
    const [year] = post.path;
    const idxResult = result.map((d) => d.year).indexOf(year);
    const data = {
      slug: post.path.join("/"),
      title: post.title,
      date: new Date(post.created_at),
    };
    if (idxResult < 0) {
      result.push({
        year,
        data: [data],
      });
    } else {
      result[idxResult].data.push(data);
    }
  });
  return result;
}
