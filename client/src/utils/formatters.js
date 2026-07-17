export const formatDate = (date) => {
  if (!date) {
    return 'N/A'
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export const formatNumber = (number) => new Intl.NumberFormat('en-IN').format(number || 0)
