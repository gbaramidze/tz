import React from 'react';
import {connect} from "react-redux";
import {Button, Container, Form} from "react-bootstrap";
import "./style.scss";

class Login extends React.Component {

    static async getInitialProps({ locale, lang, accounts}) {
        return {locale, lang, accounts}
    }

    constructor(props) {
        super(props);
        this.dispatchHandler = this.props.dispatchHandler.bind(this)
    }

    state = {
        email: '',
        password: ''
    };

    handleChange = (e,type) => this.setState({ [type]: e.target.value });


    checkLogin = e => {
        e.preventDefault();
        const { dispatch } = this.props;
        const { accounts, locale } = this.props.reducer;
        const { email, password } = this.state;
        const login = accounts.some(acc=> {
            return  acc.email === email && acc.password === password
        });

        if(login) {
            dispatch({
                type: 'user',
                payload: email
            })
        } else {
            alert(locale.LOGIN.INCORRECT)
        }
    };

    render() {
        const { locale } = this.props.reducer;
        const { email, password } = this.state;

        return (
            <Form className="login" onSubmit={this.checkLogin}>
                <div className="login-container">
                    <h4>{locale.LOGIN.TITLE}</h4>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>{locale.LOGIN.EMAIL}</Form.Label>
                        <Form.Control type="email"  required  value={email}  onChange={(e)=> this.handleChange(e,'email')}/>
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>{locale.LOGIN.PASSWORD}</Form.Label>
                        <Form.Control type="password" required  value={password}  onChange={(e)=> this.handleChange(e,'password')}/>
                    </Form.Group>
                    <Form.Group className="actions" controlId="formGroupCheckbox">
                            <Form.Check className="remember" label={locale.LOGIN.REMEMBER}/>
                        <span className="pseudo-link" onClick={()=> this.dispatchHandler('forgot')}>{locale.LOGIN.FORGOT}</span>
                    </Form.Group>
                    <Form.Group>
                        <Button size="lg" variant="success" type="submit" block>{locale.LOGIN.LOGIN_BUTTON}</Button>
                    </Form.Group>

                    <Container>
                        <div style={{width: '100%', textAlign: 'center'}}>
                            <span className="pseudo-link"onClick={()=> this.dispatchHandler('register')}>{locale.LOGIN.REGISTER}</span>
                        </div>
                    </Container>

                </div>
            </Form>
        )
    }
}


export default connect(state=>state)(Login)
