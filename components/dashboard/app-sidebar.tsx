import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavUser } from './nav-user';
import { UserCardDataType } from "@/types";
import { Logo } from "@/components/site-logo";
import Link from 'next/link';
// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '#',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
];

interface AppSidebarProps {
  userCardData: UserCardDataType
}

export async function AppSidebar({ userCardData }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className='border-b'>
        <div className="flex pl-2.5 items-center overflow-hidden group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 py-2">
          <Logo className="flex-1" />
        </div>
      </SidebarHeader>
      <SidebarContent>  
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser userCardData={userCardData} />
      </SidebarFooter>
    </Sidebar>
  );
}
