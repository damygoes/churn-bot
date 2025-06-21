export const useRouter = () => ({
  push: () => {},
  replace: () => {},
  forward: () => {},
  back: () => {},
  refresh: () => {},
  prefetch: async () => {},
})

export const usePathname = () => '/en'
export const useSearchParams = () => new URLSearchParams()
