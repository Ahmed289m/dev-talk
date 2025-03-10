import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar";

import ReduxProvider from "./_components/redux-provider";
import QueryProvider from "./_components/query-provider";
import PageWrapper from "./_components/page-wrapper";
import { PostProvider } from "./_contexts/postContext";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "DevTalk",
  description: "Software Developers Hub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <PostProvider>
          <ReduxProvider>
            <Navbar />
            <QueryProvider>
              <PageWrapper>{children}</PageWrapper>
            </QueryProvider>
          </ReduxProvider>
        </PostProvider>
      </body>
    </html>
  );
}
