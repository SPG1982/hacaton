import React, {useState} from 'react';
import {Modal, Button} from "antd";

export const ModalInfo = (props) => {
    const modalClose = () => {
        props.setModalInfo(false)
    }

    return (
        <>
            <Modal
                //title="СРОЧНАЯ ИНФОРОМАЦИЯ !!!"
                title="Рекомендации по выбору наряда"
                // maskTransitionName=""
                transitionName=""
                bodyStyle={{padding: '20px'}}
                visible={props.modalInfo}
                width="80%"
                maskClosable={false}
                //onOk={modalClose}
                onCancel={modalClose}
                footer={null}
                destroyOnClose={true}
            >
                <div style={{textAlign: 'center'}}>
                    <h2>{props.warningText}</h2>
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