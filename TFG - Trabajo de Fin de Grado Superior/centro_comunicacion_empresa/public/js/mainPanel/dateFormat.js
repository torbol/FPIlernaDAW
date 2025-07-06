export function formatLocalDate(createdAtTimeStamp) {
    // With this small function we will format the date from "created_at": "2025-03-23T12:16:25.000000Z" to "XX/X/XXXX, XX:XX:XX".
    const date = new Date(createdAtTimeStamp);
    const navigatorLocale = Intl.DateTimeFormat().resolvedOptions().locale; // Retrieves the locale set in the web browser to format the date correctly.

    return date.toLocaleString(navigatorLocale);
}