export const formatLocaleDate = (
    value: string | Date,
    locale: string,
    options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
  ): string => {
    if (!value) return ''
  
    const date = typeof value === 'string' ? new Date(value) : value
    if (Number.isNaN(date.getTime())) return ''
  
    return new Intl.DateTimeFormat(locale, options).format(date)
  }