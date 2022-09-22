export function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  })
}
