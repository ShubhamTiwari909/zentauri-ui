import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { SidebarNavProps } from "./types";

export function SidebarNav({ onLinkClick, sidebarRouteData }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className="w-full">
      {sidebarRouteData.map((group, index) => (
        <div key={index} className="pb-8">
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold tracking-tight text-white">
            {group.title}
          </h4>
          {group.items?.length ? (
            <div className="grid grid-flow-row auto-rows-max text-sm">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.disabled ? "#" : item.href}
                    className={cn(
                      "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:text-white",
                      isActive ? "font-medium text-cyan-400" : "text-slate-400",
                      item.disabled && "cursor-not-allowed opacity-60",
                    )}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    onClick={
                      item.disabled ? (e) => e.preventDefault() : onLinkClick
                    }
                    aria-disabled={item.disabled}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
