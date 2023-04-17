import React, { Component } from 'react';
import styles from "@/styles/website/HeaderAnimation.module.css"
import Link from 'next/link';
import Image from 'next/image';

class HeaderAnimation extends Component {
    changeCSS(){
        if(document.readyState === "complete"){
            document.querySelector("#description").style.overflow = "unset"
            document.querySelector("#description").style.whiteSpace = "normal"
            document.querySelector("#l1").style.overflow = "unset"
            document.querySelector("#l1").style.whiteSpace = "normal"
            document.querySelector("#l2").style.overflow = "unset"
            document.querySelector("#l2").style.whiteSpace = "normal"
        }
    }
    render() { 
        return (
            <header className={styles.container} >
                <div id='description' className={styles.description}><b>خرد پرور |</b> معتبر ترین مرکز دوره های کوتاه مدت در ایران</div>
                <div className={styles.links_container}>
                    <Link id='l1' href="/contact" className={styles.link + " " + styles.l1}>تماس با ما</Link>
                    <Link id='l2' href="/about" className={styles.link + " " + styles.l2} >درباره ما</Link>
                </div>
                <div className={styles.little_brain} onAnimationEnd={this.changeCSS} >
                    <Image  priority src="/images/logo.png" width={70} height={70} alt="logo" />
                </div>
            </header>
        );
    }
}
 
export default HeaderAnimation;