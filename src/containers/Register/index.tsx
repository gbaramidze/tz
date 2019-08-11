import React, {FormEvent, ReactElement} from 'react';
import {connect} from 'react-redux';
import {Button, Form} from 'react-bootstrap';
import './style.scss';
import {Account} from '../../interface/account';
import {Locales} from '../../interface/locales';
import {Dispatch} from '../../interface/dispatch';

interface RegisterProps {
    dispatchHandler(name): void;
    dispatch?(obj: Dispatch): void;
    reducer?: {
        accounts: Account[];
        locale: Locales;
    };
}

interface RegisterState {
    email: string;
    password: string;
    rePassword: string;
}

class Register extends React.Component<RegisterProps, RegisterState> {

    public state = {
        email: '',
        password: '',
        rePassword: ''
    };

    public static async getInitialProps({locale, lang}): Promise<object> {
        return {locale, lang};
    }

    public constructor(props) {
        super(props);
        this.dispatchHandler = this.dispatchHandler.bind(this);
    }

    private handleChange = (e: FormEvent | any, type: string): void => {
        if (type === 'email') {
            this.setState({ [type]: e.target.value });
        }
        if (type === 'password') {
            this.setState({ [type]: e.target.value });
        }
        if (type === 'rePassword') {
            this.setState({ [type]: e.target.value });
        }
    };

    private readonly dispatchHandler = (component: string): void => this.props.dispatchHandler(component);

    private addAccount = (e: FormEvent): void => {
        e.preventDefault();
        const { dispatch } = this.props;
        const { email, password } = this.state;
        dispatch({
            type: 'add_account',
            payload: { email, password }
        });
        dispatch({
            type: 'component',
            payload: 'login'
        });
    };

    private eventHandler = (): void => this.dispatchHandler('login');

    public render(): ReactElement {
        const { locale } = this.props.reducer;
        const {email, password, rePassword} = this.state;
        return (
            <Form className="register" onSubmit={this.addAccount}>
                <div className="register-container">
                    <h4>{locale.REGISTER.TITLE}</h4>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label column={false}>{locale.REGISTER.EMAIL}</Form.Label>
                        <Form.Control type="email" required={true} value={email} onChange={(e: FormEvent): void => this.handleChange(e, 'email')}/>
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label column={false}>{locale.REGISTER.PASSWORD}</Form.Label>
                        <Form.Control type="password" required={true} value={password} onChange={(e: FormEvent): void => this.handleChange(e, 'password')}/>
                    </Form.Group>
                    <Form.Group controlId="formGrouprePassword">
                        <Form.Label column={false}>{locale.REGISTER.RE_PASSWORD}</Form.Label>
                        <Form.Control type="password" required={true} value={rePassword} onChange={(e: FormEvent): void => this.handleChange(e, 'rePassword')}/>
                    </Form.Group>
                    <Form.Group>
                        <Button size="lg" variant="success" type="submit" block={true} disabled={!email || !password || password !== rePassword}>{locale.REGISTER.REGISTER_BUTTON}</Button>
                    </Form.Group>
                    <button type="button" className="pseudo-link" onClick={this.eventHandler} >{locale.FORGOT.BACK}</button>
                </div>
            </Form>
        );
    }
}


export default connect((state): object => state)(Register);
