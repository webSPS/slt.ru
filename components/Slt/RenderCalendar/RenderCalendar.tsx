import classes from "./RenderCalendar.module.css";
import clsx from "clsx";
import {FC} from "react";
import {RenderCalendarProps} from "@/components/Slt/RenderCalendar/RenderCalendar.props";
import {checkWeek} from "@/helpers/checkWeek";


const RenderCalendar: FC<RenderCalendarProps> = (props) => {
    const {
        currentYear,
        currentMonth,
        currentDate,
        selectedDate,
        handleDateClick
    } = props;
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startDay = new Date(currentYear, currentMonth, 1).getDay() || 7;
    const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const calendarDays = [];

    // Добавляем ячейки для дней недели
    for (let i = 0; i < 7; i++) {
        calendarDays.push(
            <div key={weekdays[i] + "day"} className={classes.weekday}>
                {weekdays[i]}
            </div>
        );
    }
    // Добавляем пустые ячейки для начала месяца
    for (let i = 1; i < startDay; i++) {
        calendarDays.push(<div key={i + "null"} />);
    }
    // Добавляем ячейки для дней месяца
    for (let day = 1; day <= daysInMonth; day++) {
        const isSelected = selectedDate && selectedDate.getDate() === day
            && selectedDate.getMonth() == currentMonth
            && selectedDate.getFullYear() == currentYear;
        const calendarDayClass = clsx(classes.calendarDay,
            isSelected && classes.selected,
            checkWeek(new Date(currentYear, currentMonth, day), currentDate) && classes.allowed);
        // if()
        calendarDays.push(
            <div key={day} className={calendarDayClass}
                 onClick={() => handleDateClick(new Date(currentYear, currentMonth, day))}>
                {day}
            </div>
        );
    }
    return <>
        {calendarDays}
    </>;
};

export default RenderCalendar;