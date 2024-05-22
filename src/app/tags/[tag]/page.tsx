import { getAllTags, getPostGroupByYear } from "@/lib/api";
import BaseLayout from "@/app/_components/layout/BaseLayout";
import Link from "next/link";
import dayjs from "dayjs";
import "@/app/posts/style.scss";
import { Metadata } from "next";

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
        <h1 className="text-5xl font-bold my-6">{params.tag}</h1>
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
    title,
    robots: { follow: true, index: true },
  };
}
export function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag,
  }));
}
