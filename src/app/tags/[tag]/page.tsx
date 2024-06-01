import { getAllTags, getPostGroupByYear } from "@/lib/api";
import BaseLayout from "@/app/_components/layout/BaseLayout";
import Link from "next/link";
import dayjs from "dayjs";
import "@/app/posts/style.scss";
import { Metadata } from "next";
import { BiTagAlt } from "react-icons/bi";
import { baseURL } from "@/constants";

type Props = {
  params: {
    tag: string;
  };
};

export default function Tag({ params }: Props) {
  var postGroups = getPostGroupByYear(params.tag);

  return (
    <BaseLayout logoText={`ls $POSTS_DIR | grep ${params.tag}`}>
      <main className="post">
        <h1 className="text-5xl font-bold my-6">#{params.tag}</h1>
        {postGroups.map((postGroup) => (
          <div key={postGroup.year} className="posts-group">
            <div className="post-year">{postGroup.year}</div>
            <ul className="posts-list">
              {postGroup.data.map((post) => (
                <li key={post.slug} className="post-item">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="post-item-inner"
                  >
                    <span className="post-title">{post.title}</span>
                    <span className="post-day">
                      {dayjs(post.date).format("MMM DD")}
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
        ))}
      </main>
    </BaseLayout>
  );
}
export function generateMetadata({ params }: Props): Metadata {
  const title = `#${params.tag} :: Ridho Azhar`;

  return {
    metadataBase: new URL(baseURL),
    title,
    robots: { follow: true, index: true },
    openGraph: {
      title,
      url: `/tags/${params.tag}`,
      images: [`/img/smug-ico.png`],
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      images: [`/img/smug-ico.png`],
    },
  };
}
export function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag,
  }));
}
