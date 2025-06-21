import { Label } from '@/components/ui/label/Label'
import { useTranslations } from 'next-intl'
import { Input } from '../ui/input/Input'

export function SearchForm({ ...props }: React.ComponentProps<'form'>) {
  const t = useTranslations('Searchbar')
  return (
    <form {...props}>
      <div className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input id="search" placeholder={t('searchPlaceholder')} icon="search" />
      </div>
    </form>
  )
}
