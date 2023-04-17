import React, { Component } from 'react';
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/website/Home.module.css'
import HeaderAnimation from '@/components/website/HeaderAnimation';
import Footer from '@/components/website/Footer'
import anime from 'animejs';
import axios from 'axios';
import Loading from '@/components/panel/Loading';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            data : null,
            loading : true
        }
    }

    componentDidMount(){
        anime({
            targets: '#home-pic',
            translateY: 30,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine',
            duration: 3000
        })
        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.get("http://localhost/api/public/top.php",config).then(response=>{
            this.setState({data : response.data});
            this.setState({loading : false});
        });
    }


    product(){
        let data = this.state.data;
        return(
            <div className={styles.courses_container}>
                {
                data.map((item,index)=>(
                    <div key={index}>
                        <h3>{item.title}</h3>
                        <hr />
                        <Image src={`/media/${item.pic}`} width={300} height={300} alt="product"></Image>
                        <hr />
                        <p>{item.des}</p>
                        <hr />
                        <h3>{item.from_date} | {item.period} روز</h3>
                        <hr />
                        <Link href="/login">ثبت نام در دوره</Link>
                    </div>
                ))
                }
            </div>
        );
    }

    render() { 
        if(this.state.loading == true){
            return <Loading title = "خرد پرور | Kherad Parvar" />
        }
        return (
            <div>
                <Head>
                    <title>خرد پرور | Kherad Parvar</title>
                    <meta name="description" content="مرکز برگزاری دوره های تخصصی کوتاه مدت | خرد پرور" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <HeaderAnimation />
                <main className={styles.main}>
                    <div className={styles.slider}>
                        <Image priority id='home-pic' className={styles.home_brain} src="/images/slider4.png" alt='slider picture' width={1000} height={1530} />
                        <div className={styles.description_container}>
                            <p className={styles.description}>
                                با ما دوره های کوتاه مدت تخصصی مورد نظرتان را بگذرانید.<br></br>انواع دوره های کوتاه مدت به همراه
                                اعطای مدرک معتبر بین المللی
                            </p>
                            <div className={styles.buttons_container}>
                                <Link href="/login" className = {styles.register_btn} >ورود / ثبت نام</Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.courses_wrapper}>
                        <h1>دوره های محبوب</h1>
                        <hr />
                        {this.product()}
                    </div>
                <Footer />
                </main>
            </div>
        );
    }
}
 
export default Home;