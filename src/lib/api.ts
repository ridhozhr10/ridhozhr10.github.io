import { Post } from "@/interfaces/post";
import { lstatSync, readFileSync, readdirSync } from "fs";
import { dirname, join, sep } from "path";
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

export function getPostAndDirSlugs(): string[] {
  const readDir = (path: string): string[] | undefined => {
    const pathSplit = path.split(sep).map((d) => d.replace(/\.md$/, ""));
    const postsDirIndex = pathSplit.indexOf("posts");

    if (lstatSync(path).isDirectory()) {
      const currentDirName = pathSplit
        .filter((_, i) => i > postsDirIndex)
        .join("/");
      return [
        currentDirName,
        ...readdirSync(path)
          .map((childPath) => readDir(join(path, childPath)))
          .flat(),
      ] as string[];
    } else {
      // get from year only
      return [pathSplit.filter((_, i) => i > postsDirIndex).join("/")];
    }
  };

  const res = readDir(postsDir) || [];
  return res.filter((d) => d);
}

interface SinglePost {
  type: "post";
  post: Post;
}

interface Directory {
  type: "dir";
  dir: Post[];
}

export type PostOrDir = SinglePost | Directory;

export function getPostOrDirBySlug(slug: string): PostOrDir {
  const split = slug.split("/").map((d) => d.replace(/\.md$/, ""));
  const fullPath = join(postsDir, ...split);
  try {
    if (lstatSync(fullPath).isDirectory()) {
      return {
        type: "dir",
        dir: getAllPosts().filter((d) => {
          const split = slug.split("/");
          let res = true;
          for (let i = 0; i < split.length; i++) {
            res = split[i] === d.path[i];
            if (!res) break;
          }
          return res;
        }),
      };
    }
  } catch {
    // do nothing
  }

  const fileContents = readFileSync(`${fullPath}.md`, "utf8");
  const { data, content } = matter(fileContents);
  const post: Post = { ...(data as Post), path: split, content };
  return {
    post,
    type: "post",
  };
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
  const postList: SinglePost[] = slugs
    .map((slug) => getPostOrDirBySlug(slug))
    .filter((d) => d.type === "post") as SinglePost[];
  const posts = postList
    .map((d) => d.post as Post)
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

export function getPostGroupByYear(tag?: string): PostGroup[] {
  const result: PostGroup[] = [];
  getAllPosts().forEach((post) => {
    // filter
    if (tag && !post.tags.includes(tag)) {
      return;
    }
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

export function getAllTags(): string[] {
  const res: string[] = ["tag6"];
  getAllPosts().forEach((post) => {
    post.tags.forEach((tag) => {
      if (!res.includes(tag)) {
        res.push(tag);
      }
    });
  });

  return res;
}
