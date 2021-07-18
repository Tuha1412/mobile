
export const handleCreateDate = (createDate) => {
    const string = createDate.toString();
    const s = string.slice(0, 16);
    return s.replace('T', ' ');
}