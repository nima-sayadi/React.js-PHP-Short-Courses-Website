import React, { Component } from 'react';
import styles from '@/styles/panel/Loading.module.css'
import Image from 'next/image';

class Loading extends Component {
    componentDidUpdate() {
        document.title = this.props.title + " | خرد پرور";
    }
    render() { 
        return (
            <div>
                <div className={styles.container}>
                    <Image className={styles.little_brain} src="/images/logo.png" width={100} height={100} alt='logo' />
                    <h4>در حال بارگذاری</h4>
                </div>
            </div>
        );
    }
}
 
export default Loading;