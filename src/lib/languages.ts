export function languagesDisplay(key: string) {

    return {
        label: key?.toUpperCase(),
        imageUrl: `/assets/images/countries/${key}.png`
    }
}