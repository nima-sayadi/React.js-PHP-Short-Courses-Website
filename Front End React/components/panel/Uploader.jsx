import React, { Component } from 'react';
import styles from '@/styles/panel/Uploader.module.css'

class Uploader extends Component {

    setFile(event){
        if(event.target.files[0]){
            if(event.target.files[0].type.startsWith("image/")){
                this.props.getImage(event.target.files[0]);
                event.target.parentElement.firstChild.lastChild.innerHTML = `&nbsp;&nbsp;عکس انتخاب شد : ${event.target.files[0].name}`;
            }
            else {
                event.target.parentElement.firstChild.lastChild.innerHTML = `&nbsp;&nbsp;تنها فرمت عکس مجاز است !`;
            }
        }
        else{
            event.target.parentElement.firstChild.lastChild.innerHTML = `&nbsp;&nbsp;عکس انتخاب <h3>نشد</h3> !`;
        }
    }
    render() { 
        return (
            <div className={styles.container}>
                <label htmlFor="file-upload">
                    <i className="fa fa-cloud-upload"></i>
                    <span>&nbsp;&nbsp;{this.props.title}</span>
                </label>
                <input type="file" accept="image/png,image/jpeg"  id="file-upload" onChange={(event)=>this.setFile(event)} />
            </div>
        );
    }
}
 
export default Uploader;