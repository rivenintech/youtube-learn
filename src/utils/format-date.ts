export function formatDate(dateString: string): string {
  const parsedDate = new Date(dateString);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("default", {
    dateStyle: "short",
  }).format(parsedDate);
}
