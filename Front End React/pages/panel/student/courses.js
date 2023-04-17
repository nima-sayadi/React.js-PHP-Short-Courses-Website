import React, { Component } from 'react';
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import common from '@/styles/panel/Common.module.css'
import styles from '@/styles/panel/student/Courses.module.css'
import AccessDenied from '@/components/panel/AccessDenied';
import Loading from '@/components/panel/Loading';
import Header from '@/components/panel/Header';
import Menu from '@/components/panel/menu/Student';
import Card from '@/components/panel/Card';
import { checkLogin } from '@/utils/checkLogin';
import { getUserInfo } from '@/utils/getUserInfo';

class courses extends Component {
    state = { 
        userLoggedIn : false,
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
    render() { 
        if(this.state.loading == true){
            return <Loading title = "دوره ها" />
        }
        if(this.state.userLoggedIn == false){
            return <AccessDenied />
        }
        return (
            <div>
                <Head>
                    <title>دوره ها | خرد پرور</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className={common.wrapper}>
                    <div className={common.container}>
                        <Header />
                        <div className={styles.cards_wrapper}>
                            <div className={styles.section1}>
                                <h1>دوره های خردپرور</h1>
                                <div className={styles.cards_container}>
                                    <Card title="دوره تعمیرات لپ تاپ">
                                        <Image src="/images/placeholder-laptop.jpg"  width={300} height={300} ></Image>
                                        <hr />
                                        <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص....</p>
                                    </Card>
                                    <Card title="دوره تعمیرات لپ تاپ">
                                        <Image src="/images/placeholder-laptop.jpg"  width={300} height={300} ></Image>
                                        <hr />
                                        <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص....</p>
                                    </Card>
                                    <Card title="دوره تعمیرات لپ تاپ">
                                        <Image src="/images/placeholder-laptop.jpg"  width={300} height={300} ></Image>
                                        <hr />
                                        <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص....</p>
                                    </Card>
                                    <Card title="دوره تعمیرات لپ تاپ">
                                        <Image src="/images/placeholder-laptop.jpg"  width={300} height={300} ></Image>
                                        <hr />
                                        <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص....</p>
                                    </Card>
                                    <Card title="دوره تعمیرات موبایل">
                                        <Image src="/images/placeholder-phone.jpg"  width={300} height={300} ></Image>
                                        <hr />
                                        <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص....</p>
                                    </Card>
                                    <Card title="دوره آموزش C++">
                                        <Image src="/images/placeholder-c++.jpg"  width={300} height={300} ></Image>
                                        <hr />
                                        <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص....</p>
                                    </Card>
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
                    </div>
                    <Menu />
                </div>
            </div>
        );
    }
}
 
export default courses;