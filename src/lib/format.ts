export const toLocalDate = (value?: string | null) =>
    value
        ? new Date(value).toLocaleDateString('de-DE', {
              timeZone: 'Europe/Berlin',
          })
        : ''
