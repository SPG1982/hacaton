import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
import * as brain from 'brain.js/src';
import bayes from 'bayes'
import natural from 'natural'
import * as faceApi from "face-api.js";

const BrainIframe = (props) => {
    //console.log(props.answers)
    const [train, setTrain] = useState(null);
    const [classN, setClassN] = useState(null);


// +++++++++++++++++++++++++++++++++++++++++++++++++++Natural
    const PorterStemmerRu = require('../../../node_modules/natural/lib/natural/stemmers/porter_stemmer_ru');
    let classifierN = new natural.BayesClassifier(PorterStemmerRu);

    // classifierN.addDocument('кража, украли, похищено, вор, своровали', 'кража');
    // classifierN.addDocument('ударил, нанес, бил, грабеж, выхватил, вырвал, угрожал', 'грабеж');
    // classifierN.addDocument('напал, оружие, нож, пистолет, камень', 'разбой');
    // classifierN.addDocument('напал, оружие, нож, пистолет, камень', 'мошенничество');
    // classifierN.addDocument('напал, оружие, нож, пистолет, камень', 'вымогательство');
    // classifierN.addDocument('sell gold', 'sell');
    //
    // classifierN.train();
    // console.log(classifierN.classify('напал'));
    // console.log(classifierN.getClassifications('бил'));

    useEffect(() => {
        async function loadTexts() {
            const crimes = ['orkaz', 'theft', 'grabej', 'ugon', 'razboi']

            const fetchText = (crime, i) => fetch(process.env.PUBLIC_URL + '/texts/' + crime + '/' + i + '.txt')
                .then((response) => {
                    return response.text()
                })

            let text = [];

            function readFiles() {
                return Promise.all(
                    crimes.map(async crime => {
                        text[crime] = ''
                        for (let i = 1; i <= 1; i++) {
                            const words = await fetchText(crime, i);
                            text[crime] += words
                        }
                        // console.log(text[crime])
                        classifierN.addDocument(text[crime], crime);
                    })
                )
            }

            const reader = await readFiles();
            setTrain(true)
            classifierN.train();
            // console.log(classifierN)
            setClassN(classifierN)
            //console.log(classifierN.getClassifications('лдррдло'));
            //console.log(classifierN.classify('лдррдло'));

        }
        loadTexts()
    }, [])


    useEffect(() => {
        if (props.answers.length == 5) {
            console.log('Квалификация...')
            console.log(props.answers[4])
            //console.log(classN);
            props.setPredSostav(classN.classify(props.answers[4]))
        }
    }, [props.answers])


    return (
        <>
            <div>


            </div>
        </>
    )
}


export default BrainIframe


