import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { ModalProvider } from "~/context/modalStore";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <main className={`${inter.variable} font-sans`}>
        <ModalProvider>
        <Component {...pageProps} />
        </ModalProvider>
      </main>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
