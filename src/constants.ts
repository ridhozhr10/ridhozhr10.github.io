import { Metadata } from "next";

export const baseURL = "https://ridhozhr10.github.io";
export const repoURL = "ridhozhr10/ridhozhr10.github.io";

const title = "Ridho Azhar";
const description = `software developer in general,
developing web professionally,
like to play and make games,
self proclaimed friendly person (trust me),
black coffee enjoyer`;
export const baseMetadata = (path: string, titlePrefix?: string): Metadata => {
  return {
    metadataBase: new URL(`${baseURL}${path ? "/" : ""}${path}`),
    title: `${titlePrefix || ""}${titlePrefix ? " :: " : ""}${title}`,
    description,
    openGraph: {
      title: `${titlePrefix || ""}${titlePrefix ? " :: " : ""}${title}`,
      url: `${baseURL}${path ? "/" : ""}${path}`,
      description: description,
      images: ["/img/smug-ico.png"],
      type: "website",
    },
  };
};
