import React, {useEffect} from 'react';
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import Header from "../../components/Header/Header";
import {Layout} from "antd";
import styles from './styles.module.css'
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";


const Main = (props) => {
    return (
        <>
            <div className={styles.wrapper}>
                <div style={{border: '0px solid black', paddingRight: '20px', marginBottom: '80px'}}>
                    <h2 style={{textAlign: 'center'}}>ГЛАВНАЯ СТРАНИЦА</h2>
                    <div style={{textAlign: 'justify', fontSize: '20px'}}>
                        <div><span style={{fontWeight: 'bold'}}>Цель проекта. </span>Мы .....
                        </div>
                        <div><span style={{fontWeight: 'bold'}}>Ограничения. </span>......
                        </div>
                        <div><span style={{fontWeight: 'bold'}}>Возможности. </span>.......
                        </div>
                        <div><span style={{fontWeight: 'bold'}}>Развитие. </span>......
                        </div>
                        <br></br>
                        <div><span style={{fontWeight: 'bold'}}>Вопросы. </span>Если у вас возникли вопросы по работе
                            сервиса вы можете нас спросить об этом на <span style={{fontWeight: 'bold'}}>странице формы
                                обратной связи. </span>Также ждем от Вас предложений, пожеланий и жалоб...
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const MainContainer = (props) => {
    const {Content} = Layout;
    return (
        <>
            <Header/>
            <Layout style={{height: `calc(100vh - 50px)`}}>
                <LeftSidebar {...props}/>
                <Layout>
                    <Content style={{margin: '0 16px'}}>
                        <Main/>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

let mapStateToProps = (state) => {
    return {
        app: state.app,
    }
}

let mapDispatchToPropsLite =
    {}

export default compose(
    connect(mapStateToProps, mapDispatchToPropsLite),
    withRouter
)(MainContainer)


