import {
  Computer,
  Route,
  Coins,
  SendToBack,
  Contact,
  ChevronsUpDown,
} from "lucide-react";

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
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ProfileMenu from "./ProfileMenu";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Computer,
  },
  {
    title: "Wallet",
    url: "/wallet",
    icon: Coins,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: SendToBack,
  },
  {
    title: "Peer to Peer",
    url: "/peertopeer",
    icon: Route,
  },
];

export function AppSidebar({ session }: { session: any }) {
  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <div>OpenWise</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-gray-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Contact size={27} />
                  <div className="text-xs fex flex-col gap-1">
                    <p>{session.user.name}</p>
                    <p>{session.user.email}</p>
                  </div>
                </div>
                <DropdownMenuTrigger>
                  <ChevronsUpDown
                    className="hover:cursor-pointer focus:outline-none"
                    size={17}
                  />
                </DropdownMenuTrigger>
              </div>
              <DropdownMenuContent
                side="right"
                className=" bg-white rounded-lg flex flex-col md:m-2 md:mx-3  text-sm p-2 w-48"
              >
                <DropdownMenuLabel className="px-2 flex items-center  gap-1 py-2">
                  <p className="rounded-full p-[2px] px-[6px] border-2 text-xs">
                    {session.user.name.slice(0, 1).toUpperCase()}
                  </p>
                  {session.user.name.toUpperCase()}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="border-gray-200 border-[0.7px] border-solid" />
                <ProfileMenu />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
