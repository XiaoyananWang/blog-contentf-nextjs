export function formatDate(dateString, options) {
  if (!Date.parse(dateString)) {
    console.error("Invalid date string:", dateString);
    return ""; // or some default value
  }
  const { format } = new Intl.DateTimeFormat('en-US', options);
  return format(new Date(dateString));
}