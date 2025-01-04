import type { Metadata } from "next";
import "@/app/globals.css";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { cookies } from "next/headers"


export const metadata: Metadata = {
  title: "Stock Simulator",
  description: "A platform to learn about, and try the stock market - risk free.",
};

export default async function RootLayout({children,}: Readonly<{children: React.ReactNode;}>){

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"


  return (
      
    <SidebarProvider defaultOpen={defaultOpen} >

        <AppSidebar />

        <SidebarInset >  
        

        <SidebarTrigger className="fixed z-10"/>
        
        <div className="header text-center fixed border-b-2 border-gray-200 bg-black space-y-2">
          <h1 className="text-4xl">StockMarket Simulator</h1>
          <p className="text-gray-500">A platform to try and experience the stock market - risk free.</p>
        </div>
        
        {children}
        
        </SidebarInset>
    </SidebarProvider>
  
  );
}
