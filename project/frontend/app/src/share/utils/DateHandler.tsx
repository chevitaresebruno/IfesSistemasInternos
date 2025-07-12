export function backendDateFormat(date: Date): string
{
    return date.toLocaleDateString().split("/").reverse().join("-");
}

