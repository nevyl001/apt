const dayFormatter = new Intl.DateTimeFormat("es-MX", {
  day: "2-digit",
  timeZone: "America/Mexico_City",
});

const monthFormatter = new Intl.DateTimeFormat("es-MX", {
  month: "short",
  timeZone: "America/Mexico_City",
});

export function formatEventDayMonth(iso: string): { day: string; month: string } {
  const date = new Date(iso);
  return {
    day: dayFormatter.format(date),
    month: monthFormatter.format(date).replace(".", "").toUpperCase(),
  };
}
