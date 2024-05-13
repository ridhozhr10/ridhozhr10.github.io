import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
 

const inter = Inter({ 
  subsets: ['latin'],
  weight:['400', '500', '600', '700'] 
})

export const metadata: Metadata = {
  description: "software developer, developing web professionally, like to play and make games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          {children}
      </body>
    </html>
  );
}
