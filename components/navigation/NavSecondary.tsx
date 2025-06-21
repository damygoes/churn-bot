import * as React from 'react'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/navigation/sidebar/Sidebar'
import { useActivePage } from '@/hooks/useActivePage'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Icon } from '../ui/icon/Icon'
import { NavItems } from './types'

type NavSecondaryProps = {
  data: NavItems
}

export function NavSecondary({
  data,
  ...props
}: NavSecondaryProps & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const t = useTranslations('Sidebar')
  const activePage = useActivePage()

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
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
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
