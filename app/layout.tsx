import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { cookies } from "next/headers";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AppProvider } from "@/context/appContext";
//css
import "./style/base.css";
import "./style/globals.css";
import "./style/style.scss";
import "./style/antd.scss";

export const metadata: Metadata = {
  title: "Priceboard",
  description: "Priceboard pinetree",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value === "dark" ? "dark" : "";
  return (
    <html lang="en" className={`h-full ${theme}`}>
      <body className="antialiased h-full flex flex-col bg-default">
        <AntdRegistry>
          <AppProvider initialTheme={theme as "light" | "dark"}>
            <Header />
            <div className="flex-1 overflow-auto">
              <div className="content">{children}</div>
              <Footer />
            </div>
          </AppProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
