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
                                <div key={q + i} style={{padding: '5px', fontSize: '20px'}}><span style={{
                                    padding: '3px',
                                    backgroundColor: 'blue',
                                    color: 'white',
                                    fontSize: '20px',
                                    borderRadius: '5px'
                                }}>Вопрос дежурного:</span> {q}</div>
                                {props.answers[i] &&
                                <div key={props.answers[i] + i} style={{padding: '5px', fontSize: '20px'}}><span style={{
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

                    {props.questions.length == 0 &&
                    <div style={{padding: '5px', textAlign: 'justify', fontSize: '18px'}}>В данном окне подробно
                        излагается диалог между заявителем и дежурной частью.</div>}

                </div>
            </div>
        </>
    )
}

export default Dialog