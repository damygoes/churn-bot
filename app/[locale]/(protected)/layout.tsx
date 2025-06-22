import { getCurrentUser } from '@/actions/users.actions'
import { AppSidebar } from '@/components/layout/AppSidebar'
import {
  SidebarInset,
  SidebarProvider,
} from '@/components/navigation/sidebar/Sidebar'
import { SiteHeader } from '@/components/navigation/SiteHeader'
import { getAppUserData } from '@/features/user/utils'
import { redirect } from 'next/navigation'

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  const appUser = getAppUserData(user)

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar user={appUser} />
          <SidebarInset>{children}</SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
