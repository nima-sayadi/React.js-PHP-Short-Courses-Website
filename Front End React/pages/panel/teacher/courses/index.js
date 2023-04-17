import React, { Component } from 'react';
import Head from "next/head";
import common from '@/styles/panel/Common.module.css'
import AccessDenied from '@/components/panel/AccessDenied';
import Loading from '@/components/panel/Loading';
import Header from '@/components/panel/Header';
import Menu from '@/components/panel/menu/Teacher';
import Table from '@/components/panel/Table';
import { checkLogin } from '@/utils/checkLogin';
import { getUserInfo } from '@/utils/getUserInfo';
import axios from 'axios';

class courses extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            userLoggedIn : false,
            loading : true,
            data : null,
            currentData : [],
            page : 1,
            pages : null,
        }
        this.handleNavigation = this.handleNavigation.bind(this);
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
            let data = response.data;
            let currentData = [];
            let pages;
            if(data.length > 6){
                pages = Math.ceil(data.length / 6);
                for(let i = 0;i<=5;i++){
                    currentData.push(data[i]);
                }
            }
            else{
                pages = 1;
                currentData = data;
            }
            this.setState({
                currentData : currentData,
                pages : pages,
            })
        });
    }

    handleNavigation(requestedPage){
        let data = this.state.data;
        let currentData = [];
        let pageIndexfirst,pageIndexlast;

        if(requestedPage == "صفحه اول"){
            if(data.length > 6){
                for(let i = 0;i<=5;i++){
                    currentData.push(data[i]);
                }
            }
            else{
                currentData = data;
            }
            this.setState({
                page : 1,
                currentData : currentData,
            })
        }
        else if(requestedPage == "صفحه آخر"){
            if(data.length > 6){
                pageIndexfirst = ((this.state.pages - 1) * 6) - 1;
                pageIndexlast = data.length - 1;
                for(let i = pageIndexfirst;i<=pageIndexlast;i++){
                    currentData.push(data[i]);
                }
            }
            else{
                currentData = data;
            }
            this.setState({
                page : this.state.pages,
                currentData : currentData,
            })
        }
        else {
            let page = Number(requestedPage)
            if(data.length > 6){
                if(page == 1){
                    for(let i = 0;i<=5;i++){
                        currentData.push(data[i]);
                    }
                }
                else{
                    pageIndexfirst = ((page - 1) * 6) - 1;
                    pageIndexlast = data.length - 1;
                    for(let i = pageIndexfirst;i<=pageIndexlast;i++){
                        currentData.push(data[i]);
                    }
                }
            }
            else{
                currentData = data;
            }
            this.setState({
                page : page,
                currentData : currentData,
            })
        }
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
                        <Table data = {this.state.currentData} pages={this.state.pages} page={this.state.page} 
                        handleNav = {this.handleNavigation} type = "courses-teacher" />
                    </div>
                    <Menu />
                </div>
            </div>
        );
    }
}
 
export default courses;