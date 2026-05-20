"use client";
import { useToggle } from '@zentauri-ui/zentauri-components/hooks/useToggle';
import { ToggleAnimated } from '@zentauri-ui/zentauri-components/ui/toggle/animated'
import React from 'react'

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const [on, toggle] = useToggle(true);

  return (
    <div data-theme={on ? "dark" : "light"}>
      <ToggleAnimated className="fixed top-4 right-4" appearance="gradient-indigo" defaultChecked={on} animation="spring" aria-label="Demo toggle" checked={on} onClick={toggle} />
      {children}
    </div>
  )
}

export default PageWrapper
