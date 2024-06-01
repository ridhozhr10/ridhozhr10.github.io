import { getPostGroupByYear } from "@/lib/api";
import BaseLayout from "../_components/layout/BaseLayout";
import Link from "next/link";
import dayjs from "dayjs";
import "./style.scss";
import { baseMetadata } from "@/constants";
import { BiTagAlt } from "react-icons/bi";

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
