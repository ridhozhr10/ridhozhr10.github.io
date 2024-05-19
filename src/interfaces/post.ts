export type Post = {
  preview?: boolean;
  path: string[];

  created_at: string;
  updated_at?: string;

  title: string;
  description: string;
  excerpt?: string;
  coverImage?: string;
  ogImage: {
    url: string;
  };

  content: string;
};
