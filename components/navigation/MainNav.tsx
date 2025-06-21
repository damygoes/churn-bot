'use client'

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/navigation/sidebar/Sidebar'
import { useActivePage } from '@/hooks/useActivePage'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Icon } from '../ui/icon/Icon'
import { NavItems } from './types'

type MainNavProps = {
  data: NavItems
}

export function MainNav({ data }: MainNavProps) {
  const t = useTranslations('Sidebar')
  const activePage = useActivePage()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        {data.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              variant={activePage === item.name ? 'active' : 'default'}
              size="lg"
            >
              <Link href={item.url}>
                {item.icon ? <Icon name={item.icon} size="3xl" /> : null}
                <span>{t(item.name)}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
