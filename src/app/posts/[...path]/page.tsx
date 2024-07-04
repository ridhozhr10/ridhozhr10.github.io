import BlogPost from "@/app/_components/BlogPost";
import BaseLayout from "@/app/_components/layout/BaseLayout";
import { baseURL } from "@/constants";
import {
  getNextPreviousPost,
  getPostAndDirSlugs,
  getPostOrDirBySlug,
} from "@/lib/api";
import mdToHtml from "@/lib/markdown";
import dayjs from "dayjs";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import "@/app/posts/style.scss";
import { BiTagAlt } from "react-icons/bi";

type Props = {
  params: { path: string[] };
};

export default async function Post({ params }: Props) {
  const data = getPostOrDirBySlug(params.path.join("/"));
  if (data.type === "dir") {
    if (data.dir.length < 0) {
      return notFound();
    }
    return (
      <BaseLayout logoText={`ls -h $POSTS_DIR/${params.path.join("/")}`}>
        <main className="post">
          <h1 className="text-5xl font-bold my-6">
            Posts on {params.path.join("/")}
          </h1>
          <div className="posts-group">
            <ul className="posts-list">
              {data.dir.map((post) => (
                <li key={post.path.join("/")} className="post-item">
                  <Link
                    href={`/posts/${post.path.join("/")}`}
                    className="post-item-inner"
                  >
                    <span className="post-title">{post.title}</span>
                    <span className="post-day">
                      {dayjs(post.created_at).format("MMM DD, YYYY")}
                    </span>
                  </Link>
                  <div className="flex items-center mb-[5px]">
                    <BiTagAlt className="mr-2" />
                    {post.tags.map((tag) => (
                      <Link
                        key={post.title + tag}
                        href={`/tags/${tag}`}
                        className="p-1 bg-header-bg-dark bg-opacity-50 mr-2 rounded-md hover:bg-opacity-100"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </BaseLayout>
    );
  }

  const { post } = data;
  const pagination = getNextPreviousPost(post);
  if (!post) {
    return notFound();
  }

  const content = await mdToHtml(post.content);
  return (
    <BaseLayout logoText="cat ./content.txt | less ">
      <main className="post">
        <BlogPost {...post} content={content} pagination={pagination} isPreview={post.preview} />
      </main>
    </BaseLayout>
  );
}

export function generateMetadata({ params }: Props): Metadata {
  const data = getPostOrDirBySlug(params.path.join("/"));
  if (!data) {
    return notFound();
  }
  if (data.type === "dir") {
    if (data.dir.length < 0) {
      return notFound();
    }
    return {
      title: `${params.path.join("/")} Posts :: Ridho Azhar`,
      metadataBase: new URL(baseURL),
      robots: { follow: true, index: true },
      openGraph: {
        url: `/posts/${params.path.join("/")}`,
        title: `${params.path.join("/")} Posts :: Ridho Azhar`,
        images: `/img/smug-ico.png`,
        type: "website",
      },
      twitter: {
        card: "summary",
        title: `${params.path.join("/")} Posts :: Ridho Azhar`,
        images: [`/img/smug-ico.png`],
      },
    };
  }

  if (!data.post) {
    return notFound();
  }
  const post = data.post;
  const title = `${post.title} :: Ridho Azhar`;
  return {
    metadataBase: new URL(baseURL),
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
    twitter: {
      card: "summary",
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const slugs = getPostAndDirSlugs();

  return slugs.map((slug) => {
    return {
      path: slug.split("/"),
    };
  });
}
