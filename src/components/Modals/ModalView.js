import React, {useState} from 'react';
import {Modal, Button} from "antd";

export const ModalView = (props) => {
    const modalClose = () => {
        props.setModal(false)
    }

    return (
        <>
            <Modal
                title="СРОЧНАЯ ИНФОРОМАЦИЯ !!!"
                // maskTransitionName=""
                transitionName=""
                bodyStyle={{padding: '20px'}}
                visible={props.modal}
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