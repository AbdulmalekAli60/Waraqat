/* eslint-disable @next/next/no-sync-scripts */
"use client";
import { UserContextProvider } from "@/context/UserContext";
import "./globals.css";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { FollowProvider } from "@/context/FollowContext";
import { NewArticleContextProvider } from "@/context/NewArticleContext";
import { AlertProvider } from "@/context/AlertContext";

// export const metadata: Metadata = {
//   title: "Read and Write",
//   description: "Read, Write, and More!",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const router = useRouter();

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   if (!token) {
  //     router.push("/signin");
  //   }
  // }, []);

  return (
    <html lang="en">
      <head>
        {/* <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Abdulmalek</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="description" content="" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Abdulmalek's portfolio" />
        <meta property="og:title" content="Abdulmalek" />
        <meta property="og:author" content="Abdulmalek" />
        <meta property="og:url" content="https://abdulmaleka.netlify.app/" />
        <meta property="og:description" content="Read, Write, and More" />

        <meta
          property="og:image"
          content="https://i.postimg.cc/25YP0tZG/metatagimg.png"
        />
        <meta
          property="og:image:secure_url"
          content="https://i.postimg.cc/25YP0tZG/metatagimg.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1465" />
        <meta property="og:image:height" content="766" />

        <meta property="og:locale" content="en" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://abdulmaleka.netlify.app/"
        />
        <meta property="twitter:title" content="Abdulmalek" />
        <meta
          property="twitter:description"
          content="A portfolio page for Abdulmalek, showing projects and contact info"
        />
        <meta
          property="twitter:image"
          content="https://i.postimg.cc/25YP0tZG/metatagimg.png"
        /> */}

        <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        />
      </head>
      <body>
        <UserContextProvider>
          <FollowProvider>
            <NewArticleContextProvider>
              <AlertProvider>{children}</AlertProvider>
            </NewArticleContextProvider>
          </FollowProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
