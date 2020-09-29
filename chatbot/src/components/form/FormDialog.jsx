import React, { useState, useCallback } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextInput } from '../index'

const FormDialog = (props) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [description, setDescription] = useState('')

	const inputName = useCallback(event => {
		setName(event.target.value)
	})

	const inputEmail = useCallback(event => {
		setEmail(event.target.value)
	})

	const inputDescription = useCallback(event => {
		setDescription(event.target.value)
	})

    const submitForm = () => {
        const name = this.state.name
        const email = this.state.email
        const description = this.state.description

        const payload = {
            text: `
                お問い合わせがありました。
                お名前: ${name}
                Email: ${email}
                内容: ${description}
            `
        }

        // ここにスラックのURL
        const url = ''

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload)
        })
        .then(() => {
            alert('完了')
            this.setState({
                name: '',
                email: '',
                description: '',
            })
            return this.props.handleClose()
        })
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">お問合せフォーム</DialogTitle>
            <DialogContent>
                <TextInput
                    label={'お名前'}
                    multiline={false}
                    rows={1}
                    value={name}
                    type={'text'}
                    obChange={inputName}
                />
                <TextInput
                    label={'メールアドレス'}
                    multiline={false}
                    rows={1}
                    value={email}
                    type={'email'}
                    obChange={inputEmail}
                />
                <TextInput
                    label={'お問い合わせ内容'}
                    multiline={true}
                    rows={5}
                    value={description}
                    type={'text'}
                    obChange={inputDescription}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    キャンセル
                </Button>
                <Button onClick={submitForm} color="primary" autoFocus>
                    送信
                </Button>
            </DialogActions>
        </Dialog>
    )
}

//export default class FormDialog extends React.Component {
//
//    constructor (props) {
//        super(props)
//        this.state = {
//            name: '',
//            email: '',
//            description: '',
//        }
//        this.inputName = this.inputName.bind(this)
//        this.inputEmail = this.inputEmail.bind(this)
//        this.inputDescription = this.inputDescription.bind(this)
//    }
//
//    inputName (event) {
//        this.setState({
//            name: event.target.value
//        })
//    }
//    inputEmail (event) {
//        this.setState({
//            email: event.target.value
//        })
//    }
//    inputDescription (event) {
//        this.setState({
//            description: event.target.value
//        })
//    }
//}

export default FormDialog