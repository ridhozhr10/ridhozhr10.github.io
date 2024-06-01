import { baseURL } from "@/constants";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseURL,
    },
    {
      url: `${baseURL}/about`,
    },
    {
      url: `${baseURL}/cv`,
    },
    {
      url: `${baseURL}/posts`,
    },
  ];
}
