/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import "./markdown.css";
import "./style.scss";
import "highlight.js/styles/monokai.css";
import {
  BiArrowBack,
  BiCalendar,
  BiFolder,
  BiLogoFacebookSquare,
  BiLogoLinkedinSquare,
  BiLogoTwitter,
  BiShare,
  BiTagAlt,
  BiX,
} from "react-icons/bi";
import {
  generateFacebookShare,
  generateLinkedInShare,
  generateTwitterShare,
} from "@/lib/share";
import { Post } from "@/interfaces/post";
import { useRef, useState } from "react";
import { SinglePagination } from "@/lib/api";
import Comment from "./Comment";
import dayjs from "dayjs";

export type BlogPostProps = Post & {
  content: string;
  pagination: SinglePagination;
};

export default function BlogPost({
  content,
  pagination,
  ...post
}: BlogPostProps) {
  const shareLinks = [
    {
      href: generateLinkedInShare({ content, ...post }),
      title: "share on linkedin",
      icon: <BiLogoLinkedinSquare />,
    },
    {
      href: generateTwitterShare({ content, ...post }),
      title: "share on twitter",
      icon: <BiLogoTwitter />,
    },
    {
      href: generateFacebookShare({ content, ...post }),
      title: "share on facebook",
      icon: <BiLogoFacebookSquare />,
    },
  ];

  const [shareOpen, setShareOpen] = useState(false);

  const commentWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <article className="relative">
        <div className="absolute right-[-4rem] -top-16 max-lg:right-0 h-full">
          <ul className="flex flex-col gap-3 text-3xl sticky top-10 bottom-0 p-2 bg-header-bg-dark rounded-md">
            <li className="lg:hidden">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setShareOpen((d) => !d);
                }}
                title="share"
              >
                {shareOpen ? <BiX /> : <BiShare />}
              </a>
            </li>
            {shareLinks.map((d, i) => (
              <li
                key={`share_i_${i}`}
                className={!shareOpen ? "max-lg:hidden" : ""}
              >
                <a href={d.href} title={d.title} target="_blank" rel="noopener">
                  {d.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <h1 className="text-4xl mb-5 mt-12 font-bold">
          <Link href="" className="no-underline">
            {post.title}
          </Link>
        </h1>
        {post.excerpt && <div className="post-excerpt">{post.excerpt}</div>}
        {post.coverImage && (
          <figure className="post-cover">
            <img src={post.coverImage.src} alt={post.coverImage.alt || ""} />
            {post.coverImage.caption && (
              <figcaption>
                <a href={post.coverImage.caption.url || "#"}>
                  {post.coverImage.caption.label}
                </a>
              </figcaption>
            )}
          </figure>
        )}
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
      <div className="post-info">
        {post.tags.length > 0 && (
          <p>
            <BiTagAlt className="feather" />
            {post.tags.map((tag) => (
              <span className="tag" key={tag}>
                <Link href={`/tags/${tag}`}>{tag}</Link>
              </span>
            ))}
          </p>
        )}
        <p>
          <BiFolder className="feather" />
          <span>
            {post.path.map((p, i) => {
              const slug = post.path.filter((_, is) => is <= i).join("/");
              return (
                <>
                  <Link href={`/posts/${slug}`}>{p}</Link>
                  {i < post.path.length - 1 ? "/" : ""}
                </>
              );
            })}
          </span>
        </p>
        <p>
          <BiCalendar className="feather" />
          <span>{dayjs(post.created_at).format("YYYY-MM-DD HH:mm")}</span>
          {dayjs(post.updated_at).isValid() && (
            <span>
              (Updated: {dayjs(post.updated_at).format("YYYY-MM-DD HH:mm")})
            </span>
          )}
        </p>
      </div>
      <div id="pagination" className="flex gap-3 items-center justify-center">
        {pagination.prev && (
          <div className="bg-header-bg-dark bg-opacity-80 max-w-[40%] rounded-md hover:underline">
            <Link
              href={`/posts/${pagination.prev.path.join("/")}`}
              className="flex px-[16px] py-[8px] no-underline text-ellipsis text-nowrap overflow-hidden justify-center items-center"
            >
              <BiArrowBack className="mr-2 text-xl" />

              <span className="text-ellipsis overflow-hidden text-nowrap">
                {pagination.prev.title}
              </span>
            </Link>
          </div>
        )}
        {pagination.next && (
          <div className="bg-header-bg-dark bg-opacity-80 max-w-[40%] rounded-md hover:underline">
            <Link
              href={`/posts/${pagination.next.path.join("/")}`}
              className="flex px-[16px] py-[8px] no-underline text-ellipsis text-nowrap overflow-hidden justify-center items-center"
            >
              <span className="text-ellipsis overflow-hidden text-nowrap">
                {pagination.next.title}
              </span>
              <BiArrowBack className="ml-2 text-xl rotate-180" />
            </Link>
          </div>
        )}
      </div>
      <div ref={commentWrapperRef}>
        <Comment parentRef={commentWrapperRef} />
      </div>
    </>
  );
}
