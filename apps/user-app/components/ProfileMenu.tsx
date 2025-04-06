"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut, CircleUser, Settings } from "lucide-react";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProfileMenu = () => {
  const router = useRouter();

  //signout
  async function onSignout() {
    const res = await signOut();
    if (res) {
      router.push("/signin");
    }
  }

  async function onProfile() {
    router.push("/");
  }

  const footerItems = [
    {
      title: "Profile",
      url: "",
      icon: CircleUser,
      onClick: onProfile,
    },
    {
      title: "Settings",
      url: "",
      icon: Settings,
      onClick: onProfile,
    },
    {
      title: "Logout",
      url: "",
      icon: LogOut,
      onClick: onSignout,
    },
  ];

  return (
    <div className="pt-2">
      {footerItems.map((item, index) => (
        <DropdownMenuItem
          onClick={item.onClick}
          key={index}
          className="p-2 focus:outline-none flex items-center gap-2 hover:cursor-pointer hover:bg-gray-200 rounded-md "
        >
          <item.icon className="size-4" /> {item.title}
        </DropdownMenuItem>
      ))}
    </div>
  );
};

export default ProfileMenu;
