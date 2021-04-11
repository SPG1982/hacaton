import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";

const Dialog = (props) => {


    return (
        <>
            <div style={{width: '95%', height: '400px', margin: 'auto'}}>
                <h2 style={{textAlign: 'center'}}>Диалог с дежурным</h2>
                <div style={{border: '1px solid black', height: '100%', overflowY: 'auto'}}>


                    {props.questions.map((q, i) => {
                        return (
                            <div key={i}>
                                <div key={q + i} style={{margin: '3px', fontSize: '20px'}}><span style={{
                                    padding: '3px',
                                    backgroundColor: 'blue',
                                    color: 'white',
                                    fontSize: '20px',
                                    borderRadius: '5px'
                                }}>Вопрос дежурного:</span> {q}</div>
                                {props.answers[i] &&
                                <div key={props.answers[i] + i} style={{margin: '3px', fontSize: '20px'}}><span style={{
                                    padding: '3px',
                                    backgroundColor: 'red',
                                    color: 'white',
                                    fontSize: '20px',
                                    borderRadius: '5px'
                                }}>Ответ заявителя:</span> {props.answers[i]}
                                </div>
                                }
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}

export default Dialog