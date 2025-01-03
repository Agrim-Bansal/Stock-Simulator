import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
  } from "@/components/ui/sidebar"
import { ChartCandlestick, Home, Search, ScanEye, HandCoins, User } from "lucide-react"


import Link from "next/link"


  export function AppSidebar() {
    return (
      <Sidebar collapsible="icon">
        <SidebarHeader>
            <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuButton asChild>
                    <Link className="text-xl" href="/">
                    <ChartCandlestick size={32} color="white"/>
                    Stock Simulator
                    </Link>
                </SidebarMenuButton>
            </SidebarMenu>
            </SidebarGroup>

        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup> 

            <SidebarMenu>

                <SidebarMenuButton asChild>
                <Link href="/dashboard"><Home/> Portfolio</Link>
                </SidebarMenuButton> 

                <SidebarMenuButton asChild>
                    <Link href="/trade"> <HandCoins/> Trade</Link>
                </SidebarMenuButton>
                
                <SidebarMenuButton asChild>
                    <Link href="/research"> <Search/> Research</Link>
                </SidebarMenuButton>
                
                <SidebarMenuButton asChild>
                    <Link href="/watchlist"> <ScanEye/> Watchlist </Link>
                </SidebarMenuButton>
                
                
            </SidebarMenu>
          </SidebarGroup>
          
        </SidebarContent>


        <SidebarFooter className='flex flex-col items-center justify-between '>
            <SidebarMenuButton asChild>
            <Link href="/account" className="flex items-center w-full text-lg">
            <User/>
            Account
            </Link>
            </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
    )
  }
  