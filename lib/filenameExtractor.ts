export function extractFilenameFromFirebaseURL(url: string): string {
  // Decode the URL to convert %2F to /
  const decodedURL = decodeURIComponent(url);

  // Find the last occurrence of /
  const lastSlashIndex = decodedURL.lastIndexOf("/");

  // Find the start of the query parameters
  const queryStartIndex = decodedURL.indexOf("?", lastSlashIndex);

  // Extract the filename and remove the last character which is a }
  const filename = decodedURL.substring(lastSlashIndex + 1, queryStartIndex);

  return filename.split(".")[0];
}
