import getReadingTime from "reading-time";

// counts the raw Markdown body, so syntax like link URLs inflates it slightly
export const readingTime = (body = "") => getReadingTime(body).text;
