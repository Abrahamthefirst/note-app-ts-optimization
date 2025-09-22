import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';
const DirectoryTree = ({ directory }: { directory: DirectoryApiResponse }) => {
  const items = [
    {
      title: 'Home',
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
  return (
    <Collapsible className="group/collapsible">
      <SidebarGroup className="rounded-md border">
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="text-2xl">
            {directory ? directory.name : "loading"}
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>

        <CollapsibleContent>
          <SidebarMenuSub>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};

export default DirectoryTree;
