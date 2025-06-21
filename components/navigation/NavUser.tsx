'use client'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/navigation/sidebar/Sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/DropdownMenu'
import LogoutButton from '@/features/auth/logout/LogoutButton'
import { UserAvatar } from '@/features/user/components/UserAvatar'
import { userMenuLinks } from '@/features/user/config'
import { ChevronsUpDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Icon } from '../ui/icon/Icon'
import { NavbarUser } from './types'

interface NavUserProps {
  user: NavbarUser
}

export function NavUser({ user }: NavUserProps) {
  const { isMobile } = useSidebar()
  const t = useTranslations('Sidebar')

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserAvatar
                src={user.avatar ?? ''}
                alt={user.name}
                fallback={user.fallback}
                className="h-8 w-8 rounded-lg"
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserAvatar
                  src={user.avatar}
                  alt={user.name}
                  fallback={user.fallback}
                  className="h-8 w-8 rounded-lg"
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {userMenuLinks.map((group, groupIdx) => (
              <DropdownMenuGroup key={groupIdx}>
                {group.items.map((item) => (
                  <Link href={item.url} key={item.label}>
                    <DropdownMenuItem>
                      {item.icon ? <Icon name={item.icon} size="3xl" /> : null}
                      <span>{t(item.label)}</span>
                    </DropdownMenuItem>
                  </Link>
                ))}
                {groupIdx !== userMenuLinks.length - 1 && (
                  <DropdownMenuSeparator />
                )}
              </DropdownMenuGroup>
            ))}

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogoutButton className="w-full" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

NavUser.displayName = 'NavUser'
