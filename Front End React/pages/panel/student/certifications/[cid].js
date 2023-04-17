import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Head from "next/head";
import Image from "next/image";
import common from '@/styles/panel/Common.module.css'
import AccessDenied from '@/components/panel/AccessDenied';
import Loading from '@/components/panel/Loading';
import Header from '@/components/panel/Header';
import Menu from '@/components/panel/menu/Student';
import styles from '@/styles/panel/student/NewCertification.module.css';
import { checkLogin } from '@/utils/checkLogin';
import { getUserInfo } from '@/utils/getUserInfo';

class newTest extends Component {
    state = { 
        userLoggedIn : false,
        cid : "",
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
    setcid(){
        if(this.state.cid == "") {
            this.setState({cid : this.props.router.query.cid});
        }
    }
    content(){
        if(this.state.cid != "52"){
            return (
                <div className={styles.no_item}>
                    <h1>گواهی یافت نشد !</h1>
                </div>
            );
        }
        else{
            return (
                <div className={styles.card}>
                    <div className={styles.paper}>
                        <div>
                            <h3 className={styles.god}>بسم تعالی</h3>
                            <div className={styles.header}>
                                <h1>گواهی اتمام دوره تعمیرات موبایل</h1>
                                <div>
                                    <h3>شماره : 912384</h3>
                                    <h3>تاریخ : 1401/01/01</h3>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className={styles.body}>
                            <h2>گواهی میشود : </h2>
                            <p>خانم / آقای <b>علی حسینی</b> با شماره موبایل <b>09183228599</b> ، <b>دوره تعمیرات موبایل</b> را با موفقیت گذرانده است.</p>
                            <div className={styles.sign}>
                                <Image src="/images/sign.png" width={130} height={110}></Image>
                                <h3>نیما صیادی</h3>
                                <h3>مدیریت کل خردپرور</h3>
                            </div>
                        </div>  
                    </div>
                    <div className={styles.button}>
                        <button>دریافت گواهی بصورت PDF</button>
                    </div>
                </div>
            );
        }
    }
    render() { 
        if(this.state.loading == true){
            return <Loading title = "آزمون جدید" />
        }
        if(this.state.userLoggedIn == false){
            return <AccessDenied />
        }
        if(this.props.router.isReady){
            this.setcid()
            return (
                <div>
                    <Head>
                        <title>گواهی دوره تعمیرات موبایل | خرد پرور</title>
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
}
 
export default withRouter(newTest);