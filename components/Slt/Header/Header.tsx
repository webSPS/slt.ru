import Image from "next/image";
import classes from "./Header.module.css";
import Head from "next/head";

const Header = () => {

    return (
        <div>
            <Head>
                <meta name={"viewport"} content={"width=device-width, initial-scale=1"} ></meta>
                <title>ООО СибЛесТранс</title>
            </Head>
            <header className={classes.header}>
                <div>
                    <Image src={"/logo.svg"} alt={""} width={"40"} height={"40"}/>
                </div>
                <div>
                    <h1>ООО СибЛесТранс</h1>
                </div>
                <div className={classes.div}>
                    <a href={""}>Главная</a>
                    <a href={"#footer"}>Контакты</a>
                </div>

            </header>
        </div>
    );
};

export default Header;