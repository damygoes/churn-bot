'use client'

import * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/navigation/sidebar/Sidebar'
import Link from 'next/link'
import { MainNav } from '../navigation/MainNav'
import { NavSecondary } from '../navigation/NavSecondary'
import { NavUser } from '../navigation/NavUser'
import { sidebarLinks } from '../navigation/constants'
import { NavbarUser } from '../navigation/types'
import { Icon } from '../ui/icon/Icon'

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: NavbarUser
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <Icon name="bot" size="5xl" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Churn</span>
                  <span className="truncate text-xs uppercase leading-2.5 tracking-widest">
                    Bot
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <MainNav data={sidebarLinks.navMain} />
        <NavSecondary data={sidebarLinks.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  )
}
