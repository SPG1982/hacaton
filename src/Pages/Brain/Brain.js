import React, {useEffect} from 'react';
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import Header from "../../components/Header/Header";
import {Layout} from "antd";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import * as brain from 'brain.js/src';
import bayes from 'bayes'
import natural from 'natural'

const Brain = (props) => {
// ++++++++++++++++++++++++++++++++++Brain
    // provide optional config object (or undefined). Defaults shown.
    const config = {
        binaryThresh: 0.5,
        hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
        activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
        leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
    };

    // const net = new brain.NeuralNetwork(config);
    const net = new brain.recurrent.LSTM();
    // console.log(net)

    const trainingData = [
        {input: 'кража, украли, похищено, вор, своровали', output: 'кража'},
        {input: 'обманул, доверие, обман', output: 'мошенничество'},
        {input: 'ударил, нанес, бил, грабеж, выхватил, вырвал, угрожал', output: 'грабеж'},
        {input: 'напал, оружие, нож, пистолет, камень', output: 'разбой'},
    ];

    // net.train(trainingData, {
    //     iterations: 40,
    //     log: (details) => console.log(details),
    //     errorThresh: 0.011
    // });

    // let json = JSON.stringify(net.toJSON());
    // let save = ''
    // console.log('JSON ' + json)
    // net.fromJSON(save);
    // console.log(net.run('кража'))

// ++++++++++++++++++++++++++++++++++++++++++++++++++++Bayes
    let classifier = bayes()

    async function f() {
        await classifier.learn('кража, украли, похищено, вор, своровали', 'кража')
        await classifier.learn('ударил, нанес, бил, грабеж, выхватил, вырвал, угрожал', 'грабеж')
        await classifier.learn('напал, оружие, нож, пистолет, камень', 'разбой')

        let r = await classifier.categorize('угрожал')
        //console.log(r)
    }

    f();
// +++++++++++++++++++++++++++++++++++++++++++++++++++Natural
    const PorterStemmerRu = require('../../../node_modules/natural/lib/natural/stemmers/porter_stemmer_ru');
    let classifierN = new natural.BayesClassifier(PorterStemmerRu);
    classifierN.addDocument('кража, украли, похищено, вор, своровали', 'кража');
    classifierN.addDocument('ударил, нанес, бил, грабеж, выхватил, вырвал, угрожал', 'грабеж');
    classifierN.addDocument('напал, оружие, нож, пистолет, камень', 'разбой');
    //classifierN.addDocument('sell gold', 'sell');

    classifierN.train();
    console.log(classifierN.classify('забрал'));
    console.log(classifierN.getClassifications('забрал'));

    return (
        <>
            <div>


            </div>
        </>
    )
}


const MainContainer = (props) => {
    const {Content} = Layout;
    return (
        <>
            <Header/>
            <Layout style={{height: `calc(100vh - 50px)`}}>
                <LeftSidebar {...props}/>
                <Layout>
                    <Content style={{margin: '0 16px'}}>
                        <Brain/>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

let mapStateToProps = (state) => {
    return {
        app: state.app,
    }
}

let mapDispatchToPropsLite =
    {}

export default compose(
    connect(mapStateToProps, mapDispatchToPropsLite),
    withRouter
)(MainContainer)


