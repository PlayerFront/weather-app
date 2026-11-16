export function formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000)
    const day = date.getDate().toString().padStart(2, '0')
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return `${day} ${month} ${year}`
}

export function formatTime(timestamp: number): string {
    const date = new Date(timestamp * 1000)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
}

export function formatCountry(code: string | undefined): string {
    if (!code) return ''
    try {
        const regionNames = new Intl.DisplayNames(['en'], { type: 'region'})
        return regionNames.of(code.toUpperCase()) ?? code
    } catch {
        return code
    }
}