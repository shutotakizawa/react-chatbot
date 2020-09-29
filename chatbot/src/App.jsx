import React, { useState, useEffect, useCallback } from 'react';
import defaultDetaset from './dataset'
import './assets/css/style.css'
import { AnswersList, Chats, FormDialog } from './components/index'
import { db } from './firebase/index'

const App = () => {
	const [answers, setAnswers] = useState([])
	const [chats, setChats] = useState([])
	const [currentId, setCurrentId] = useState('init')
	const [dataset, setDataset] = useState({})
	const [open, setOpen] = useState(false)

	const displayNextQuestion = (nextQuestionId, nextDataset) => {
		addChats({
			text: nextDataset.question,
			type: 'question',
		})

		setAnswers(nextDataset.answers)
		setCurrentId(nextQuestionId)
	}

	const selectAnswer = (selectedAnswer, nextQuestionId) => {
		switch (true) {

		case (nextQuestionId === 'contact'):
			handleClickOpen()
			break

		case (/^https:*/.test(nextQuestionId)):
			const a = document.createElement('a')
			a.href = nextQuestionId
			a.target = '_blank'
			a.click()
			break

		default:
			addChats({
				text: selectedAnswer,
				type: 'answer',
			})
			setTimeout(() => {
				displayNextQuestion(nextQuestionId, dataset[nextQuestionId])
			}, 1000)
			break
		}
	}

	const addChats = (chat) => {
		setChats(prevChats => {
			return [...prevChats, chat]
		})
	}

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = useCallback(() => {
		setOpen(false)
	}, [setOpen])

	useEffect(() => {
		(async() => {
			const initDataset = {}
			await db.collection('questions').get().then(res => {
				res.forEach(doc => {
					initDataset[doc.id] = doc.data()
				})
			})

			setDataset(initDataset)
			displayNextQuestion(currentId, initDataset[currentId])
		})()
	}, [])

	useEffect(() => {
		const scrollArea = document.getElementById('scroll-area')
		if (scrollArea) {
			scrollArea.scrollTop = scrollArea.scrollHeight
		}
	})

	return (
        <div className='c-section'>
            <div className='c-box'>
                <Chats chats={chats} />
                <AnswersList answers={answers} select={selectAnswer} />
                <FormDialog open={open} handleClose={handleClose}/>
            </div>
        </div>
	)
}

export default App

//export default class App extends React.Component {
//
//    constructor (props) {
//        super(props)
//        this.state = {
//            answers: [],
//            chats: [],
//            currentId: 'init',
//            dataset: defaultDetaset,
//            open: false,
//        }
//        this.selectAnswer = this.selectAnswer.bind(this)
//        this.handleClickOpen = this.handleClickOpen.bind(this)
//        this.handleClose = this.handleClose.bind(this)
//    }
//
//    displayNextQuestion (nextQuestionId) {
//        const chats = this.state.chats
//        chats.push({
//            text: this.state.dataset[nextQuestionId].question,
//            type: 'question',
//        })
//
//        this.setState({
//            answers: this.state.dataset[nextQuestionId].answers,
//            chats: chats,
//            currentId: nextQuestionId,
//        })
//    }
//
//    selectAnswer (selectedAnswer, nextQuestionId) {
//        switch (true) {
//            case ('init' === nextQuestionId):
//                setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);
//                break
//
//            case (/^httpsL*/.test(nextQuestionId)):
//                const a = document.createElement('a')
//                a.href = nextQuestionId
//                a.target = '_blank'
//                a.click()
//                break
//
//            case ('contact' === nextQuestionId):
//                this.handleClickOpen()
//                break
//
//            default:
//                const chats = this.state.chats
//                chats.push({
//                    text:  selectedAnswer,
//                    type: 'answer',
//                })
//
//                this.setState({
//                    chats: chats,
//                })
//
//                setTimeout(() => {this.displayNextQuestion(nextQuestionId)}, 1000)
//                break
//        }
//    }
//
//    handleClickOpen = () => {
//        this.setState({
//            open: true,
//        })
//    };
//
//    handleClose = () => {
//        this.setState({
//            open: false,
//        })
//    };
//
//    componentDidMount () {
//    	(async() => {
//    		const dataset = this.state.dataset
//    		await db.collection('questions').get().then(res => {
//    			res.forEach(doc => {
//    				dataset[doc.id] = doc.data()
//    			})
//    		})
//    		this.setState({
//    			dataset: dataset,
//    		})
//    	})()
//
//        const initAnswer = ''
//        this.selectAnswer(initAnswer, this.state.currentId)
//    }
//
//    componentDidUpdate () {
//        const scrollArea = document.getElementById('scroll-area')
//        if (scrollArea) {
//            scrollArea.scrollTop = scrollArea.scrollHeight
//        }
//    }
//
//    render () {
//        return (
//            <div className='c-section'>
//                <div className='c-box'>
//                    <Chats chats={this.state.chats} />
//                    <AnswersList answers={this.state.answers} select={this.selectAnswer} />
//                    <FormDialog open={this.state.open} handleClose={this.handleClose}/>
//                </div>
//            </div>
//        )
//    }
//}
