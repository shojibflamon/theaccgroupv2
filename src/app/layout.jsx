import { Inter } from "next/font/google";
import "./globals.css";

import NextAuthProvider from "../components/core/provider/NextAuthProvider";
import NextSnackbarProvider from "../components/core/provider/NextSnackbarProvider";
import TSQProvider from "../components/core//provider/TSQProvider";
import { StyledEngineProvider } from "@mui/material";
import "react-quill/dist/quill.snow.css";
const inter = Inter({ subsets: ["latin"] });
import NextTopLoader from "nextjs-toploader";



export const metadata = {
  title: "The Acc Group",
  description: "The Acc Group",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={inter.className} suppressHydrationWarning={true}>
        <NextAuthProvider>
          <NextTopLoader color="#2F7CE3" showSpinner={false} />
          <StyledEngineProvider injectFirst>
            <NextSnackbarProvider>
              <TSQProvider>{children}</TSQProvider>
            </NextSnackbarProvider>
          </StyledEngineProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
