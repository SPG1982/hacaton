import React, {useEffect} from 'react';
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";

const Form = (props) => {

    return (
        <>
            <div style={{width: '95%', height: '', margin: 'auto'}}>
                <h2 style={{textAlign: 'center'}}>Ориентировка</h2>
                <div style={{padding: '5px', border: '1px solid black', width: '100%', height: '', fontSize: '18px', textAlign: 'justify'}}>
                    В данном окне будет формироваться краткая информация о происшествии (ориентировка). В зависимости от показаний будет квалифицироваться статья УК РФ.
                </div>
            </div>
        </>
    )
}


const Container = (props) => {

    return (
        <>
            <Form/>
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
)(Container)


