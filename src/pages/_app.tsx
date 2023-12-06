//src\pages\_app.tsx
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { ModalProvider } from "~/context/modalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FilterProvider } from "~/context/FilterContext";
import { Toaster } from "react-hot-toast";
import { ButtonProvider } from "~/context/buttonContext";
import { GlobalOverlay } from "~/components/globalOverlay";
import { ProfileProvider } from "~/context/profileContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const queryClient = new QueryClient();
const activeModals = ["saveSearchName", "editProfile"];

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <QueryClientProvider client={queryClient}>
        <main className={`${inter.variable} font-sans`}>
          {/* <UserPostInteractionProvider> */}
          <FilterProvider>
            <ModalProvider>
                <GlobalOverlay activeModals={activeModals} />
              <ButtonProvider>
                <ProfileProvider>
                <Toaster position="bottom-center" />

                <Component {...pageProps} />
                </ProfileProvider>
              </ButtonProvider>
            </ModalProvider>
          </FilterProvider>
          {/* </UserPostInteractionProvider> */}
        </main>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
