import React from 'react';
import {connect} from "react-redux";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import "./style.scss";

class Register extends React.Component {

    static async getInitialProps({ locale, lang}) {
        return {locale, lang}
    }

    constructor(props) {
        super(props)
        this.dispatchHandler = this.props.dispatchHandler.bind(this)
    }

    state = {
        email: '',
        password: '',
        re_password: ''
    }

    handleChange = (e,type) => this.setState({ [type]: e.target.value });

    addAccount = e => {
        e.preventDefault();
        const { dispatch } = this.props;
        const { email, password } = this.state;
        dispatch({
            type: 'add_account',
            payload: { email, password }
        })
        dispatch({
            type: 'component',
            payload: 'login'
        })
    }

    render() {
        const { locale } = this.props.reducer;
        const {email, password, re_password} = this.state;

        return (
            <Form className="register" onSubmit={this.addAccount}>
                <div className="register-container">
                    <h4>{locale.REGISTER.TITLE}</h4>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>{locale.REGISTER.EMAIL}</Form.Label>
                        <Form.Control type="email"  required value={email}  onChange={(e)=> this.handleChange(e,'email')}/>
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>{locale.REGISTER.PASSWORD}</Form.Label>
                        <Form.Control type="password" required value={password} onChange={(e)=> this.handleChange(e,'password')}/>
                    </Form.Group>
                    <Form.Group controlId="formGrouprePassword">
                        <Form.Label>{locale.REGISTER.RE_PASSWORD}</Form.Label>
                        <Form.Control type="password" required value={re_password} onChange={(e)=> this.handleChange(e,'re_password')}/>
                    </Form.Group>
                    <Form.Group>
                        <Button size="lg" variant="success" type="submit" block disabled={!email || !password || password !== re_password}>{locale.REGISTER.REGISTER_BUTTON}</Button>
                    </Form.Group>

                    <span className="pseudo-link"onClick={()=> this.dispatchHandler('login')} >{locale.FORGOT.BACK}</span>

                </div>
            </Form>
        )
    }
}


export default connect(state=>state)(Register)
