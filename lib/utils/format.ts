const dateFormatter = new Intl.DateTimeFormat("es-MX", {
  day: "2-digit",
  month: "short",
  timeZone: "America/Mexico_City",
});

const timeFormatter = new Intl.DateTimeFormat("es-MX", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "America/Mexico_City",
});

export function formatEventDate(iso: string): string {
  return dateFormatter.format(new Date(iso)).replace(".", "").toUpperCase();
}

export function formatEventTime(iso: string): string {
  return timeFormatter.format(new Date(iso));
}
