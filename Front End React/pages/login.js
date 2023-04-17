import React, { Component } from 'react';
import Head from "next/head";
import styles from '@/styles/website/Login.module.css'
import axios from 'axios';
import RegisterForm from '@/components/website/RegisterForm';
import { checkLogin } from '@/utils/checkLogin';
import Loading from '@/components/panel/Loading';
import { getUserInfo } from '@/utils/getUserInfo';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userPhone : "",
            userCond :"",
            name : "",
            mail : "",
            level : "",
            loading : true,
            isLoggedIn : false
        };
        this.updateGuest = this.updateGuest.bind(this);
    }

    async componentDidMount() {
        if(await checkLogin()) {
            let userInfo = await getUserInfo();
            let level = userInfo.level;
            if(level == '0'){
                window.location.replace("/panel/admin/courses");
            }
            else if(level == "1"){
                window.location.replace("/panel/teacher/courses");
            }
            else if(level == "2"){
                window.location.replace("/panel/student");
            }
            else{
                window.location.replace("/");
            }
        }
        setTimeout(() => {
            this.setState({loading : false});
        }, 100);
    }

    componentDidUpdate() {
        if(this.state.userPhone == ""){
            document.getElementById("submit").disabled = true;
            document.getElementById("submit2").disabled = true;
            document.getElementById("stage2").style.display = "none";
            document.getElementById("registerForm").style.display = "none";
        }
    }

    checkPhoneField(){
        let userInput = document.getElementById("phone").value;

        function mobileRegex(str){
            let mobileReg = /^(09)[0-3,9]\d{8}$/ig;
            let persianNum = [/۰/gi,/۱/gi,/۲/gi,/۳/gi,/۴/gi,/۵/gi,/۶/gi,/۷/gi,/۸/gi,/۹/gi];
            let arabicNum = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
            for(let i=0;i<10;i++){
                str = str.replace(persianNum[i],i).replace(arabicNum[i], i);
            }
            let number = str.match(mobileReg) || [];
            return number;
        }

        if(userInput == ""){
            document.getElementById("empty").style.display = "block"
            document.getElementById("wrong").style.display = "none"
            document.getElementById("submit").disabled = true;
            document.getElementById("ic1").style.borderColor = "var(--error)"
        }
        else{
            document.getElementById("empty").style.display = "none"
            if(mobileRegex(userInput) == ""){
                document.getElementById("wrong").style.display = "block"
                document.getElementById("submit").disabled = true;
                document.getElementById("ic1").style.borderColor = "var(--error)"    
            }
            else{
                document.getElementById("wrong").style.display = "none"
                document.getElementById("submit").disabled = false;
                document.getElementById("ic1").style.borderColor = "rgb(51, 213, 45)"
            }
        }
    }

    checkCodeField(){
        let userInput = document.getElementById("code").value;
        document.getElementById("wrongCode").style.display = "none";
        function mobileRegex(str){
            let mobileReg = /^\d{6}$/ig;
            let persianNum = [/۰/gi,/۱/gi,/۲/gi,/۳/gi,/۴/gi,/۵/gi,/۶/gi,/۷/gi,/۸/gi,/۹/gi];
            let arabicNum = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
            for(let i=0;i<10;i++){
                str = str.replace(persianNum[i],i).replace(arabicNum[i], i);
            }
            let number = str.match(mobileReg) || [];
            number.forEach(function(value,index,arr){
                arr[index][0]==='0' || (arr[index]='0'+arr[index]);
            });
            return number;
        }

        if(userInput == ""){
            document.getElementById("empty2").style.display = "block"
            document.getElementById("wrong2").style.display = "none"
            document.getElementById("submit2").disabled = true;
            document.getElementById("ic2").style.borderColor = "#d32f2f"
        }
        else{
            document.getElementById("empty2").style.display = "none"
            if(mobileRegex(userInput) == ""){
                document.getElementById("wrong2").style.display = "block"
                document.getElementById("submit2").disabled = true;
                document.getElementById("ic2").style.borderColor = "#d32f2f"    
            }
            else{
                document.getElementById("wrong2").style.display = "none"
                document.getElementById("submit2").disabled = false;
                document.getElementById("ic2").style.borderColor = "rgb(51, 213, 45)"
            }
        }
    }

    countDown(){
        let timer = document.getElementById("timer");
        let count = 120;
        let sc = 59;
        let minute = "01";
        let interv = setInterval(() => {
            if(count == 1){
                clearInterval(interv);
            }
            if(count == 60){
                minute = "00"
                sc = 59;
            }
            timer.innerText = String(sc).padStart(2,"0") + " : " + minute
            count--;
            sc--;
        }, 1000);
    }

    async secondResponse(){
        document.getElementById("submit2").innerText = "در حال بررسی";
        document.getElementById("submit2").disabled = true;
        let code = document.getElementById("code").value;

        if(this.state.userCond == "admin" || this.state.userCond == "teacher" || this.state.userCond == "student"){
            let params = {
                "phone" : this.state.userPhone,
                "code" : code,
            }
            const config = {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            const response = await axios.post("http://localhost/api/auth/step2.php",params,config);
            let res = response.data;
            if(res == "wrongCode"){
                document.getElementById("wrongCode").style.display = "block";
                document.getElementById("ic2").style.borderColor = "#d32f2f";
                document.getElementById("submit2").innerText = "بررسی کد";
                document.getElementById("submit2").disabled = false;
            }
            else if (res == "success"){
                if(this.state.userCond == "admin"){
                    window.location.replace('/panel/admin/courses');
                }
                else if(this.state.userCond == "teacher"){
                    window.location.replace('/panel/teacher/courses');
                }
                else if(this.state.userCond == "student"){
                    window.location.replace('/panel/student');
                }
                else if(this.state.userCond == "guest"){
                    
                }
                else{
                    window.location.replace('/');
                }
            }
            else{
                document.getElementById("submit2").innerText = "بررسی کد";
                document.getElementById("submit2").disabled = false;
                document.getElementById("serverError").style.display = "block";
            }
        }
        else if(this.state.userCond == "guest"){
            let params = {
                "name" : this.state.name,
                "mail" : this.state.mail,
                "level" : this.state.level,
                "phone" : this.state.userPhone,
                "code" : code,
            }
            const config = {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            const response = await axios.post("http://localhost/api/auth/step3.php",params,config);
            let res = response.data;
            if(res == "wrongCode"){
                document.getElementById("wrongCode").style.display = "block";
                document.getElementById("ic2").style.borderColor = "#d32f2f";
                document.getElementById("submit2").innerText = "بررسی کد";
                document.getElementById("submit2").disabled = false;
            }
            else if (res == "success"){
                if(this.state.level == 1){
                    window.location.replace('/panel/teacher/courses');
                }
                else if(this.state.level == 2){
                    window.location.replace('/panel/student');
                }
                else{
                    window.location.replace('/');
                }
            }
            else{
                document.getElementById("submit2").innerText = "بررسی کد";
                document.getElementById("submit2").disabled = false;
                document.getElementById("serverError").style.display = "block";
            }
        }
    }

    async firstResponse(){
        let phone = document.getElementById("phone").value;
        document.getElementById("submit").innerText = "در حال بررسی";
        document.getElementById("submit").disabled = true;
        let params = {
            "phone" : phone
        }
        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        const response = await axios.post("http://localhost/api/auth/step1.php",params,config);
        let res = response.data
        this.setState({userPhone : phone})
        if(res == "guest"){
            document.getElementById("stage1").style.display = "none";
            document.getElementById("registerForm").style.display = "block";
            this.setState({userCond : "guest"});
        }
        else if(res == "admin" || res == "student" || res == "teacher"){
            document.getElementById("stage1").style.display = "none";
            document.getElementById("stage2").style.display = "block";
            document.getElementById("submit2").innerText = "ورود به پنل";
            document.getElementById("welcome").innerText = "کاربر عزیز خوش آمدید. لطفا کد ارسال شده به موبایل خود را وارد کنید.";
            this.setState({userCond : res});
            this.countDown();
        }
        else{
            document.getElementById("submit").innerText = "ثبت و ادامه";
            document.getElementById("submit").disabled = false;
            document.getElementById("serverError").style.display = "block";
        }
    }

    updateGuest(name,mail,level){
        this.setState({
            name : name ,
            mail : mail ,
            level : level ,
        });
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("stage2").style.display = "block";
        document.getElementById("submit2").innerText = "تکمیل ثبت نام";
        document.getElementById("welcome").innerText = "میهمان گرامی، جهت تکمیل ثبت نام، کد ارسال شده به موبایل خود را وارد کنید.";
        this.countDown();
    }

    
    render() { 
        if(this.state.loading == true){
            return <Loading title = "ورود / ثبت نام" />
        }
        return (
            <div>
                <Head>
                    <title>خرد پرور | ورود / ثبت نام</title>
                    <meta name="description" content="ورود / ثبت نام | خرد پرور" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className={styles.main}>
                    <div id='stage1' className={styles.card}>
                        <h2>ورود | ثبت نام</h2>
                        <h5>سلام !</h5>
                        <h5>جهت ورود یا ثبت نام، شماره موبایل خود را وارد کنید.</h5>
                        <div>
                            <div id='ic1' className={styles.input_container}>
                                <input type="text" id='phone' autoComplete="off" placeholder='09xxxxxxxxx' onInput={() => this.checkPhoneField()} onBlur={() => this.checkPhoneField()} />
                            </div>
                            <p id='empty' className={styles.error} >لطفا این قسمت را خالی نگذارید !</p>
                            <p id='wrong' className={styles.error} >شماره موبایل نادرست است !</p>
                            <p id='serverError' className={styles.error} >ارور در سمت سرور !</p>
                        </div>
                        <div className={styles.button_container}>
                            <button id='submit' onClick={() => this.firstResponse()} className={styles.submit} >ثبت و ادامه</button>
                        </div>
                    </div>
                    <div id='stage2' className={styles.card}>
                        <h2>کد تایید</h2>
                        <h5 id='welcome'>لطفا کد ارسال شده به موبایل خود را وارد کنید.</h5>
                        <h5>زمان باقی مانده تا ارسال مجدد : <span id='timer' className={styles.timer}>00 : 02</span></h5>
                        <div>
                            <div id='ic2' className={styles.input_container}>
                                <input type="text" id='code' autoComplete="off" onInput={()=>this.checkCodeField()} onBlur={()=>this.checkCodeField()} />
                            </div>
                            <p id='empty2' className={styles.error} >لطفا این قسمت را خالی نگذارید !</p>
                            <p id='wrong2' className={styles.error} >کد تایید شش رقم است !</p>
                            <p id='wrongCode' className={styles.error} >کد وارد شده صحیح نمیباشد !</p>
                            <p id='serverError' className={styles.error} >ارور در سمت سرور !</p>
                        </div>
                        <div className={styles.button_container}>
                            <button id='submit2' onClick={() => this.secondResponse()} className={styles.submit} >ثبت و ادامه</button>
                        </div>
                    </div>
                    <RegisterForm updateGuest = {this.updateGuest} userPhone={this.state.userPhone} />
                </main>
            </div>
        );
    }
}
 
export default Login;