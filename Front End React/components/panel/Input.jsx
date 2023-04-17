import React, { Component, createElement } from 'react';
import styles from '@/styles/panel/Input.module.css'

class Input extends Component {
    
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
        if(this.props.emptyCheck == "true" && this.props.title != null){
            return "*";
        }
    }
    handleButton(){
        let wrapper = document.getElementById(this.props.id).parentElement.parentElement;
        let el = document.createElement("p");
        el.innerText = document.getElementById(this.props.id).value;
        this.props.getValue(document.getElementById(this.props.id).value);
        wrapper.appendChild(el);
    }
    addButton(){
        if(this.props.multiple == "true"){
            return <button onClick={()=>this.handleButton()} className={styles.button}>افزودن</button>
        }
        else{
            return null
        }
    }
    render() { 
        return (
            <div className={styles.wrapper}>
                <p><b>{this.props.title} {this.addStar()}</b></p>
                <div className={styles.container}>
                    <input type={this.props.type} id={this.props.id} onBlur={()=>this.borderColor()}
                    placeholder={this.props.placeholder} onInput={()=>this.borderColor()} autoComplete="off" />
                    {this.addButton()}
                </div>
            </div>
        );
    }
}
 
export default Input;