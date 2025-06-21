import * as Icons from 'lucide-react'

export const iconMap = {
  account: Icons.BadgeCheck,
  alert: Icons.AlertTriangle,
  'alert-circle': Icons.AlertCircle,
  'badge-check': Icons.BadgeCheck,
  billing: Icons.CreditCard,
  bot: Icons.BotMessageSquare,
  calendar: Icons.Calendar,
  'check-circle': Icons.CheckCircle,
  dashboard: Icons.LayoutDashboard,
  info: Icons.Info,
  integrations: Icons.PlugZap,
  loading: Icons.Loader2,
  metrics: Icons.ChartNoAxesCombined,
  notifications: Icons.Bell,
  profile: Icons.User,
  rocket: Icons.Rocket,
  search: Icons.Search,
  settings: Icons.Settings,
  'sidebar-icon': Icons.SidebarIcon,
  'trending-up': Icons.TrendingUp,
  'trending-down': Icons.TrendingDown,
  upgrade: Icons.Sparkles,
  users: Icons.Users,
} as const

export type IconName = keyof typeof iconMap

// This gives a typed array of keys
export const iconNames = Object.keys(iconMap) as IconName[]
