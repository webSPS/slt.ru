import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from "next/head";
import localFont from "@next/font/local";
import clsx from "clsx";
import {useEffect} from "react";


const proxima = localFont({src:[
        {
            path: "../components/fonts/Proxima_Nova_Light.ttf",
            weight: "300",
            style: "normal",
        },
        {
            path: "../components/fonts/Proxima_Nova_Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../components/fonts/Proxima_Nova_SemiBold.ttf",
            weight: "700",
            style: "normal"
        },
    ], variable: '--proxima', preload:true})

const bebas = localFont({src: "../components/fonts/Bebas_Neue_Bold.ttf", variable: "--bebas", preload:true})


export default function App({ Component, pageProps }: AppProps): JSX.Element {
    useEffect(() => {
        const body = document.body;
        body.className=clsx(proxima.variable, bebas.variable);
    }, [])
    return (
        <>
            <Head>
                <link rel="shortcut icon" href={'/favicon.png'}/>
                <meta name={'author'} content={"MiDimas"}/>
                <title>Сайт CибЛесТранс</title>

            </Head>
            <Component {...pageProps} />
        </>
    );
}
