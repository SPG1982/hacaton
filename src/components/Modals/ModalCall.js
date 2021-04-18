import React, {useState} from 'react';
import {Modal, Button} from "antd";

export const ModalCall = (props) => {
    const modalClose = () => {
        props.setModalCall(false)
    }

    return (
        <>
            <Modal
                title="Входящий ЗВОНОК"
                // maskTransitionName=""
                transitionName=""
                bodyStyle={{padding: '20px'}}
                visible={props.modalCall}
                width="80%"
                maskClosable={false}
                //onOk={modalClose}
                onCancel={modalClose}
                footer={null}
                destroyOnClose={true}
            >

                <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center'}}>
                    <div>
                        <h2>{props.text}</h2>
                    </div>
                    <div>
                        <Button style={{margin: '10px auto', display: 'inline-block', textAlign: 'center', width: 'auto'}}
                                type="danger"
                                onClick={() => {props.acceptCall()}}>
                            ПРИНЯТЬ ЗВОНОК
                        </Button>
                    </div>

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