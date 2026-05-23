"use client";
import { useToggle } from '@zentauri-ui/zentauri-components/hooks/useToggle';
import { ToggleAnimated } from '@zentauri-ui/zentauri-components/ui/toggle/animated'
import React from 'react'
import { usePathname, } from 'next/navigation';

const routesToSkip = ["/", "/preview/components", "/preview/hooks","/preview/typography","/preview/charts"]

const PageWrapper = ({ children, theme = "dark" }: { children: React.ReactNode, theme?: "light" | "dark" }) => {
  const [on, toggle] = useToggle(theme === "dark");
  const pathname = usePathname();

  return (
    <body data-theme={on ? "dark" : "light"} className='flex min-h-dvh flex-col bg-slate-950 text-slate-50'>
      {
        !routesToSkip.includes(pathname) && (
          <ToggleAnimated className="fixed top-20 lg:top-7 right-2 lg:right-4 z-100" appearance="gradient-yellow" animation="spring" aria-label="Demo toggle" checked={on} onClick={toggle} />
        )
      }
      {children}
    </body>
  )
}

export default PageWrapper
