import React, { Component } from 'react';
import Link from "next/link";
import { withRouter } from 'next/router';;
import styles from '@/styles/panel/Menu.module.css';
import { checkLogin } from '@/utils/checkLogin';
import { getUserInfo } from '@/utils/getUserInfo';

class Menu extends Component {
    state = {
        name : null,
        level : null
    }
    componentDidMount() {
        this.checkURL();
        checkLogin().then(response=>{
            if(response){
                getUserInfo().then(response2=>{
                    let level = response2.level;
                    if(level == "2"){
                        this.setState({
                            name : response2.name,
                            level : "دانش آموز"
                        });
                    }
                });
            }
        });
    }
    checkURL(){
        if(this.props.router.pathname == "/panel/student"){
            document.getElementById("dashboard_menu").classList.add(styles.active);
            document.getElementById("dashboard_menu").firstChild.style.display = "block";
        }
        else if(this.props.router.pathname == "/panel/student/courses"){
            document.getElementById("courses_menu").classList.add(styles.active);
            document.getElementById("courses_menu").firstChild.style.display = "block";
        }
        else if(this.props.router.pathname == "/panel/student/tests"){
            document.getElementById("tests_menu").classList.add(styles.active);
            document.getElementById("tests_menu").firstChild.style.display = "block";
        }
        else if(this.props.router.pathname == "/panel/student/certifications"){
            document.getElementById("certifications_menu").classList.add(styles.active);
            document.getElementById("certifications_menu").firstChild.style.display = "block";
        }
        else if(this.props.router.pathname == "/panel/student/profile"){
            document.getElementById("profile_menu").classList.add(styles.active);
            document.getElementById("profile_menu").firstChild.style.display = "block";
        }
    }
    render() { 
            return (
                <div id='menu_container' className={styles.container} >
                    <div className={styles.welcome}>
                    {this.state.name} عزیز، خوش آمدید.
                    </div>
                    <div className={styles.level}>
                        <h3>سطح کاربری : {this.state.level}</h3>
                    </div>
                    <Link id='dashboard_menu' className={styles.items} href="/panel/student">
                        <div className={styles.item_arrow}></div>
                        <div className={styles.item_des}>داشبورد</div>
                        <i className="fa fa-home"></i>
                    </Link>
                    <Link id='courses_menu' className={styles.items} href="/panel/student/courses">
                        <div className={styles.item_arrow}></div>
                        <div className={styles.item_des}>دوره ها</div>
                        <i className="fa fa-mortar-board"></i>
                    </Link>
                    <Link id='tests_menu' className={styles.items} href="/panel/student/tests">
                        <div className={styles.item_arrow}></div>
                        <div className={styles.item_des}>آزمون ها</div>
                        <i className="fa fa-pencil-alt"></i>
                    </Link>
                    <Link id='certifications_menu' className={styles.items} href="/panel/student/certifications">
                        <div className={styles.item_arrow}></div>
                        <div className={styles.item_des}>گواهی ها</div>
                        <i className="fa fa-medal"></i>
                    </Link>
                    <Link id='profile_menu' className={styles.items} href="/panel/student/profile">
                        <div className={styles.item_arrow}></div>
                        <div className={styles.item_des}>پروفایل</div>
                        <i className="fa fa-user"></i>
                    </Link>
                </div>
            );
        
    }
}
 
export default withRouter(Menu);