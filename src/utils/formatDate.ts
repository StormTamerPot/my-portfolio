const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function formatDate(date: Date): string {
  return dateFormatter.format(date);
}
