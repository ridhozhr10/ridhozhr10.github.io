import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: [
    {
      path: "../fonts/Inter-Bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  declarations: [
    {
      prop: "font-feature-settings",
      value: '"liga", "tnum", "case", "calt", "zero", "ss01", "locl"',
    },
    {
      prop: "text-rendering",
      value: "optimizeLegibility",
    },
  ],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  description:
    "software developer in general, developing web professionally, like to play and make games, self proclaimed friendly person (trust me), blank coffee enjoyer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <NextTopLoader color="#a9a9b3" />
        {children}
      </body>
    </html>
  );
}
