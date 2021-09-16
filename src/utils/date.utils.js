import { format as dateFormat } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { DEFAULT_DATE_FORMAT } from '@shared/constants'

export const formatDate = ({ date, format = DEFAULT_DATE_FORMAT.longDateTime }) =>
  dateFormat(date, format, {
    locale: enUS,
  })
