export const readableDate = (isoString: string | Date): string => {
    const itemDate = new Date(isoString);
    return itemDate.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

