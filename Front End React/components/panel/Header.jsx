import React, { Component } from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/panel/Header.module.css';
import menuStyles from '@/styles/panel/Menu.module.css';

class Header extends Component {
    state = {
        isMenuOpen : true
    }
    menuHandle(){
        if(this.state.isMenuOpen == true) {
            this.setState({isMenuOpen : false});
            document.getElementById("menu_container").classList.remove(styles.open);
            document.getElementById("menu_container").classList.add(styles.close);
            this.handleArrows(false);
            if(window.innerWidth < 482){
                document.querySelector("." + styles.logo).style.display = "flex";
            }
        }
        else {
            this.setState({isMenuOpen : true});
            document.getElementById("menu_container").classList.remove(styles.close);
            document.getElementById("menu_container").classList.add(styles.open);
            this.handleArrows(true);
            if(window.innerWidth < 482){
                document.querySelector("." + styles.logo).style.display = "none";
            }
        }
    }
    handleArrows(cond){
        if(cond == true){
            for(let i=0;i<document.getElementsByClassName(menuStyles.item_arrow).length;i++){
                if(document.getElementsByClassName(menuStyles.item_arrow)[i].parentElement.classList.contains(menuStyles.active)){
                    document.getElementsByClassName(menuStyles.item_arrow)[i].style.display = "block";
                }
            }
        }
        else{
            setTimeout(() => {
                for(let i=0;i<document.getElementsByClassName(menuStyles.item_arrow).length;i++){
                    document.getElementsByClassName(menuStyles.item_arrow)[i].style.display = "none";
                }
            }, 500);
        }
    }
    tootltip(cond){
        if(cond == "open"){
            document.getElementById("tooltip").style.display = "block";
        }
        else{
            document.getElementById("tooltip").style.display = "none";
        }
    }
    render() { 
        return (
            <div className={styles.container} >
                <div className={styles.nav}>
                    <Link href="http://localhost/api/auth/logout.php"><i className='fa fa-power-off'></i></Link>
                </div>
                <div className={styles.logo}>
                    <Image priority src="/images/logo.png" alt='logo' width={40} height={40} />
                    <h5>خرد پرور</h5>
                </div>
                <div className={styles.open_menu}>
                    <i onClick={()=>this.menuHandle()} onMouseOver={()=>this.tootltip("open")} onMouseOut={()=>this.tootltip("close")} className='fa fa-navicon'></i>
                    <div id='tooltip' className={styles.tooltip}>
                        باز / بسته کردن منوی کناری
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Header;