import React, {FormEvent, ReactElement} from 'react';
import {connect} from 'react-redux';
import {Button, Container, Form} from 'react-bootstrap';
import './style.scss';
import {Account} from '../../interface/account';
import {Locales} from '../../interface/locales';
import {Dispatch} from '../../interface/dispatch';


interface LoginProps {
    dispatchHandler(component): void;
    dispatch?(obj: Dispatch): void;
    reducer?: {
        accounts: Account[];
        locale: Locales;
    };
}

class Login extends React.Component<LoginProps> {

    public static async getInitialProps({locale, lang, accounts}): Promise<object> {
        return {locale, lang, accounts};
    }

    public constructor(props: LoginProps) {
        super(props);
        this.dispatchHandler = this.dispatchHandler.bind(this);
    }

    public state = {
        email: '',
        password: ''
    };

    private handleChange = (e: FormEvent | any, type: string): void => this.setState({[type]: e.target.value});

    private readonly dispatchHandler = (component: string): void => this.props.dispatchHandler(component);

    private checkLogin = (e: FormEvent): void => {
        e.preventDefault();
        const {dispatch} = this.props;
        const {accounts, locale} = this.props.reducer;
        const {email, password} = this.state;
        const login = accounts.some((acc: Account): boolean => acc.email === email && acc.password === password);

        if (login) {
            dispatch({
                type: 'user',
                payload: email
            });
        } else {
            // eslint-disable-next-line no-alert
            alert(locale.LOGIN.INCORRECT);
        }
    };

    public render(): React.ReactElement {
        const {locale} = this.props.reducer;
        const {email, password} = this.state;
        return (
            <Form className="login" onSubmit={this.checkLogin}>
                <div className="login-container">
                    <h4>{locale.LOGIN.TITLE}</h4>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label column={false}>{locale.LOGIN.EMAIL}</Form.Label>
                        <Form.Control
                            type="email"
                            required={true}
                            value={email}
                            onChange={(e: FormEvent): void => this.handleChange(e, 'email')}/>
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label column={false}>{locale.LOGIN.PASSWORD}</Form.Label>
                        <Form.Control
                            type="password"
                            required={true}
                            value={password}
                            onChange={(e: FormEvent): void => this.handleChange(e, 'password')}/>
                    </Form.Group>
                    <Form.Group className="actions" controlId="formGroupCheckbox">
                        <Form.Check className="remember" label={locale.LOGIN.REMEMBER}/>
                        <button
                            type="button"
                            className="pseudo-link"
                            onClick={(): void => this.dispatchHandler('forgot')}>
                            {locale.LOGIN.FORGOT}
                        </button>
                    </Form.Group>
                    <Form.Group>
                        <Button size="lg" variant="success" type="submit" block={true}>{locale.LOGIN.LOGIN_BUTTON}</Button>
                    </Form.Group>

                    <Container>
                        <div style={{width: '100%', textAlign: 'center'}}>
                            <button
                                type="button"
                                className="pseudo-link"
                                onClick={(): void => this.dispatchHandler('register')}>
                                {locale.LOGIN.REGISTER}
                            </button>
                        </div>
                    </Container>

                </div>
            </Form>
        );
    }
}


export default connect((state): object => state)(Login);
