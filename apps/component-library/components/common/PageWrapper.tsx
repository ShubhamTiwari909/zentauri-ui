"use client";
import { useToggle } from '@zentauri-ui/zentauri-components/hooks/useToggle';
import { ToggleAnimated } from '@zentauri-ui/zentauri-components/ui/toggle/animated'
import React from 'react'

const PageWrapper = ({ children, theme = "dark" }: { children: React.ReactNode, theme?: "light" | "dark" }) => {
  const [on, toggle] = useToggle(theme === "dark");

  return (
    <div data-theme={on ? "dark" : "light"}>
      <ToggleAnimated className="fixed top-20 right-2 lg:top-4 lg:right-4 z-40" appearance="gradient-indigo" defaultChecked={on} animation="spring" aria-label="Demo toggle" checked={on} onClick={toggle} />
      {children}
    </div>
  )
}

export default PageWrapper
