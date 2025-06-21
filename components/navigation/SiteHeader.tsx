'use client'

import { useSidebar } from '@/components/navigation/sidebar/Sidebar'
import { Button } from '@/components/ui/button/Button'
import { Separator } from '@/components/ui/separator/Separator'
import { LanguageSwitcher } from '../language-switcher/LanguageSwitcher'
import { Icon } from '../ui/icon/Icon'
import { SearchForm } from './SearchForm'
import { SiteHeaderBreadcrumb } from './SiteHeaderBreadcrumb'

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Icon name="sidebar-icon" />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <SiteHeaderBreadcrumb />
        <SearchForm className="w-full sm:ml-auto sm:w-auto" />
        <LanguageSwitcher />
      </div>
    </header>
  )
}
