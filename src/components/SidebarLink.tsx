"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const SidebarLink = ({
  href,
  children,
}: PropsWithChildren<{ href: string }>) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          "flex items-center gap-2 my-2 px-2 py-2 rounded text-sm font-normal hover:bg-gray-800 focus-input",
          isActive && "bg-gray-800"
        )}
      >
        {children}
      </Link>
    </li>
  );
};

export default SidebarLink;
