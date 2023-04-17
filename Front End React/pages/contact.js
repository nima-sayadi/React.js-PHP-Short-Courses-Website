import React, { Component } from 'react';
import Head from "next/head";
import Image from "next/image";
import styles from '@/styles/website/Contact.module.css'
import Header from '@/components/website/Header';
import Footer from '@/components/website/Footer'

class Contact extends Component {
    render() { 
        return (
            <div>
                <Head>
                    <title>خرد پرور | تماس با ما</title>
                    <meta name="description" content="تماس با ما | خرد پرور" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header />
                <main className={styles.main}>
                    <div className={styles.card}>
                        <div className={styles.section1}>
                            <a href="https://goo.gl/maps/mE41FrVPsEaotAwX9" target="_blank">
                                <Image src={"/images/map.png"} width={700} height={485} alt="Location-map" ></Image>
                            </a>
                        </div>
                        <div className={styles.section2}>
                            <h1>تماس با ما</h1>
                            <h3><i className="fa-brands fa-telegram"></i> &nbsp;0918xxxxxxx</h3>
                            <h3><i className="fa-brands fa-whatsapp"></i> &nbsp;0918xxxxxxx</h3>
                            <h3><i className="fa fa-phone"></i> &nbsp;087xxxxxxx</h3>
                            <h3><i className="fa fa-mailbox"></i> &nbsp;example@example.com</h3>
                            <h4><i className="fa fa-location"></i> &nbsp;کردستان - سنندج - بلوار پاسداران - دانشگاه آزاد سنندج</h4>
                        
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}
 
export default Contact;