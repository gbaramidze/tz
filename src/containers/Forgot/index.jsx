import React from 'react';
import {connect} from "react-redux";
import ru from "../../../static/flags/ru.png";
import {Button, Form, FormGroup} from "react-bootstrap";
import "./style.scss";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {Typeahead} from 'react-bootstrap-typeahead'
class Forgot extends React.Component {

    static async getInitialProps({ locale, lang, accounts}) {
        await store.dispatch({
            type: 'language',
            payload: 'ru'
        });
        return {locale, lang, accounts}
    }

    constructor(props) {
        super(props)
        this.dispatchHandler = this.props.dispatchHandler.bind(this)
    }

    state = {
        email: ''
    }

    handleChange = e => this.setState({email:  typeof e === "object" ? e.join() : e})


    recovery = e => {
        e.preventDefault();
        const { accounts, locale } = this.props.reducer;
        const { email } = this.state;
        let password;
        accounts.forEach(acc=> {
            if(acc.email === email) {
                password = acc.password;
                return;
            }
        });

        if(password) {
            alert(`${locale.FORGOT.RECOVER} ${password}`)
        }
    };

    render() {
        const { locale, accounts } = this.props.reducer;
        const { email } = this.state;
        const options = [];
        accounts.forEach(acc=> options.push(acc.email));
        return (
            <Form className="forgot" onSubmit={this.recovery}>
                <div className="forgot-container">
                    <h4>{locale.FORGOT.TITLE}</h4>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>{locale.FORGOT.EMAIL}</Form.Label>
                        <Typeahead
                            id="1234"
                            emptyLabel={''}
                            minLength={3}
                            labelKey="name"
                            options={options}
                            onChange={this.handleChange}
                            onInputChange={this.handleChange}
                            type="email"
                            placeholder={locale.FORGOT.PLACEHOLDER}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button size="lg" variant="success" type="submit" block disabled={!email}>{locale.FORGOT.FORGOT_BUTTON}</Button>
                    </Form.Group>
                    <span className="pseudo-link" onClick={()=> this.dispatchHandler('login')}>{locale.FORGOT.BACK}</span>
                </div>
            </Form>
        )
    }
}


export default connect(state=>state)(Forgot)
