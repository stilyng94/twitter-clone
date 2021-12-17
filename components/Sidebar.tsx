import React from "react";
import NextImage from "next/image";
import SidebarLink from "./SidebarLink";
import {
  HomeIcon,
  BookmarkIcon,
  ViewListIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
  BellIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { signOut } from "next-auth/react";

const Sidebar: React.FC = () => {
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
        <NextImage
          src={"https://rb.gy/ogau5a"}
          alt="Twitter"
          width={30}
          height={30}
        />
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        <SidebarLink text="Home" Icon={<HomeIcon className="h-7" />} active />
        <SidebarLink text="Explore" Icon={<HashtagIcon className="h-7" />} />
        <SidebarLink text="Notifications" Icon={<BellIcon className="h-7" />} />
        <SidebarLink text="Messages" Icon={<InboxIcon className="h-7" />} />
        <SidebarLink text="Bookmarks" Icon={<BookmarkIcon className="h-7" />} />
        <SidebarLink text="Lists" Icon={<ViewListIcon className="h-7" />} />
        <SidebarLink text="Profile" Icon={<UserIcon className="h-7" />} />
        <SidebarLink
          text="More"
          Icon={<DotsHorizontalIcon className="h-7" />}
        />
      </div>

      <button className="font-bold text-white rounded-full w-56 h-[52px] hidden xl:block ml-auto bg-[#1d9bf0] text-lg shadow-sm hover:bg-[#1a8cd8]">
        Tweet
      </button>
      <div
        className="text-[#d9d9d9] flex items-center justify-center hoverAnimation xl:ml-auto xl:mr- 5 mt-auto"
        onClick={() => signOut({ redirect: true })}
      >
        <img
          src={"https://rb.gy/ogau5a"}
          alt="Twitter"
          className="h-10 w-10 rounded-full xl:mr-2.5"
        />
        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold">@pablo</h4>
          <p className="text-[#6e767d]">@pablo</p>
        </div>
        <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
      </div>
    </div>
  );
};

export default Sidebar;
