import type { Metadata } from "next";
import "@/app/globals.css";
import '@/lib/auth';
import { Quicksand } from "next/font/google";

const quickSand = Quicksand({
  weight: ['300', '400', '500', '600', '700'],
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stock Simulator",
  description: "A platform to learn about, and try the stock market - risk free.",
};

export default  function RootLayout({children,}: Readonly<{children: React.ReactNode;}>){

  return (
    <html lang="en">
      <body className={`${quickSand.className} antialiased dark`}>
        {children}
      </body>
    </html>
  );
}
