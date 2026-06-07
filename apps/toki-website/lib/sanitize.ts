import xss from 'xss'

export function sanitizeHtml(html: string): string {
  return xss(html)
}
