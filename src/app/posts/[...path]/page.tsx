import BlogPost from "@/app/_components/BlogPost";
import BaseLayout from "@/app/_components/layout/BaseLayout";
import { baseURL } from "@/constants";
import { getAllPosts, getNextPreviousPost, getPostBySlug } from "@/lib/api";
import mdToHtml from "@/lib/markdown";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { path: string[]; realPath: string };
};

export default async function Post({ params }: Props) {
  const post = getPostBySlug(params.path.join("/"));
  const pagination = getNextPreviousPost(post);
  if (!post) {
    return notFound();
  }

  const content = await mdToHtml(post.content);
  return (
    <BaseLayout logoText="cat ./content.txt | less ">
      <main className="post">
        <BlogPost {...post} content={content} pagination={pagination} />
      </main>
    </BaseLayout>
  );
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.path.join("/"));

  if (!post) {
    return notFound();
  }

  const title = `${post.title} :: Ridho Azhar`;

  return {
    title,
    description: post.description,
    robots: { follow: true, index: true },
    openGraph: {
      title,
      url: `${baseURL}/posts/${post.path.join("/")}`,
      description: post.description,
      images: [post.ogImage.url],
      type: "article",
      authors: "ridhozhr10.github.io",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    path: post.path,
  }));
}
