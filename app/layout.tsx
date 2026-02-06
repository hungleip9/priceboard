import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
//css
import "./globals.css";
import "./style.scss";

export const metadata: Metadata = {
  title: "Priceboard",
  description: "Priceboard pinetree",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="antialiased h-full flex flex-col">
        <Header />
        <div className="flex-1 overflow-auto content border border-red-700">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
