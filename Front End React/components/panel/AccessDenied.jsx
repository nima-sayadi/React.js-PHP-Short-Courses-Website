import React, { Component } from 'react';
import Head from "next/head";
import styles from '@/styles/panel/AccessDenied.module.css'

class AccessDenied extends Component {
    componentDidUpdate() {
        setTimeout(() => {
            window.location.replace("/login")
        }, 6000);
    }
    render() { 
        return (
            <div>
                <Head>
                    <title>دسترسی غیر مجاز | خرد پرور</title>
                    <meta name="description" content="Access Denied" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className={styles.card}>
                    <h4>دسترسی شما به این صفحه غیر مجاز است ! تا لحظاتی دیگر به صفحه ورود هدایت میشوید.</h4>
                </div>
            </div>
        );
    }
}
 
export default AccessDenied;