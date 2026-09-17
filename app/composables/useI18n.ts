import en from '~/locales/en.json'
import nl from '~/locales/nl.json'

type Locale = 'nl' | 'en'
type Translations = typeof en

const currentLocale = ref<Locale>('nl')

export const useI18n = () => {
  const locales: Record<Locale, Translations> = { en, nl }

  const t = (key: string): string | string[] => {
    const keys = key.split('.')
    let value: any = locales[currentLocale.value]
    for (const k of keys) {
      value = value?.[k]
    }
    return value ?? key
  }

  const setLocale = (locale: Locale) => {
    currentLocale.value = locale
  }

  return {
    locale: currentLocale,
    t,
    setLocale,
  }
}
