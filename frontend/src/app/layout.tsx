/* eslint-disable @next/next/no-sync-scripts */
import "./globals.css";
import { Metadata } from "next";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: "Waraqat | Read and Write Articles",
  description: "Discover, read, and write insightful articles on technology, development, and more. A community for knowledge sharing and thoughtful writing.",
  authors: {
    name: "Abdulmalek",
    url: "https://x.com/IAbdulmalekA",
  },
  icons: {
    icon: "icon.ico",
  },
  openGraph: {
    type: "website",
    siteName: "Waraqat",
    title: "Waraqat | A Platform for Readers and Writers",
    description: "Discover thought-provoking articles, share your knowledge, and connect with a community of curious minds.",
    images: [
      {
        url: "https://waraqat-images-bucket.s3.me-south-1.amazonaws.com/Waraqat+Header.png",
        width: 1465,
        height: 766,
        type: "image/png",
      },
    ],
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waraqat | A Platform for Readers and Writers",
    description: "Discover thought-provoking articles, share your knowledge, and connect with a community of curious minds.",
    images: ["https://waraqat-images-bucket.s3.me-south-1.amazonaws.com/Waraqat+Header.png"],
  },
  keywords: ['blog', 'articles', 'writing', 'reading', 'knowledge sharing', 'technology', 'development', 'waraqat'],
  creator: 'Abdulmalek',
  publisher: 'Waraqat',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="icon.ico" type="image/x-icon" />
        
        {/* LinkedIn specific meta tags */}
        <meta property="linkedin:card" content="summary_large_image" />
        <meta property="linkedin:title" content="Waraqat | A Platform for Readers and Writers" />
        <meta property="linkedin:description" content="Discover thought-provoking articles, share your knowledge, and connect with a community of curious minds." />
        <meta property="linkedin:image" content="https://waraqat-images-bucket.s3.me-south-1.amazonaws.com/Waraqat+Header.png" />
        <meta property="linkedin:author" content="Abdulmalek" />
        
        <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}