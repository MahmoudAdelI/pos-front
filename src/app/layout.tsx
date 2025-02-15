import type { Metadata } from "next";
import { Toaster } from "sonner";
import getToken from "./auth/getToken";
import Appbar from "./components/Appbar/Appbar";
import Navbar from "./components/Navbar/Navbar";
import "./globals.css";
import QueryClientProvider from "./QueryClientProvider";
import ThemeProvider from "./ThemeProvider";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getToken();
  console.log(token);
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="flex min-h-screen bg-Bg text-PrimaryTextColor">
        <QueryClientProvider>
          <ThemeProvider>
            <Navbar token={token} />
            <main className="mx-auto max-w-[80vw] flex-1 overflow-y-auto">
              <Appbar />
              {children}
            </main>
            <Toaster theme="system" richColors />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
