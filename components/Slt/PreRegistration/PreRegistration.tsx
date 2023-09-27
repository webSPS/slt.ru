import React, {useEffect, useRef, useState} from 'react';
import classes from './PreRegistration.module.css';
import axios, {AxiosResponse} from 'axios';
import clsx from "clsx";
import {DateCalendarObj, DateCalendarReg} from './PreRegistration.props';
import {checkWeek} from "@/helpers/checkWeek";
import RenderCalendar from "@/components/Slt/RenderCalendar/RenderCalendar";


const PreRegistration = () => {
    const [currentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date>(currentDate);
    const [currentMonth, setCurrentMonth] = useState<number>(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState<number>(currentDate.getFullYear());
    const [presentDate, setPresentDate] = useState<string>(getDateFormat(currentDate));
    const [blockedId, setBlockedId] = useState<number[]>([]);
    const [data, setData] = useState<DateCalendarObj>();
    const [notAllowedDate, setNotAllowedDate] = useState<boolean>(false)
    const [fetchSuccess, setFetchSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState({isOpen: false, idTime: 0});
    const [userData, setUserData] = useState({fio: "", carNumber: "", category: "A", modelAuto: "", phoneNumber: ""});
    const [clickFeatures, setClickFeatures] = useState(0);
    let classAllow = useRef(classes.blockedSlot);


    function getDateFormat(date: Date) {
        return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`
    }

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        setPresentDate(getDateFormat(date));
    }
    const getDateCalendar = async (presentDate: string) => {
        return await axios.post('https://lk.sps38.pro/api/get-date-calendar', {
            key: 'Петух',
            date: presentDate
        });
    }
    const changeBlockedId = (data?: DateCalendarObj) => {
        if (data && data.registrations) {
            const {registrations} = data;
            return registrations.map(value => value.id_time);
        }
        return [];
    }

    useEffect(() => {
        setIsLoading(true);
        getDateCalendar(presentDate)
            .then((response: AxiosResponse<DateCalendarObj>) => {
                setData(response.data)
                setIsLoading(false);
            });
    }, [presentDate, fetchSuccess])
    useEffect(() => {
        setBlockedId(changeBlockedId(data));
    }, [data])
    useEffect(() => {
        setNotAllowedDate(checkWeek(selectedDate, currentDate));

    }, [selectedDate, currentDate])
    useEffect(() => {
    }, [notAllowedDate])
    useEffect(() => {
        if (clickFeatures >= 10){
            classAllow.current = classes.allowed;

        }
    }, [clickFeatures])

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11)
            setCurrentYear(currentYear - 1);
        }
        else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0)
            setCurrentYear(currentYear + 1);
        }
        else {
            setCurrentMonth(currentMonth + 1);
        }
    };



    // const fullNameRegex = /^([А-яёЁa-zA-Z]+ )+[А-яёЁa-zA-Z]+$/;

    const isFullNameValid = userData.fio.trim();
    const isCarNumberValid = userData.carNumber.trim().length >= 5;
    const isModelAuto = userData.modelAuto.trim().length > 3;
    const isFullPhoneNumberRegex = /^((\+7|7|8)+([0-9]){10})$/;
    const isFullPhoneNumberValid = isFullPhoneNumberRegex.test(userData.phoneNumber.trim());

    const handleSubmit = async (idTime: number) => {
        if (!isFullNameValid || !isCarNumberValid || isModelAuto || isFullPhoneNumberValid) {
            if (!isFullNameValid) {
                alert("Пожалуйста, введите ФИО или наименование организации.");
                return;
            }
            if (!isCarNumberValid) {
                alert("Пожалуйста, введите номер авто.");
                return;
            }
            if (!isModelAuto){
                alert("Пожалуйста введите марку и модель авто ");
                return;
            }
            if (!isFullPhoneNumberValid){
                alert("Пожалуйста корректно введите номер телефона");
                return;
            }
        }

        try {
            const {fio, carNumber, category, modelAuto, phoneNumber} = userData;
            const response = await axios.post('https://lk.sps38.pro/api/set-registration-to', {
                fio: fio.trim(),
                carNumber: carNumber.trim(),
                category,
                modelAuto,
                phoneNumber,
                date: presentDate,
                idTime,
                key: 'Петушиная магия',
            });
            if (response.data.result) {
                setFetchSuccess(prevState => !prevState);
            }
            setShowForm({isOpen: false, idTime: 0})
            setUserData({fio: "", carNumber: "", category: "", modelAuto: "", phoneNumber: ""});
            confirmation(response.data)
            // Обработка успешного ответа от сервера
        } catch (error) {
            console.error(error);
            // Обработка ошибки
        }
    };

    const clickHandler = (id: number, blockedId?: number[]) => {
        if (blockedId?.includes(id)) return;

        setShowForm({isOpen: true, idTime: id});
    }
    const closeForm = () => {
        setShowForm({isOpen: false, idTime: 0});
    }


    //Подтверждение заявки
    function confirmation({desc}: DateCalendarObj) {
        return (<div className={classes.FormBackground}>
            <div className={classes.Form}>
                {desc}
            </div>
        </div>)
    }


    const viewForm = () => {
        return (
            <div className={classes.form}>
                <label>ФИО/Наименование организации</label>
                <input value={userData.fio} onChange={(e) => setUserData(prev => ({...prev, fio: e.target.value}))}
                       placeholder={"ФИО или Организация"}/>
                <label>Марка и модель ТС </label>
                <input value={userData.modelAuto} onChange={(e) => setUserData(prev => ({...prev, modelAuto: e.target.value}))}
                       placeholder={"Марка и модель ТС"}/>
                <label>Гос номер авто</label>
                <input value={userData.carNumber}
                       onChange={(e) => setUserData(prev => ({...prev, carNumber: e.target.value}))}
                       placeholder={"Введите номер авто"}/>
                <label>Номер телефона</label>
                <input value={userData.phoneNumber} onChange={(e) => setUserData(prev => ({...prev, phoneNumber: e.target.value}))}
                    placeholder={"Номер телефона"}/>
                <label>Категория авто</label>
                <select value={userData.category}
                        onChange={(e) => setUserData(prev => ({...prev, category: e.target.value}))}>
                    <option value="A">Категория А</option>
                    <option value="M">Категория М</option>
                    <option value="B">Категория В</option>
                    <option value="C">Категория С</option>
                    <option value="D">Категория D</option>
                    <option value="E">Категория E</option>

                </select>
                <button onClick={closeForm} className={classes.X}></button>
            </div>
        );
    };
    const selectTimeRegistration = (idTime: number, registrations?: DateCalendarReg[]) => {
        if (registrations) {
            const reg = registrations.filter((value) => value.id_time === idTime);
            if (reg.length) {
                console.log(reg)
                return <div className={classes.p}>
                    <p> {'ФИО/Организация: ' + reg[0].fio}</p>
                    <p> {'Марка и модель ТС: '+reg[0].model_auto}</p>
                    <p> {'Номер ТС: ' + reg[0].car_number}</p>
                    <p> {'Категория ТС: ' + reg[0].category}</p>
                    <p> {'Телефон: '+reg[0].phone}</p>
                </div>
            }
        }
        return null;
    };
    const handleFeatures = () => {
        setClickFeatures(prevState => prevState + 1);
    }
    return (
        <div>
            <h1 className={classes.h1} onClick={handleFeatures}>Предварительная запись</h1>
            <div className={classes.Recording}>
                <div className={classes.calendar}>
                    <div className={classes.header}>
                        <button className={classes.prevButton} onClick={handlePrevMonth}>
                            Назад
                        </button>
                        <div className={classes.month}>
                            {`${new Date(currentYear, currentMonth).toLocaleString('ru', {
                                month: 'long',
                            })} ${currentYear}`}
                        </div>
                        <button className={classes.nextButton} onClick={handleNextMonth}>
                            Далее
                        </button>
                    </div>
                    <div className={classes.weekdays}>
                        <RenderCalendar
                            currentYear={currentYear}
                            currentDate={currentDate}
                            currentMonth={currentMonth}
                            handleDateClick={handleDateClick}
                            selectedDate={selectedDate}
                        />
                    </div>
                </div>

                <div className={classes.Time}>
                    {!isLoading
                        ? data?.times && data.times.length
                            ? data.times.map(time => (
                                <div className={classes.TimeDiv} key={time.id + 'times'}>
                                    <button
                                            className={clsx(classes.timeSlot, (blockedId.includes(time.id)
                                                    || notAllowedDate)
                                                && classAllow.current)}
                                            onClick={() => clickHandler(time.id, blockedId)}>
                                        {time.description}
                                    </button>
                                    {selectTimeRegistration(time.id, data.registrations)}
                                </div>
                            ))
                            : null
                        : <h3>Идет загрузка...</h3>
                    }
                </div>
            </div>
            {showForm.isOpen && <div className={classes.FormBackground}>
                <div className={classes.Form}>
                    {viewForm()}
                    <div className={classes.Button}>
                        <button onClick={() => handleSubmit(showForm.idTime)}>Отправить заявку</button>
                    </div>
                </div>
            </div>}


        </div>
    );
};

export default PreRegistration;
