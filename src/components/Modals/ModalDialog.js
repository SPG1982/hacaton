import React, {useState} from 'react';
import {Modal, Button} from "antd";

export const ModalDialog = (props) => {
    //console.log(props)
    const modalClose = () => {
        props.setModalDialog(false)
    }

    return (
        <>
            <Modal
                title="ДИАЛОГ"
                // maskTransitionName=""
                transitionName=""
                bodyStyle={{padding: '20px'}}
                visible={props.modalDialog}
                width="60%"
                maskClosable={false}
                //onOk={modalClose}
                onCancel={modalClose}
                footer={null}
                destroyOnClose={true}
            >

                <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center'}}>
                    <div>
                        <h3 style={{padding: '3px', backgroundColor: 'blue', color: 'white'}}>Кратко расскажите что случилось...</h3>
                    </div>
                    <h2 style={{minHeight: '300px', border: '1px solid blue', textAlign: 'justify'}}>
                        <span>Показания: </span> {props.lastAnswer}
                    </h2>

                    <h3>
                        После рассказа скажите "Ответ закончен" для перехода к следующему вопросу
                    </h3>

                    <div>
                        <Button style={{margin: '10px auto', display: 'inline-block', textAlign: 'center', width: 'auto'}}
                                type="primary"
                                onClick={() => {
                                    modalClose()
                                }}>
                            Закрыть
                        </Button>
                    </div>


                </div>
            </Modal>
        </>
    )
}