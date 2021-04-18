import React, {useState} from 'react';
import {Modal, Button} from "antd";

export const ModalInfo = (props) => {
    const modalClose = () => {
        props.setModalInfo(false)
    }

    return (
        <>
            <Modal
                title="СРОЧНАЯ ИНФОРОМАЦИЯ !!!"
                // maskTransitionName=""
                transitionName=""
                bodyStyle={{padding: '20px'}}
                visible={props.modalInfo}
                width="50%"
                maskClosable={false}
                //onOk={modalClose}
                onCancel={modalClose}
                footer={null}
                destroyOnClose={true}
            >

                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button style={{margin: '10px auto', display: 'inline-block', textAlign: 'center', width: 'auto'}}
                            type="primary"
                            onClick={() => {
                                modalClose()
                            }}>
                        Закрыть
                    </Button>
                </div>
            </Modal>
        </>
    )
}