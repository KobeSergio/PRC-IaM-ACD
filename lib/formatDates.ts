export function formatDateToDash(dateObj: Date) {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${day}-${month}`;
}

export function formatDateToYYYYMMDD(date: Date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so +1 and pad with a leading 0 if necessary
  const dd = String(date.getDate()).padStart(2, "0"); // Pad with a leading 0 if necessary

  return `${yyyy}-${mm}-${dd}`;
}
