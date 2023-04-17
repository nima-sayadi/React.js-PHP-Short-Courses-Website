import React, { Component } from 'react';
import styles from '@/styles/panel/Table.module.css';
import Link from 'next/link';

class Table extends Component {

    state = {
        canDelete : true,
        title : null
    }

    componentDidMount() {
        this.titles();
    }

    titles(){
        if(this.props.type == "courses-teacher"){
            this.setState({title : "لیست دوره ها"})
        }
        else if(this.props.type == "tests-teacher") {
            this.setState({title : "لیست آزمون ها"})
        }
        else if(this.props.type == "newTest"){
            this.setState({title : "لیست سوالات وارد شده"})
        }
        else if(this.props.type == "students") {
            this.setState({title : "لیست دانش آموزان"})
        }
        else if(this.props.type == "courses-admin") {
            this.setState({title : "لیست دوره ها"})
        }
        else if(this.props.type == "tests-admin") {
            this.setState({title : "لیست آزمون ها"})
        }
        else if(this.props.type == "certifications-admin"){
            this.setState({title : "لیست گواهی ها"})
        }
        else if(this.props.type == "users") {
            this.setState({title : "لیست کاربران"})
        }
    }

    setHeader(){
        if(this.props.type == "courses-teacher"){
            return (
                <tr>
                    <th>آی دی</th>
                    <th>عنوان</th>
                    <th>طول دوره</th>
                    <th>زمان برگزاری</th>
                </tr>
            );
        }
        else if(this.props.type == "tests-teacher") {
            return (
                <tr>
                    <th>آی دی</th>
                    <th>عنوان</th>
                    <th>تاریخ آزمون</th>
                    <th>نمره آزمون</th>
                </tr>
            );
        }
        else if(this.props.type == "newTest"){
            this.title = "لیست سوالات وارد شده";
            return (
                <tr>
                    <th>شماره</th>
                    <th>صورت سوال</th>
                    <th>گ 1</th>
                    <th>گ 2</th>
                    <th>گ 3</th>
                    <th>گ 4</th>
                    <th>عکس</th>
                    <th>نمره</th>
                    <th>عملیات</th>
                </tr>
            );
        }
        else if(this.props.type == "students") {
            return (
                <tr>
                    <th>آی دی</th>
                    <th>نام و نام خانوادگی</th>
                    <th>شماره موبایل</th>
                    <th>دوره ثبت نامی</th>
                </tr>
            );
        }
        else if(this.props.type == "courses-admin") {
            this.title = "لیست دوره ها";
            return (
                <tr>
                    <th>آی دی</th>
                    <th>عنوان</th>
                    <th>مدرس</th>
                    <th>طول دوره</th>
                    <th>زمان برگزاری</th>
                    <th>وضعیت</th>
                    <th>عملیات</th>
                </tr>
            );
        }
        else if(this.props.type == "tests-admin") {
            this.title = "لیست آزمون ها";
            return (
                <tr>
                    <th>آی دی</th>
                    <th>دوره مربوطه</th>
                    <th>مدرس</th>
                    <th>زمان برگزاری</th>
                    <th>وضعیت</th>
                    <th>عملیات</th>
                </tr>
            );
        }
        else if(this.props.type == "certifications-admin"){
            this.title = "لیست گواهی ها";
            return (
                <tr>
                    <th>آی دی</th>
                    <th>دوره مربوطه</th>
                    <th>مدرس</th>
                    <th>دانش آموز</th>
                    <th>عملیات</th>
                </tr>
            );
        }
        else if(this.props.type == "users") {
            this.title = "لیست کاربران";
            return (
                <tr>
                    <th>آی دی</th>
                    <th>نام و نام خانوادگی</th>
                    <th>شماره موبایل</th>
                    <th>ایمیل</th>
                    <th>سطح کاربری</th>
                    <th>عملیات</th>
                </tr>
            );
        }
    }
    deleteRow(e){
        if(this.props.type == "newTest"){
            let i = Number(e.target.parentElement.parentElement.firstChild.innerText) - 1;
            let arr = this.props.data;
            arr.splice(i,1);
            this.props.updateDeleted(arr)
        }
    }
    setRows(){
        if(this.props.type == "newTest"){
            const data = this.props.data;
            return(
                <tbody>
                    {data.map((item,index)=>(
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td className={styles.newTestQ}>{item[0]}</td>
                            <td>{item[1]}</td>
                            <td>{item[2]}</td>
                            <td>{item[3]}</td>
                            <td>{item[4]}</td>
                            <td>{item[5]}</td>
                            <td>{item[6] ? "دارد" : "ندارد"}</td>
                            <td><button onClick={(e)=>this.deleteRow(e)} className={styles.delete}>حذف کردن</button></td>
                        </tr>
                    ))}
                </tbody>
            );
        }
        else if (this.props.type == "courses-teacher"){
            const data = this.props.data;
            return(
                <tbody>
                    {data.map((item,index)=>(
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>از {item.from_date} الی {item.to_date}</td>
                            <td>
                            {item.days.map((m,n)=>(
                                <span key={n}>
                                    {m}
                                    <br />
                                </span>
                            ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            );
        }
        else if (this.props.type == "students"){
            const data = this.props.data;
            return(
                <tbody>
                    {data.map((item,index)=>(
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.title}</td>
                        </tr>
                    ))}
                </tbody>
            );
        }
        else if (this.props.type == "tests-teacher"){
            const data = this.props.data;
            return(
                <tbody>
                    {data.map((item,index)=>(
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.start_date}</td>
                            <td>{item.points}</td>
                        </tr>
                    ))}
                </tbody>
            );
        }
    }
    handleButton(){
        if(this.props.type == "courses-teacher"){
            return <Link href="/panel/teacher/courses/new">افزودن دوره جدید</Link>;
        }
        else if(this.props.type == "tests-teacher"){
            return <Link href="/panel/teacher/tests/new">افزودن آزمون جدید</Link>;
        }
        else{
            return null;
        }
    }

    handleNavigation(e){
        this.props.handleNav(e.target.innerText);
    }

    navigation(){
        if(this.props.noNav == "true"){
            return null;
        }
        else{
            const btns = [];
            btns.push(<Link key={"first"} onClick={(e)=>this.handleNavigation(e)} href="#" >صفحه اول</Link>);
            for(let i =0;i<this.props.pages;i++){
                if(this.props.page == i +1){
                    btns.push(
                        <Link onClick={(e)=>this.handleNavigation(e)} key={i} className={styles.active} href="#" >{i + 1}</Link>
                    );
                }
                else{
                    btns.push(
                        <Link onClick={(e)=>this.handleNavigation(e)} key={i} href="#" >{i + 1}</Link>
                    );
                }
            }
            btns.push(<Link key={"last"} onClick={(e)=>this.handleNavigation(e)} href="#" >صفحه آخر</Link>);
            return(
                <div className={styles.navigation_container}>
                    {btns}
                </div>
            );
        }
    }

    render() { 
        return (
            <div className={styles.card}>
                <div className={styles.header}>
                    <h2>{this.state.title}</h2>
                    {this.handleButton()}
                </div>
                <hr />
                <table className={styles.table}>
                    <thead>
                        {this.setHeader()}
                    </thead>
                    {this.setRows()}
                </table>
                {this.navigation()}
            </div>
        );
    }
}
 
export default Table;