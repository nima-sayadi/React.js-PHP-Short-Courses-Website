import React, { Component } from 'react';
import styles from '@/styles/website/Login.module.css'
import axios from 'axios';

class RegisterForm extends Component {
    state = { 
        dpIsActive : false,
        studentActive : false,
        teacherActive : false,
        nameFilled : false,
        mailFilled : false
    } 
    componentDidMount() {
        document.getElementById("submit3").disabled = true;
    }
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
            if(this.state.studentActive == false && this.state.teacherActive == false){
                document.getElementById("s2empty3").style.display = "block";
            }
        }
    }
    selectStudent(){
        document.getElementById("dp").style.display = "none";
        document.getElementById("select_text").innerText = "دانش آموز";
        this.selectorStyle(false);
        this.setState({studentActive:true,teacherActive:false,dpIsActive:false})
        document.getElementById("s2empty3").style.display = "none";
        if(this.state.mailFilled == true && this.state.nameFilled == true){
            document.getElementById("submit3").disabled = false;
        }
        else{
            document.getElementById("submit3").disabled = true;
        }
    }
    selectTeacher(){
        document.getElementById("dp").style.display = "none";
        document.getElementById("select_text").innerText = "مدرس";
        this.selectorStyle(false);
        this.setState({studentActive:false,teacherActive:true,dpIsActive:false})
        document.getElementById("s2empty3").style.display = "none";
        if(this.state.mailFilled == true && this.state.nameFilled == true){
            document.getElementById("submit3").disabled = false;
        }
        else{
            document.getElementById("submit3").disabled = true;
        }
    }
    checkEmptyField(e){
        function validateEmail(mail) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)
        }

        if(e.target.id == "fullName" && e.target.value == ""){
            document.getElementById("s2empty1").style.display = "block";
            e.target.parentElement.style.borderColor = "var(--error)";
            this.setState({nameFilled : false})
            document.getElementById("submit3").disabled = true;
        }
        else if(e.target.id == "fullName" && e.target.value != ""){
            document.getElementById("s2empty1").style.display = "none";
            e.target.parentElement.style.borderColor = "rgb(51, 213, 45)";
            this.setState({nameFilled : true})
            if(this.state.mailFilled == true && (this.state.studentActive == true || this.state.teacherActive == true)){
                document.getElementById("submit3").disabled = false;
            }
            else{
                document.getElementById("submit3").disabled = true;
            }
        }

        if(e.target.id == "mail" && e.target.value == ""){
            document.getElementById("s2empty2").style.display = "block";
            document.getElementById("wrongMail").style.display = "none";
            e.target.parentElement.style.borderColor = "var(--error)";
            this.setState({mailFilled : false})
            document.getElementById("submit3").disabled = true;
        }
        else if(e.target.id == "mail" && e.target.value != ""){
            document.getElementById("s2empty2").style.display = "none";
            let mail = validateEmail(e.target.value);
            if(mail == false){
                e.target.parentElement.style.borderColor = "var(--error)";
                document.getElementById("wrongMail").style.display = "block";
                this.setState({mailFilled : false})
                document.getElementById("submit3").disabled = true;
            }
            else{
                e.target.parentElement.style.borderColor = "rgb(51, 213, 45)";
                document.getElementById("wrongMail").style.display = "none";
                this.setState({mailFilled : true})
                if(this.state.nameFilled == true && (this.state.studentActive == true || this.state.teacherActive == true)){
                    document.getElementById("submit3").disabled = false;
                }
                else{
                    document.getElementById("submit3").disabled = true;
                }
            }
        }
    }

    async submit(){
        let name = document.getElementById("fullName").value;
        let mail = document.getElementById("mail").value;
        let level = document.getElementById("select_text").innerText;
        if(level == "مدرس"){
            level = 1;
        }
        else {
            level = 2;
        }
        let params = {
            "name" : name,
            "mail" : mail,
            "level" : level,
            "phone" : this.props.userPhone,
        }
        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        const response = await axios.post("http://localhost/api/auth/step2.php",params,config);
        let res = response.data;
        if(res == "next"){
            this.props.updateGuest(name,mail,level);
        }
    }

    render() { 
        return (
            <div id="registerForm" className={styles.card}>
                <h2>فرم ثبت نام</h2>
                <h5>لطفا اطلاعات را بصورت کامل و دقیق وارد نمایید.</h5>
                <div className={styles.section}>
                    <p><b>نام و نام خانوادگی</b></p>
                    <div className={styles.input_container}>
                        <input onBlur={(e)=>this.checkEmptyField(e)} onInput={(e)=>this.checkEmptyField(e)} type="text" id='fullName' autoComplete="off" />
                    </div>
                    <p id='s2empty1' className={styles.error} >لطفا این قسمت را خالی نگذارید !</p>
                </div>
                <div className={styles.section}>
                    <p><b>آدرس ایمیل</b></p>
                    <div className={styles.input_container}>
                        <input className={styles.mail} onBlur={(e)=>this.checkEmptyField(e)} onInput={(e)=>this.checkEmptyField(e)} type="text" id='mail' autoComplete="off" />
                    </div>
                    <p id='s2empty2' className={styles.error} >لطفا این قسمت را خالی نگذارید !</p>
                    <p id='wrongMail' className={styles.error} >فرمت ایمیل نادرست است !</p>
                </div>
                <div className={styles.section}>
                    <p><b>در چه عنوانی میخواهید ثبت نام شوید؟</b></p>
                    <div onClick={() => this.dropDown()} className={styles.input_container + " " + styles.select_container}>
                        <p id='select_text' >انتخاب کنید</p>
                    </div>
                    <div id='dp' className={styles.drop_down}>
                        <p onClick={() => this.selectStudent()} >دانش آموز</p>
                        <hr />
                        <p onClick={() => this.selectTeacher()}>مدرس</p>
                    </div>
                    <p id='s2empty3' className={styles.error} >لطفا عنوان ثبت نامی را انتخاب کنید !</p>
                </div>
                <div className={styles.button_container}>
                    <button id='submit3' onClick={()=>this.submit()} className={styles.submit} >ادامه ثبت نام</button>
                </div>
            </div>
        );
    }
}
 
export default RegisterForm;