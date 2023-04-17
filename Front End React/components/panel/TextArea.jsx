import React, { Component } from 'react';
import styles from '@/styles/panel/TextArea.module.css'

class TextArea extends Component {

    borderColor(){
        if(this.props.emptyCheck == "true"){
            if(document.querySelector("#" + this.props.id).value == ""){
                document.querySelector("#" + this.props.id).parentElement.classList.remove(styles.correct);
                document.querySelector("#" + this.props.id).parentElement.classList.add(styles.error);
            }
            else{
                document.querySelector("#" + this.props.id).parentElement.classList.remove(styles.error);
                document.querySelector("#" + this.props.id).parentElement.classList.add(styles.correct);
            }
        }
    }
    addStar(){
        if(this.props.emptyCheck == "true"){
            return "*";
        }
    }
    render() { 
        return (
            <div className={styles.wrapper}>
                <p><b>{this.props.title} {this.addStar()}</b></p>
                <div className={styles.container}>
                    <textarea id={this.props.id} onBlur={()=>this.borderColor()} onInput={()=>this.borderColor()} ></textarea>
                </div>
            </div>
        );
    }
}
 
export default TextArea;