import React from 'react';
import defaultDetaset from './dataset'
import './assets/css/style.css'
import { AnswersList } from './components/index'

export default class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            answers: [],
            chats: [],
            currentId: 'init',
            dataset: defaultDetaset,
            open: false,
        }
    }

    initAnswer () {
        const initDetaset = this.state.dataset[this.state.currentId]
        const initAnswers = initDetaset.answers
        this.setState({
            answers:initAnswers,
        })
    }

    componentDidMount () {
        this.initAnswer()
    }

    render () {
        return (
            <div className='c-section'>
                <div className='c-box'>
                    <AnswersList answers={this.state.answers}/>
                </div>
            </div>
        )
    }
}
