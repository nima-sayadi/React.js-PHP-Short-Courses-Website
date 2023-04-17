import React, { Component } from 'react';
import Head from "next/head";
import common from '@/styles/panel/Common.module.css'
import styles from '@/styles/panel/student/Certifications.module.css'
import AccessDenied from '@/components/panel/AccessDenied';
import Loading from '@/components/panel/Loading';
import Header from '@/components/panel/Header';
import Menu from '@/components/panel/menu/Student';
import { checkLogin } from '@/utils/checkLogin';
import { getUserInfo } from '@/utils/getUserInfo';

class certifications extends Component {
    state = { 
        userLoggedIn : false,
        certificationExist : true,
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
                <p>تبریک ! گواهی شما صادر شده است. با کلیک روی کلید زیر میتوانید گواهی خود را مشاهده و دریافت نمایید.</p>
                <button href="#" className={styles.button}>مشاهده و دریافت گواهی</button>
            </div>
        );
    }
    content(){
        if(this.state.certificationExist == false){
            return (
                <div className={styles.no_item}>
                    <h1>هیچ گواهی برای شما صادر نشده.</h1>
                </div>
            );
        }
        else{
            return (
                <div className={styles.cards_wrapper}>
                    <div className={styles.section1}>
                        <h1>گواهی ها</h1>
                        <div className={styles.cards_container}>
                            {this.card("گواهی دوره تعمیرات موبایل")}
                            {this.card("گواهی دوره تعمیرات موبایل")}
                            {this.card("گواهی دوره تعمیرات موبایل")}
                            {this.card("گواهی دوره تعمیرات موبایل")}
                            {this.card("گواهی دوره تعمیرات موبایل")}
                            {this.card("گواهی دوره تعمیرات موبایل")}
                        </div>
                    </div>
                </div>
            );
        }
    }
    render() { 
        if(this.state.loading == true){
            return <Loading title = "گواهی ها" />
        }
        if(this.state.userLoggedIn == false){
            return <AccessDenied />
        }
        return (
            <div>
                <Head>
                    <title>گواهی ها | خرد پرور</title>
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
 
export default certifications;