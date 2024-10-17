function Slugify() {
    return String(str)
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '') 
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}