import React, {useEffect} from 'react';
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";

const Form = (props) => {
// console.log(props)
    return (
        <>
            <div style={{width: '95%', height: '', margin: 'auto'}}>
                <h2 style={{textAlign: 'center'}}>Ориентировка</h2>
                {props.predSostav && <h3 style={{textAlign: 'center'}}>Предварительная квалификация: <span style={{backgroundColor: 'red', color:'white', padding: '3px'}}>{props.predSostav}</span></h3>}
                <div style={{padding: '5px', border: '1px solid black', width: '100%', height: '', fontSize: '18px', textAlign: 'justify'}}>
                    В данном окне будет формироваться краткая информация о происшествии (ориентировка). В зависимости от показаний будет квалифицироваться статья УК РФ.
                </div>
            </div>
        </>
    )
}

export default Form

