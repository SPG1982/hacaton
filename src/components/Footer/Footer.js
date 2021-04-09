import React from 'react';
import styles from './styles.module.css';

const Footer = (props) => {
    return (
        <div className={'bg-dark'}>
            <div className={styles.wrapper}>
                Автоматизированный прием сообщения о преступлении. Все права зарегистрированы.
            </div>
        </div>
    );
}

export default Footer;
