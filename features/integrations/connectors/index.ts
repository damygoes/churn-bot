import { connectJira } from './jira'
import { connectSlack } from './slack'
import { connectStripe } from './stripe'

export const integrationHandlers: Record<
  string,
  (workspaceId: string, locale: string) => void
> = {
  stripe: connectStripe,
  slack: connectSlack,
  jira: connectJira,
}
