import React, {useEffect, useRef, useState} from 'react';
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import upk from '../../../../../src/assets/images/upk.jpg'
import dej from "../../../../assets/images/dej.jpg";

const Dialog = (props) => {

    let refDialog = useRef()

useEffect(()=> {
    refDialog.current.scrollTo(0, 99999);
}, [props])


    return (
        <>
            <div style={{width: '95%', margin: 'auto'}}>
                <h2 style={{textAlign: 'center'}}>Диалог с дежурным</h2>
                <div id='dialog' ref={refDialog} style={{
                    // backgroundColor: 'rgba(255,255,0,0.5)',
                    // backgroundImage: `url(${upk})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    // height: '300px',
                    width: '100%',
                    border: '1px solid black',
                    maxHeight: '400px', overflowY: 'auto'
                }}>


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