import * as Icons from "lucide-react";

export const iconMap = {
  alert: Icons.AlertTriangle,
  'alert-circle': Icons.AlertCircle,
  'badge-check': Icons.BadgeCheck,
  calendar: Icons.Calendar,
  'check-circle': Icons.CheckCircle,
  info: Icons.Info,
  loading: Icons.Loader2,
  notifications: Icons.Bell,
  rocket: Icons.Rocket,
  search: Icons.Search,
  'trending-up': Icons.TrendingUp,
  'trending-down': Icons.TrendingDown,
} as const;


export type IconName = keyof typeof iconMap;

// This gives a typed array of keys
export const iconNames = Object.keys(iconMap) as IconName[];