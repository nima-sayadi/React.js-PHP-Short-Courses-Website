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
import Table from '@/components/panel/Table';
import styles from '@/styles/panel/teacher/newTest.module.css';
import InputStyles from '@/styles/panel/Input.module.css';
import textAreaStyles from '@/styles/panel/TextArea.module.css';
import {DatePicker} from "react-advance-jalaali-datepicker";
import { checkLogin } from '@/utils/checkLogin';
import { getUserInfo } from '@/utils/getUserInfo';
import { showSuccess } from '@/utils/showSuccess';
import axios from 'axios';

class newCourse extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userLoggedIn : false,
            loading : true,
            dpIsActive : false,
            courseId : null,
            image : null,
            questions : [],
            dates : null,
            data : null
        }
        this.dateHandler = this.dateHandler.bind(this);
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
        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.get("http://localhost/api/teacher/course/all.php",config).then(response=>{
            this.setState({data : response.data});
        });

    }
    getValue(item){
        const array = this.state.time;
        array.push(item);
        this.setState({time : array})
    }
    getImage(data){
        this.setState({image : data})
    }

    dropDownShow(){
        let data = this.state.data;
        return(
            <div id='dp' className={styles.drop_down}>
                {data.map((item,index)=>(
                    <div key={index}>
                        <p onClick={(event) => this.selectOption(event,item.id)} >{item.title}</p>
                        <hr />
                    </div>
                ))}
            </div>
        );
    }

    // Drop Down Handle //

    selectorStyle(cond){
        if(cond == true){
            document.querySelector("." + styles.select_container).style.borderBottomLeftRadius = 0;
            document.querySelector("." + styles.select_container).style.borderBottomRightRadius = 0;
        }
        else{
            document.querySelector("." + styles.select_container).style.borderBottomLeftRadius = "8px";
            document.querySelector("." + styles.select_container).style.borderBottomRightRadius = "8px";
        }
    }
    dropDown(){
        let w = document.querySelector("." + styles.select_container).offsetWidth;
        document.getElementById("dp").style.width = w + "px"
        if(this.state.dpIsActive == false){
            document.getElementById("dp").style.display = "flex";
            this.selectorStyle(true);
            this.setState({dpIsActive:true})
        }
        else{
            document.getElementById("dp").style.display = "none";
            this.selectorStyle(false);
            this.setState({dpIsActive:false})
        }
    }
    selectOption(event,courseId){
        let courseText = event.target.innerText;
        document.getElementById("dp").style.display = "none";
        document.getElementById("select_text").innerText = courseText;
        this.selectorStyle(false);
        this.setState({dpIsActive:false,courseId : courseId})
    }

    // End Drop Down Handle //

    updateData(){
        let questions = this.state.questions;
        let question = [
            document.getElementById("des").value,
            document.getElementById("a1").value,
            document.getElementById("a2").value,
            document.getElementById("a3").value,
            document.getElementById("a4").value,
            document.getElementById("q-point").value,
        ];
        if(this.state.image){
            question.push(this.state.image);
        }
        questions.push(question);
        console.log(questions)
        this.setState({questions : questions});
        this.clearInputs();
    }

    clearInputs(){
        let inputs = document.getElementsByTagName("input");
        let textarea = document.getElementsByTagName("textarea")[0];
        textarea.value = "";
        textarea.parentElement.classList.remove(textAreaStyles.correct);
        textarea.parentElement.classList.remove(textAreaStyles.error);
        for(let i=0;i<inputs.length;i++){
            if(i != 0 && i !=1 && i!=2 && i!=3){
                inputs[i].value = null;
            }
            this.setState({image : null})
            if(i < 9 && i != 0){
                inputs[i].parentElement.classList.remove(InputStyles.correct);
                inputs[i].parentElement.classList.remove(InputStyles.error);
            }
            if(i == 9){
                inputs[i].parentElement.firstChild.lastChild.innerHTML = "&nbsp;&nbsp;عکس سوال را درصورت نیاز انتخاب کنید";
            }
        }
    }

    updateDeleted(arr){
        this.setState({questions : arr})
    }

    dateHandler(unix, formatted){
        this.setState({
            dates : [unix,formatted]
        })
    }

    submit(){
        let title = document.getElementById("select_text").innerText;
        let time = document.getElementById("time").value;
        let period = document.getElementById("period").value;
        let points = document.getElementById("points").value;
        let timeArr = [];
        timeArr = time.split(':').map(Number);
        console.log(timeArr)
        const params = {
            "title" : title,
            "course" : this.state.courseId,
            "dates" : this.state.dates,
            "hour" : timeArr[0],
            "minute" : timeArr[1],
            "period" : period,
            "points" : points,
            "questions" : this.state.questions,
        };
        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.post("http://localhost/api/teacher/test/new.php",params,config).then(response=>{
            let res = response.data;
            if(res == "success"){
                showSuccess("آزمون با موفقیت افزوده شد.",true,"/panel/teacher/tests");
            }
            else {
                console.log(res)
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
                                <h1>ایجاد آزمون جدید</h1>
                                <hr />
                            </div>
                            <div className={styles.section}>
                                <p><b>دوره مربوطه را انتخاب کنید *</b></p>
                                <div onClick={() => this.dropDown()} className={styles.input_container + " " + styles.select_container}>
                                    <p id='select_text' >** انتخاب کنید **</p>
                                </div>
                                {this.dropDownShow()}
                            </div>
                            <div className={styles.date_container} >
                                <p><b>تاریخ شروع آزمون *</b></p>
                                <DatePicker
                                placeholder="** انتخاب تاریخ **"
                                format="jYYYY/jMM/jDD"
                                onChange={this.dateHandler}
                                id="datePicker"
                                />
                            </div>
                            <p className={styles.ap}><b>زمان شروع آزمون *</b></p>
                            <Input id="time" type="text" emptyCheck="true" placeholder="16:30" />
                            <p className={styles.ap}><b>مدت زمان آزمون (به دقیقه) *</b></p>
                            <Input id="period" type="text" emptyCheck="true" placeholder="50" />
                            <p className={styles.ap}><b>جمع نمرات آزمون *</b></p>
                            <Input id="points" type="text" emptyCheck="true" placeholder="50" />
                            <div className={styles.section_seperator}>
                                <hr />
                                <h3>بخش اضافه کردن سوالات</h3>
                            </div>
                            <TextArea id="des" emptyCheck="true" title="صورت سوال" />
                            <p className={styles.ap}><b>پاسخ سوال *</b></p>
                            <div className={styles.answers}>
                                <Input id="a1" type="text" emptyCheck="true" placeholder="گزینه 1" />
                                <Input id="a2" type="text" emptyCheck="true" placeholder="گزینه 2" />
                                <Input id="a3" type="text" emptyCheck="true" placeholder="گزینه 3" />
                                <Input id="a4" type="text" emptyCheck="true" placeholder="گزینه 4" />
                            </div>
                            <p className={styles.ap}><b>نمره سوال *</b></p>
                            <Input id="q-point" type="text" emptyCheck="true" placeholder="2" />
                            <div className={styles.button}>
                                <Uploader title="عکس سوال را درصورت نیاز انتخاب کنید" getImage = {(data)=>this.getImage(data)} />
                                <button onClick={()=>this.updateData()}><i className='fa fa-square-plus'></i> افزودن سوال به آزمون</button>
                                <button onClick={()=>this.submit()}><i className='fa fa-check-circle'></i> ثبت نهایی آزمون</button>
                            </div>
                            <Table noNav = "true" type="newTest" updateDeleted = {(i)=>this.updateDeleted(i)} data = {this.state.questions} />
                        </div>
                    </div>
                    <Menu />
                </div>
            </div>
        );
    }
}
 
export default newCourse;