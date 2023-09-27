export type DateCalendarReg = {
    id: number;
    fio: string;
    car_number: string;
    category: string;
    date: string;
    time_create: string;
    id_time: number;
    model_auto: string;
    phone: string;
}
export type DateCalendarTime = {
    id: number;
    description: string;
}
export type DateCalendarObj = {
    result: number;
    desc: string;
    times?: DateCalendarTime[];
    registrations?: DateCalendarReg[];
}
