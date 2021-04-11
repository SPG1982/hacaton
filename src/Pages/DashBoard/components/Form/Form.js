import React, {useEffect} from 'react';
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";

const Form = (props) => {

    return (
        <>
            <div style={{width: '95%', height: '400px', margin: 'auto'}}>
                <h2 style={{textAlign: 'center'}}>Итоговая форма</h2>
                <div style={{border: '1px solid black', width: '100%', height: '100%'}}>
                    В РАЗРАБОТКЕ
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


