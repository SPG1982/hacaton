import React, {useEffect} from 'react';
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";

const Form = (props) => {
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

                    {props.crime.sposob
                        ?
                        <div className="crimeText" style={{color: 'blue'}}>{'В отдел полиции обратился(лась) гр. ' + props.crime.fio + ' с заявлением о том, что ' + props.crime.date + ' года примерно в ' + props.crime.time + ' неизвестное лицо совершило ' + props.crime.sposobText + ' и похитило ' + props.crime.predmet + '. Информация о способе: '+ props.crime.sposob + '. Общая сумма ущерба составила: ' + props.crime.summ + '. Медицинская помощь заявителю: ' + ((!props.crime.life || props.crime.life == 'не требуется' || props.crime.life == 'нет') ? ' не требуется' : ' требуется') + '.'}</div>
                        :
                        <div className="crimeText">
                            В данном окне будет формироваться краткая информация о происшествии (ориентировка). В
                            зависимости от показаний будет квалифицироваться статья УК РФ.
                        </div>
                    }

                    {props.crime.fio && !props.crime.sposob && <div className="crimeText" style={{color: 'red', fontWeight: 'bold'}}>Идет анализ ответов. Полученной информации пока недостаточно для квалификации</div>}

                </div>
            </div>
        </>
    )
}

export default Form

