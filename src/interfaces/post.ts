export type Post = {
  preview: boolean;
  path: string[];

  created_at: string;
  updated_at?: string;
  tags: string[];

  title: string;
  description: string;
  excerpt?: string;
  coverImage?: {
    src: string;
    alt?: string;
    caption?: {
      label: string;
      url?: string;
    };
  };
  ogImage: {
    url: string;
  };

  content: string;
};
