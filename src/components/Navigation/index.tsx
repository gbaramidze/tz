import React, {ReactNode} from 'react';
import {connect} from 'react-redux';

import './style.scss';
import { Container, Navbar} from 'react-bootstrap';
import {Dispatch} from '../../interface/dispatch';

interface NavigationProps {
    dispatch(obj: Dispatch);
    dispatchHandler(component): void;
    setLanguage(lang: string): void;
    logout(): void;
    reducer: {
        lang: string;
        user: Account;
    };
}

class Navigation extends React.Component<NavigationProps> {

    public static async getInitialProps({ lang, locale, user}): Promise<object> {
        return {lang, locale, user};
    }


    private dispatchHandler = (name: string): void => {
        const { dispatch } = this.props;
        dispatch({
            type: 'component',
            payload: name
        });
    };

    private setLanguage = (lang: string): void => {
        const { dispatch } = this.props;
        dispatch({
            type: 'language',
            payload: lang
        });
    };

    private logout = (): void => {
        const { dispatch } = this.props;
        dispatch({
            type: 'user',
            payload: ''
        });
    };

    public render(): ReactNode {
        const { lang, user } = this.props.reducer;
        return (
            <Navbar className="navigation">
                <Container>
                    <Navbar.Brand onClick={(): void => this.dispatchHandler('login')}>
                        <img src="../../../static/Logo.svg" alt="The Boats"/>
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <ul className="language-picker">
                            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                            <li className={lang === 'ru' ? 'active' : ''} onClick={(): void => this.setLanguage('ru')}><img src="../../../static/flags/ru.png" alt="ru"/></li>
                            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                            <li className={lang === 'en' ? 'active' : ''} onClick={(): void => this.setLanguage('en')}><img src="../../../static/flags/en.png" alt="en" /></li>
                            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                            <li className={lang === 'de' ? 'active' : ''} onClick={(): void => this.setLanguage('de')}><img src="../../../static/flags/de.png" alt="de" /></li>
                        </ul>
                        <Navbar.Text className="account">
                            { user ? <button type="button" onClick={this.logout} className="user">{user}</button> : 'Guest'}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}


export default connect((state): object => state)(Navigation);
