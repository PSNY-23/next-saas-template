import { CalendarIcon, HomeIcon, InboxIcon, BadgeDollarSignIcon, SearchIcon, SettingsIcon, UserIcon, UserRoundCheckIcon, UserCheckIcon } from 'lucide-react';

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
import { NavUser } from '@/components/dashboard/nav-user';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { UserCardDataType } from '@/types';
import { Logo } from "@/components/site-logo";

// Menu items.
const items = [
  {
    title: 'Search',
    url: '#',
    icon: SearchIcon,
  },
  {
    title: 'Dashboard',
    url: '/admin/dashboard',
    icon: HomeIcon,
  },
  {
    title: 'User',
    url: '/admin/users',
    icon: UserIcon
  },
  {
    title: 'Subscribers',
    url: '/admin/subscribers',
    icon: UserCheckIcon,
    className: 'text-green-500'

  },
  {
    title: 'Transactions',
    url: '/admin/transactions',
    icon: BadgeDollarSignIcon,
  },
  
  {
    title: 'Settings',
    url: '/admin/settings',
    icon: SettingsIcon,
  },
];

// User data
const userData = {
  name: 'shadcn',
  email: 'm@example.com',
  avatar: '/avatars/shadcn.jpg',
};

interface AdminSidebarProps {
  userCardData: UserCardDataType;
}

export function AdminSidebar({ userCardData }: AdminSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-border">
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
                      <item.icon className={cn('', item?.className)} />
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
