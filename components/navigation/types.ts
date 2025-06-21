import { IconName } from '../ui/icon/iconMapping'

export type NavItem = {
  name: string
  url: string
  icon: IconName
  children?: NavItem[]
}

export type NavItems = NavItem[]
