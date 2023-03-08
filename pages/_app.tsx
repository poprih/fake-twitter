import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalProvider } from "@/context";
import { ThemeProvider } from "next-themes";
import Layout from "@/components/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <GlobalProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalProvider>
    </ThemeProvider>
  );
}
