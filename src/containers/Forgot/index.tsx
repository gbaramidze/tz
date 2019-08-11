import * as React from 'react';
import {connect} from 'react-redux';
import {Button, Form} from 'react-bootstrap';
import './style.scss';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {Typeahead} from 'react-bootstrap-typeahead';

import {Account} from '../../interface/account';
import {Locales} from '../../interface/locales';

interface ForgotProps {
    dispatchHandler(component): void;
    reducer?: {
        accounts: Account[];
        locale: Locales;
    };
}

class Forgot extends React.Component<ForgotProps> {
    public state = {
        email: ''
    };

    public static async getInitialProps({ locale, lang, accounts}): Promise<object> {
        return {locale, lang, accounts};
    }

    public constructor(props) {
        super(props);
        this.dispatchHandler = this.dispatchHandler.bind(this);
    }

    private handleChange = (e: string | []): void => this.setState({email: typeof e === 'object' ? e.join() : e});

    public dispatchHandler = (component): void => this.props.dispatchHandler(component);

    private recovery = (e: React.FormEvent): void => {
        e.preventDefault();
        const { accounts, locale } = this.props.reducer;
        const { email } = this.state;
        let password;
        accounts.forEach((acc: Account): void => {
            if (acc.email === email) {
                password = acc.password;

            }
        });

        if (password) {
            // eslint-disable-next-line no-alert
            alert(`${locale.FORGOT.RECOVER} ${password}`);
        }
    };

    public render(): React.ReactElement {
        const { locale, accounts } = this.props.reducer;
        const { email } = this.state;
        const options = [];
        accounts.forEach((acc: Account): number => options.push(acc.email));
        return (
            <Form className="forgot" onSubmit={this.recovery}>
                <div className="forgot-container">
                    <h4>{locale.FORGOT.TITLE}</h4>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label column={false}>{locale.FORGOT.EMAIL}</Form.Label>
                        <Typeahead
                            id="1234"
                            emptyLabel=""
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
                        <Button size="lg" variant="success" type="submit" block={true} disabled={!email}>{locale.FORGOT.FORGOT_BUTTON}</Button>
                    </Form.Group>
                    <button type="button" className="pseudo-link" onClick={(): void => this.dispatchHandler('login')}>{locale.FORGOT.BACK}</button>
                </div>
            </Form>
        );
    }
}


export default connect((state): object => state)(Forgot);
