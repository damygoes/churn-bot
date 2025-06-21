export const useRouter = () => ({
  push: (url: string) => console.log('router.push:', url),
  replace: (url: string) => console.log('router.replace:', url),
  refresh: () => {},
  back: () => {},
  forward: () => {},
  prefetch: async () => {},
})

export const usePathname = () => '/en/dashboard'

export const useSearchParams = () => new URLSearchParams()
