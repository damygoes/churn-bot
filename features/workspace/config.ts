export const workspaceTemplates = [
  { slug: 'finance', name: 'Finance' },
  { slug: 'sales', name: 'Sales' },
  { slug: 'development', name: 'Development' },
] as const

export const integrations = [
  { slug: 'stripe', name: 'Stripe' },
  { slug: 'paypal', name: 'PayPal' },
  { slug: 'hubspot', name: 'Hubspot' },
  { slug: 'pipedrive', name: 'Pipedrive' },
  { slug: 'github', name: 'GitHub' },
  { slug: 'jira', name: 'Jira' },
] as const

export const templateIntegrationMapping = {
  finance: ['stripe', 'paypal'],
  sales: ['hubspot', 'pipedrive'],
  development: ['github', 'jira'],
} as const
