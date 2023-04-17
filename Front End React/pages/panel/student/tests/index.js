import React, { Component } from 'react';
import Head from "next/head";
import Link from "next/link";
import common from '@/styles/panel/Common.module.css'
import AccessDenied from '@/components/panel/AccessDenied';
import Loading from '@/components/panel/Loading';
import Header from '@/components/panel/Header';
import Menu from '@/components/panel/menu/Student';
import styles from '@/styles/panel/student/Tests.module.css';
import { checkLogin } from '@/utils/checkLogin';
import { getUserInfo } from '@/utils/getUserInfo';

class tests extends Component {
    state = { 
        userLoggedIn : false,
        testExist : true,
        loading : true
    } 
    componentDidMount() {
        checkLogin().then(response=>{
            if(response){
                getUserInfo().then(response2=>{
                    let level = response2.level;
                    if(level == "2"){
                        this.setState({userLoggedIn : this.userLoggedIn,loading : false});
                    }
                    else{
                        this.setState({loading : false});
                    }
                });
            }
            else{
                this.setState({loading : false});
            }
        });
    }
    card(title){
        return(
            <div className={styles.card}>
                <div className={styles.card_header}>
                    <h3>{title}</h3>
                </div>
                <div className={styles.content}>
                    <h4>نمره کل :</h4>
                    <h3>18.00</h3>
                    <h3 className={styles.status} >قبول</h3>
                </div>
                <div className={styles.content}>
                    <h4>وضعیت آزمون :</h4>
                    <h3>در انتظار</h3>
                </div>
                <div className={styles.content}>
                    <h4>زمان آزمون :</h4>
                    <h3>1401/01/01 | 23:11</h3>
                </div>
                <button href="#" className={styles.button}>شرکت در آزمون</button>
            </div>
        );
    }
    content(){
        if(this.state.testExist == false){
            return (
                <div className={styles.no_item}>
                    <h1>هیچ آزمونی تعریف نشده است.</h1>
                </div>
            );
        }
        else{
            return (
                <div className={styles.cards_wrapper}>
                    <div className={styles.section1}>
                        <h1>آزمون ها</h1>
                        <div className={styles.cards_container}>
                            {this.card("آزمون دوره تعمیرات لپ تاپ")}
                            {this.card("آزمون دوره تعمیرات لپ تاپ")}
                            {this.card("آزمون دوره تعمیرات لپ تاپ")}
                            {this.card("آزمون دوره تعمیرات لپ تاپ")}
                            {this.card("آزمون دوره تعمیرات لپ تاپ")}
                            {this.card("آزمون دوره تعمیرات لپ تاپ")}
                        </div>
                    </div>
                    <div className={styles.navigation_container}>
                        <Link className={styles.first} href="#" >اول</Link>
                        <Link className={styles.previous} href="#" >قبلی</Link>
                        <Link className={styles.page_num} href="#" >1</Link>
                        <Link className={styles.page_num} href="#" >2</Link>
                        <div className={styles.dots}>.....</div>
                        <Link className={styles.page_num} href="#" >8</Link>
                        <Link className={styles.previous} href="#" >بعدی</Link>
                        <Link className={styles.last} href="#" >آخرین صفحه</Link>
                    </div>
                </div>
            );
        }
    }
    render() { 
        if(this.state.loading == true){
            return <Loading title = "آزمون ها" />
        }
        if(this.state.userLoggedIn == false){
            return <AccessDenied />
        }
        return (
            <div>
                <Head>
                    <title>آزمون ها | خرد پرور</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className={common.wrapper}>
                    <div className={common.container}>
                        <Header />
                        {this.content()}
                    </div>
                    <Menu />
                </div>
            </div>
        );
    }
}
 
export default tests;