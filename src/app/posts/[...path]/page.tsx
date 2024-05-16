import BlogPost from "@/app/_components/BlogPost";
import BaseLayout from "@/app/_components/layout/BaseLayout";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import mdToHtml from "@/lib/markdown";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { path: string[]; realPath: string };
};

export default async function Post({ params }: Props) {
  const post = getPostBySlug(params.path.join("/"));

  if (!post) {
    return notFound();
  }

  const content = await mdToHtml(post.content);
  return (
    <BaseLayout logoText="cat ./content.txt | less ">
      <main className="post">
        <BlogPost content={content} title={post.title} />
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
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    path: post.path,
  }));
}
