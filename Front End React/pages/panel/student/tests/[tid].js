import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Head from "next/head";
import Image from "next/image";
import common from '@/styles/panel/Common.module.css'
import AccessDenied from '@/components/panel/AccessDenied';
import Loading from '@/components/panel/Loading';
import Header from '@/components/panel/Header';
import Menu from '@/components/panel/menu/Student';
import styles from '@/styles/panel/student/NewTest.module.css';
import { checkLogin } from '@/utils/checkLogin';
import { getUserInfo } from '@/utils/getUserInfo';

class newTest extends Component {
    state = { 
        userLoggedIn : false,
        tid : "",
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
    setTid(){
        if(this.state.tid == "") {
            this.setState({tid : this.props.router.query.tid});
        }
    }
    content(){
        if(this.state.tid != "52"){
            return (
                <div className={styles.no_item}>
                    <h1>شما اجازه دسترسی به این آزمون را ندارید.</h1>
                </div>
            );
        }
        else{
            return (
                <div className={styles.card}>
                    <div>
                        <div className={styles.header}>
                            <h2 className={styles.timer}>00:59:35</h2>
                            <h1>آزمون پایانی دوره تعمیرات لپ تاپ</h1>
                        </div>
                        <hr />
                    </div>
                    <div className={styles.content}>
                        <div>
                            <div>
                                <div className={styles.q_container}>
                                    <div className={styles.q_num}>1.</div>
                                    <div className={styles.question}>کدام گزینه صحیح میباشد ؟</div>
                                </div>
                                <div className={styles.image}>
                                    <Image src="/images/placeholder-laptop.jpg" width={500} height={500} ></Image>
                                </div>
                            </div>
                            <div className={styles.a_container}>
                                <div className={styles.answer}>
                                    <input type="radio" name="a1" id="a1_1" />
                                    <label htmlFor="a1_1">1.وحشی</label>
                                </div>
                                <div className={styles.answer}>
                                    <input type="radio" name="a1" id="a1_2" />
                                    <label htmlFor="a1_2">2.تعمیر</label>
                                </div>
                                <div className={styles.answer}>
                                    <input type="radio" name="a1" id="a1_3" />
                                    <label htmlFor="a1_3">3.درواقع</label>
                                </div>
                                <div className={styles.answer}>
                                    <input type="radio" name="a1" id="a1_4" />
                                    <label htmlFor="a1_4">4.درواقع میتوان گفت هیچکدام</label>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div>
                            <div>
                                <div className={styles.q_container}>
                                    <div className={styles.q_num}>2.</div>
                                    <div className={styles.question}>کدام گزینه صحیح میباشد ؟</div>
                                </div>
                                <div className={styles.image}>
                                    <Image src="/images/placeholder-phone.jpg" width={500} height={500} ></Image>
                                </div>
                            </div>
                            <div className={styles.a_container}>
                                <div className={styles.answer}>
                                    <input type="radio" name="a2" id="a2_1" />
                                    <label htmlFor="a2_1">1.وحشی</label>
                                </div>
                                <div className={styles.answer}>
                                    <input type="radio" name="a2" id="a2_2" />
                                    <label htmlFor="a2_2">2.تعمیر</label>
                                </div>
                                <div className={styles.answer}>
                                    <input type="radio" name="a2" id="a2_3" />
                                    <label htmlFor="a2_3">3.درواقع</label>
                                </div>
                                <div className={styles.answer}>
                                    <input type="radio" name="a2" id="a2_4" />
                                    <label htmlFor="a2_4">4.درواقع میتوان گفت هیچکدام</label>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className={styles.button}>
                        <button>ثبت نهایی پاسخ</button>
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
            this.setTid()
            return (
                <div>
                    <Head>
                        <title>آزمون | خرد پرور</title>
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