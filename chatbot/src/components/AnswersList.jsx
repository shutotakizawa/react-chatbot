import React from 'react'
import { Answer } from './index'

const AnswersList = (props) => {
    return (
        <div className='c-grid__answer'>
            {props.answers.map((val, i) => {
                return <Answer content={val.content} nextId={val.nextId} select={props.select} key={i.toString()}/>
            })}
        </div>
    )
}

export default AnswersList