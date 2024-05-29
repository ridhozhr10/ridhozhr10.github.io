import { getPostGroupByYear } from "@/lib/api";
import BaseLayout from "../_components/layout/BaseLayout";
import Link from "next/link";
import dayjs from "dayjs";
import "./style.scss";
import { baseMetadata } from "@/constants";

export const metadata = baseMetadata("posts", "Posts");

export default function Posts() {
  var postGroups = getPostGroupByYear();

  return (
    <BaseLayout logoText="ls -h $POSTS_DIR">
      <main className="post">
        <h1 className="text-5xl font-bold my-6">Posts</h1>
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
