import React, {useEffect} from 'react';
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";

const Form = (props) => {
// console.log(props)





    useEffect(()=> {
        let text = document.querySelector('.crimeText')
        console.log(text.innerHTML)
        props.setWarning(text.innerHTML)
    }, [props.crime])

    return (
        <>
            <div style={{width: '95%', height: '', margin: 'auto'}}>
                <h2 style={{textAlign: 'center'}}>Ориентировка</h2>
                {props.predSostav && <h2 style={{textAlign: 'center'}}>Предварительная квалификация: <span style={{
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '3px',
                    fontSize: '24px'
                }}>
                    {props.predSostav}</span></h2>}
                <div style={{
                    padding: '5px',
                    border: '1px solid black',
                    width: '100%',
                    height: '',
                    fontSize: '18px',
                    textAlign: 'justify'
                }}>

                    {props.crime.fio
                        ?
                        <div className="crimeText">{'В отдел полиции обратился(лась) гр. ' + props.crime.fio + ' с заявлением о том, что ' + props.crime.date + ' года примерно в ' + props.crime.time + '...'}</div>
                        :
                        <div className="crimeText">В данном окне будет формироваться краткая информация о происшествии (ориентировка). В
                            зависимости от показаний будет квалифицироваться статья УК РФ.
                        </div>
                    }

                </div>
            </div>
        </>
    )
}

export default Form

