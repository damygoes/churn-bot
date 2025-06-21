export const userMenuLinks = [
  {
    group: 'upgrade',
    items: [
      {
        label: 'upgrade',
        icon: 'upgrade' as const,
        url: '/upgrade',
      },
    ],
  },
  {
    group: 'account',
    items: [
      {
        label: 'profile',
        icon: 'profile' as const,
        url: '/profile',
      },
      {
        label: 'billing',
        icon: 'billing' as const,
        url: '/billing',
      },
      {
        label: 'notifications',
        icon: 'notifications' as const,
        url: '/notifications',
      },
    ],
  },
]
