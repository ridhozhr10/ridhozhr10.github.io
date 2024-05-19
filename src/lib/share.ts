import { baseURL } from "@/constants";
import { Post } from "@/interfaces/post";

export function generateLinkedInShare(post: Post): string {
  const url = `${baseURL}/posts/${post.path.join("/")}`;
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURI(
    url
  )}`;
}

export function generateTwitterShare(post: Post): string {
  const url = `${baseURL}/posts/${post.path.join("/")}`;
  return `https://twitter.com/intent/tweet/?url=${encodeURI(url)}`;
}

export function generateFacebookShare(post: Post): string {
  const url = `${baseURL}/posts/${post.path.join("/")}`;
  return `https://facebook.com/sharer/sharer.php?u=${encodeURI(url)}`;
}
