export default function convertToReadableDate(isoDate: string){
    const date = new Date(isoDate);
    return date.toLocaleString();
}