import type { Metadata } from "next";
import "@/app/globals.css";
import '@/lib/auth';


export const metadata: Metadata = {
  title: "Stock Simulator",
  description: "A platform to learn about, and try the stock market - risk free.",
};

export default  function RootLayout({children,}: Readonly<{children: React.ReactNode;}>){

  return (
    <html lang="en">
      <body className={`antialiased dark`}>
        {children}
      </body>
    </html>
  );
}
