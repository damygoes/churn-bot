export const sidebarLinks = {
  user: {
    name: 'Test User',
    email: 'testuser@example.com',
    avatar:
      'https://images.unsplash.com/photo-1654110455429-cf322b40a906?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHwy',
  },
  navMain: [
    {
      name: 'dashboard',
      url: '/dashboard',
      icon: 'dashboard' as const,
    },
    {
      name: 'metrics',
      url: '/metrics',
      icon: 'metrics' as const,
    },
    {
      name: 'integrations',
      url: '/integrations',
      icon: 'integrations' as const,
    },
    {
      name: 'team',
      url: '/team',
      icon: 'users' as const,
    },
  ],
  navSecondary: [
    {
      name: 'settings',
      url: '/settings',
      icon: 'settings' as const,
    },
  ],
}
