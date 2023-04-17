import React, { Component } from 'react';
import Head from "next/head";
import common from '@/styles/panel/Common.module.css'
import AccessDenied from '@/components/panel/AccessDenied';
import Loading from '@/components/panel/Loading';
import Header from '@/components/panel/Header';
import Menu from '@/components/panel/menu/Teacher';
import Input from '@/components/panel/Input';
import styles from '@/styles/panel/teacher/Profile.module.css';
import { checkLogin } from '@/utils/checkLogin';
import { getUserInfo } from '@/utils/getUserInfo';

class profile extends Component {
    state = { 
        userLoggedIn : false,
        loading : true
    } 
    componentDidMount() {
        checkLogin().then(response=>{
            if(response){
                getUserInfo().then(response2=>{
                    let level = response2.level;
                    if(level == "1"){
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
    render() { 
        if(this.state.loading == true){
            return <Loading title = "پروفایل" />
        }
        if(this.state.userLoggedIn == false){
            return <AccessDenied />
        }
        return (
            <div>
                <Head>
                    <title>پروفایل | خرد پرور</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className={common.wrapper}>
                    <div className={common.container}>
                        <Header />
                        <div className={styles.card}>
                            <div className={styles.header}>
                                <h1>پروفایل کاربری</h1>
                                <hr />
                            </div>
                            <Input id="name" type="text" title="نام و نام خانوادگی" emptyCheck="true" placeholder="علی" ></Input>
                            <Input id="mail" type="text" title="ایمیل" emptyCheck="true" placeholder="example@example.com" ></Input>
                            <div className={styles.button}>
                                <button>ثبت اطلاعات</button>
                            </div>
                        </div>
                    </div>
                    <Menu />
                </div>
            </div>
        );
    }
}
 
export default profile;