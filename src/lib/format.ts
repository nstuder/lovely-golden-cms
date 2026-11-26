export const toLocalDate = (value?: string | null) =>
    value
        ? new Date(value).toLocaleDateString('de-DE', {
              timeZone: 'Europe/Berlin',
          })
        : ''

/** `</script>` or `<!--` in JSON-LD would end the script tag early; `\u003c` is the same JSON. */
export const escapeJsonForScript = (json: string) =>
    json.replace(/</g, '\\u003c')
