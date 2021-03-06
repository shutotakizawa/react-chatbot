import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Chat } from './index'

const useStyles = makeStyles(() => (
    createStyles({
        'chats': {
            height: 400,
            padding: 0,
            overflow: 'auto',
        }
    })
));

const Chats = (props) => {
    const classes = useStyles()
    return (
        <List className={classes.chats} id={'scroll-area'}>
            {props.chats.map((val, i) => {
                return <Chat text={val.text} type={val.type} key={i.toString()}/>
            })}
        </List>
    )
}

export default Chats