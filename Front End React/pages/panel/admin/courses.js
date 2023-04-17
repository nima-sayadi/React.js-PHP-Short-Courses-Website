import React, { Component } from 'react';
import Head from "next/head";
import common from '@/styles/panel/Common.module.css'
import AccessDenied from '@/components/panel/AccessDenied';
import Loading from '@/components/panel/Loading';
import Header from '@/components/panel/Header';
import Menu from '@/components/panel/menu/Admin';
import Table from '@/components/panel/Table';
import { checkLogin } from '@/utils/checkLogin';
import { getUserInfo } from '@/utils/getUserInfo';

class courses extends Component {
    state = { 
        userLoggedIn : false,
        loading : true
    } 
    componentDidMount() {
        checkLogin().then(response=>{
            if(response){
                getUserInfo().then(response2=>{
                    let level = response2.level;
                    if(level == "0"){
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
                        <Table type = "courses-admin" />
                    </div>
                    <Menu />
                </div>
            </div>
        );
    }
}
 
export default courses;