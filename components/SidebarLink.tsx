import React from "react";

interface ISidebarLinkProp {
  text: string;
  Icon: React.ReactNode;
  active?: boolean;
}

const SidebarLink: React.FC<ISidebarLinkProp> = ({ Icon, active, text }) => {
  return (
    <div
      className={`text-[#d9d9d9] flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation ${
        active && "font-bold"
      }`}
    >
      {Icon}
      <span className="hidden xl:inline">{text}</span>
    </div>
  );
};

export default SidebarLink;
