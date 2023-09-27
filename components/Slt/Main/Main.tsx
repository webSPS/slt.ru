import Image from "next/image";
import PROSTOCHEL from "/public/slt/PROSTOCHEL.jpg";
import classes from "./Main.module.css";
import AccordionSlt from "@/components/Slt/AccordionSlt/AccordionSlt";
import PreRegistration from "@/components/Slt/PreRegistration/PreRegistration";

const Main = () => {

    return (
        <div>
            <div>
                <Image src={PROSTOCHEL} alt={''} className={classes.image}>
                </Image>
            </div>
            <PreRegistration />
            <div className={classes.DivInformation}>
                <h1 className={classes.h1}> Информация </h1>
                <AccordionSlt title="Список документов необходимых для прохождения ТО">
                    <li className={classes.p}>
                        документ, удостоверяющий личность;
                    </li>
                    <li className={classes.p}>
                        свидетельство о регистрации транспортного средства или паспорт транспортного средства.
                    </li>
                </AccordionSlt>
                <AccordionSlt title="Предельные тарифы установленные в регионе">
                    <a className={classes.a}
                       href={"/slt/Постановление Правительства Иркутской области от 27.12.2022 № 1068-пп.pdf"}
                       download={true}>
                        Постановление Правительства Иркутской области от 27.12.2022 № 1068-пп
                    </a>
                </AccordionSlt>
                <AccordionSlt title="Законодательство о техосмотре">
                    <li className={classes.li}>
                        <a className={classes.a}
                           href={"/slt/Федеральный закон N 170-ФЗ.pdf"}
                           download={true}>
                            Федеральный закон N 170-ФЗ "О техническом осмотре транспортных средств и о внесении
                            изменений в
                            отдельные законодательные акты Российской Федерации
                        </a>
                    </li>
                    <li className={classes.li}>
                        <a className={classes.a}
                           href={"/slt/Постановление Правительства РФ Об утверждении Правил проведения технического осмотра транспортных средств.pdf"}
                           download={true}>
                            Постановление Правительства РФ "Об утверждении Правил проведения
                            технического осмотра
                            транспортных средств, а также о внесении изменений в некоторые акты Правительства Российской
                            Федерации
                        </a>
                    </li>
                </AccordionSlt>
                <AccordionSlt title="Договор о проведении техосмотра">
                    <a className={classes.a}
                       href={"/slt/Договор о проведении технического осмотра ООО «СибЛесТранс».doc"} download={true}>
                        Договор о проведении технического осмотра ООО «СибЛесТранс»
                    </a>
                </AccordionSlt>
                <AccordionSlt title="Аттестат аккредитации оператора технического осмотра">
                    <a className={classes.a}
                       href={"/slt/Аттестат_аккредитации_ООО_СибЛесТранс.pdf"} download={true}>
                        Аттестат аккредитации ООО «СибЛесТранс»
                    </a>
                </AccordionSlt>
            </div>
            <div className={classes.map}>
                <iframe
                    src="https://yandex.ru/map-widget/v1/?ll=104.257430%2C52.359618&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NjE2ODY5NxI-0KDQvtGB0YHQuNGPLCDQmNGA0LrRg9GC0YHQuiwg0J_QvtC70Y_RgNC90LDRjyDRg9C70LjRhtCwLCAyMTEiCg3Og9BCFT9wUUI%2C&z=15.9"
                    width="90%" height="400">
                </iframe>
            </div>

        </div>
    );
};

export default Main;