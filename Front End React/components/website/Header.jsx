import React, { Component } from 'react';
import styles from "@/styles/website/Header.module.css"
import Link from 'next/link';
import Image from 'next/image';
import { checkLogin } from '@/utils/checkLogin';
import { getUserInfo } from '@/utils/getUserInfo';

class Header extends Component {

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
                        link : <Link href={link} className={styles.link + " " + styles.l1}>پنل کاربری</Link>
                    })
                })
            }
            else{
                this.setState({
                    link : <Link href="/login" className={styles.link + " " + styles.l1}>ورود | ثبت نام</Link>
                });
            }
        });
    }

    render() { 
        return (
            <header className={styles.container} >
                <div className={styles.links_container}>
                    {this.state.link}
                    <Link href="/contact" className={styles.link + " " + styles.l2}>تماس با ما</Link>
                    <Link href="/about" className={styles.link + " " + styles.l3}>درباره ما</Link>
                </div>
                <div className={styles.little_brain}>
                    <Image  priority src="/images/logo.png" width={70} height={70} alt="logo" />
                </div>
            </header>
        );
    }
}
 
export default Header;