export const checkWeek = (selectedDate: Date, currentDate: Date) => {
    return selectedDate <= currentDate || [0, 6].includes(selectedDate.getDay())
        || selectedDate > new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 9);
};