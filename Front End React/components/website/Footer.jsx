import React, { Component } from 'react';
import Link from 'next/link';
import styles from '@/styles/website/Footer.module.css';
import { checkLogin } from '@/utils/checkLogin';
import { getUserInfo } from '@/utils/getUserInfo';
class Footer extends Component {

    state = {
        link : ""
    }

    componentDidMount() {
        checkLogin().then(response => {
            if(response){
                getUserInfo().then(response2 => {
                    let level = response2.level;
                    let link;
                    if(level == '0'){
                        link = "/panel/admin/courses";
                    }
                    else if(level == "1"){
                        link = "/panel/teacher/courses";
                    }
                    else if(level == "2"){
                        link = "/panel/student";
                    }
                    else{
                        link = "/";
                    }
                    this.setState({
                        link : <Link className={styles.links} href={link}><i className="fa fa-key"></i> پنل کاربری</Link>
                    })
                })
            }
            else{
                this.setState({
                    link : <Link className={styles.links} href="/login"><i className="fa fa-key"></i> ورود / ثبت نام</Link>
                });
            }
        });
    }

    render() { 
        return (
            <footer className={styles.footer} >
                <div className={styles.sections}>
                    <div className={styles.section1}>
                        <h3>لینک های مفید</h3>
                        <ul>
                            <li><a className={styles.links} href="/"><i className="fa fa-home"></i> خانه</a></li>
                            <li>{this.state.link}</li>
                            <li><Link className={styles.links} href="/about"><i className="fa fa-circle-question"></i> درباره ما</Link></li>
                            <li><Link className={styles.links} href="/contact"><i className="fa fa-phone-square-alt"></i> تماس با ما</Link></li>
                        </ul>
                    </div>
                    <div className={styles.section2}>
                        <h3>شبکه های اجتماعی</h3>
                        <ul>
                            <li><Link className={styles.links} href="#"><i className="fa-brands fa-telegram"></i> تلگرام</Link></li>
                            <li><Link className={styles.links} href="#"><i className="fa-brands fa-instagram"></i> اینستاگرام</Link></li>
                            <li><Link className={styles.links} href="#"><i className="fa-brands fa-facebook"></i> فیسبوک</Link></li>
                            <li><Link className={styles.links} href="#"><i className="fa-brands fa-twitter"></i> توییتر</Link></li>
                        </ul>
                    </div>
                    <div className={styles.section3}>
                        <h3>درباره ما</h3>
                        <p>
                            مرکز خرد پرور با سابقه 5 سال فعالیت در حوزه برگزاری دوره های کوتاه مدت مفتخر است 
                            تا به شما عزیزان بهترین خدمات را ارائه دهد. این مرکز میتواند تمامی نیاز های شما را 
                            برطرف کند و در انتها شما با گذراندن هر دوره، یک گواهی معتبر بین المللی دریافت خواهید کرد.
                        </p>
                    </div>
                </div>
                <div className={styles.copyright}>تمامی حقوق این وبسایت محفوظ میباشد و هرگونه کپی برداری پیگرد قانونی دارد |
                 Copyright © {new Date().getFullYear()} Kherad Parvar All rights reserved</div>
            </footer>
        );
    }
}
 
export default Footer;