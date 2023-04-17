import React, { Component } from 'react';
import Head from "next/head";
import styles from '@/styles/website/About.module.css'
import Header from '@/components/website/Header';
import Footer from '@/components/website/Footer'

class About extends Component {

    render() { 
        return (
            <div>
                <Head>
                    <title>خرد پرور | درباره ما</title>
                    <meta name="description" content="درباره ما | خرد پرور" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header />
                <main className={styles.main}>
                    <div className={styles.card}>
                        <div className={styles.section1}>
                            <div className={styles.employee + " " + styles.e1}>
                                <div className={styles.image_des} ><h3>مدیر عامل : تینا زندی</h3></div>
                            </div>
                            <div className={styles.employee + " " + styles.e2}>
                                <div className={styles.image_des} ><h3>روابط عمومی : فاطمه نیکی</h3></div>
                            </div>
                            <div className={styles.employee + " " + styles.e3}>
                                <div className={styles.image_des} ><h3>پشتیبانی فنی : علی جعفری</h3></div>
                            </div>
                            <div className={styles.employee + " " + styles.e4}>
                                <div className={styles.image_des} ><h3>حسابداری : میلاد نوری</h3></div>
                            </div>
                        </div>
                        <div className={styles.section2}>
                            <h1>درباره ما</h1>
                            <h4>
                                مرکز خرد پرور با سابقه 5 سال فعالیت در حوزه برگزاری دوره های کوتاه مدت مفتخر است 
                                تا به شما عزیزان بهترین خدمات را ارائه دهد. این مرکز میتواند تمامی نیاز های شما را 
                                برطرف کند و در انتها شما با گذراندن هر دوره، یک گواهی معتبر بین المللی دریافت خواهید کرد.
                                مرکز خرد پرور با سابقه 5 سال فعالیت در حوزه برگزاری دوره های کوتاه مدت مفتخر است 
                                تا به شما عزیزان بهترین خدمات را ارائه دهد. این مرکز میتواند تمامی نیاز های شما را 
                                برطرف کند و در انتها شما با گذراندن هر دوره، یک گواهی معتبر بین المللی دریافت خواهید کرد.
                                مرکز خرد پرور با سابقه 5 سال فعالیت در حوزه برگزاری دوره های کوتاه مدت مفتخر است 
                                تا به شما عزیزان بهترین خدمات را ارائه دهد. این مرکز میتواند تمامی نیاز های شما را 
                                برطرف کند و در انتها شما با گذراندن هر دوره، یک گواهی معتبر بین المللی دریافت خواهید کرد.
                                مرکز خرد پرور با سابقه 5 سال فعالیت در حوزه برگزاری دوره های کوتاه مدت مفتخر است 
                                تا به شما عزیزان بهترین خدمات را ارائه دهد. این مرکز میتواند تمامی نیاز های شما را 
                                برطرف کند و در انتها شما با گذراندن هر دوره، یک گواهی معتبر بین المللی دریافت خواهید کرد.
                            </h4>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}
 
export default About;