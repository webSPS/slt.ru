import clsx from "clsx";
import classes from "./Footer.module.css";

const Footer = () => {
    const date = new Date();
    return (
        <div>
            <footer className={clsx(classes.footer)} id={"footer"}>
                <div className={clsx(classes.footer__top)}>
                    <div className={clsx(classes.footer__contacts)}>
                        <div>Контакты</div>
                        <div>
                            ООО "СибЛесТранс" <br/>
                            г. Иркутск, ул. Полярная, 211 <br/>
                            тел. +79148717440 <br/>
                            <a href={"mailto:to@sps38.pro"}>Почта to@sps38.pro</a><br/>
                            ИНН 3812061605 <br/>
                            ОГРН 1023801752810
                        </div>
                    </div>
                </div>
                <div className={clsx(classes.footer__bottom)}>
                    <div className={classes.bottom__item}>{date.getFullYear()} ООО &quot;СибЛесТранс&quot;. Все права
                        защищены
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;