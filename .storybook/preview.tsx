import type { Decorator } from '@storybook/nextjs'
import type { Preview } from '@storybook/nextjs-vite'
import '../app/styles/globals.css'
import { AppRouterProvider } from './mocks/AppRouterProvider'

const withAppRouterProvider: Decorator = (Story) => (
  <AppRouterProvider>
    <Story />
  </AppRouterProvider>
)

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [withAppRouterProvider],
}

export default preview
