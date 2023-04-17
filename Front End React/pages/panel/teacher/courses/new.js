import React, { Component } from 'react';
import Head from "next/head";
import common from '@/styles/panel/Common.module.css'
import AccessDenied from '@/components/panel/AccessDenied';
import Loading from '@/components/panel/Loading';
import Header from '@/components/panel/Header';
import Menu from '@/components/panel/menu/Teacher';
import Input from '@/components/panel/Input';
import Uploader from '@/components/panel/Uploader';
import TextArea from '@/components/panel/TextArea';
import styles from '@/styles/panel/teacher/newCourse.module.css';
import {DatePicker} from "react-advance-jalaali-datepicker";
import { checkLogin } from '@/utils/checkLogin';
import { getUserInfo } from '@/utils/getUserInfo';
import { showSuccess } from '@/utils/showSuccess';
import axios from 'axios';


class newCourse extends Component {
    constructor(props){
        super(props);
        this.state = { 
            userLoggedIn : false,
            loading : true,
            time : [],
            dates_start : null,
            dates_end : null,
            image : null,
        }
        this.dateEndHandler = this.dateEndHandler.bind(this);
        this.dateStartHandler = this.dateStartHandler.bind(this);
        this.timeHandler = this.timeHandler.bind(this);
        this.getImage = this.getImage.bind(this);
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
    getImage(data){
        this.setState({image : data})
    }
    dateStartHandler(unix, formatted){
        this.setState({
            dates_start : [unix,formatted]
        })
    }
    dateEndHandler(unix, formatted){
        this.setState({
            dates_end : [unix,formatted]
        })
    }
    timeHandler(item){
        let array = this.state.time;
        array.push(item);
        this.setState({time : array})
    }
    submit(){
        let title = document.getElementById("title").value;
        let des = document.getElementById("des").value;
        let params = {
            "title" : title,
            "dates_start" : this.state.dates_start,
            "dates_end" : this.state.dates_end,
            "time" : this.state.time,
            "image" : this.state.image,
            "des" : des
        }
        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.post("http://localhost/api/teacher/course/new.php",params,config).then(response=>{
            if(response.data == "success"){
                showSuccess("دوره با موفقیت افزوده شد.",true,"/panel/teacher/courses");
            }
            else{
                showSuccess("خطایی رخ داده است !");
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
                    <title>ایجاد دوره | خرد پرور</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className="success_msg">
                    <div></div>
                </div>
                <div className={common.wrapper}>
                    <div className={common.container}>
                        <Header />
                        <div className={styles.card}>
                            <div className={styles.header}>
                                <h1>ایجاد دوره جدید</h1>
                                <hr />
                            </div>
                            <Input id="title" type="text" title="عنوان دوره" emptyCheck="true" placeholder="دوره تعمیرات موبایل" ></Input>
                            <div className={styles.date_container} >
                                <p><b>تاریخ شروع دوره *</b></p>
                                <DatePicker
                                placeholder="** انتخاب تاریخ شروع **"
                                format="jYYYY/jMM/jDD"
                                onChange={this.dateStartHandler}
                                id="startDate"
                                cancelOnBackgroundClick = "true"
                                />
                            </div>
                            <div className={styles.date_container} >
                                <p><b>تاریخ پایان دوره *</b></p>
                                <DatePicker
                                placeholder="** انتخاب تاریخ پایان **"
                                format="jYYYY/jMM/jDD"
                                onChange={this.dateEndHandler}
                                id="EndDate"
                                cancelOnBackgroundClick = "true"
                                />
                            </div>
                            <Input id="time" getValue={this.timeHandler}  multiple="true" type="text" title="زمان دوره" emptyCheck="true" placeholder="چهارشنبه از 16:00 الی 18:00" ></Input>
                            <TextArea id="des" emptyCheck="true" title="توضیحات دوره" />
                            <div className={styles.button}>
                                <Uploader title="عکس دوره را انتخاب کنید *" getImage = {this.getImage} />
                                <button onClick={()=>this.submit()}>ثبت اطلاعات</button>
                            </div>
                        </div>
                    </div>
                    <Menu />
                </div>
            </div>
        );
    }
}
 
export default newCourse;