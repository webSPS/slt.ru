export type RenderCalendarProps = {
    currentYear: number;
    currentMonth: number;
    currentDate: Date;
    selectedDate: Date;
    handleDateClick: (date: Date) => void;
}