import React from 'react'
import {connect} from "react-redux";

import "./style.scss";
import { Container, Navbar} from "react-bootstrap";

class Navigation extends React.Component {

    static async getInitialProps({ lang, locale, user}) {
        return {lang,locale, user}
    }


    dispatchHandler = name => {
        const { dispatch } = this.props;
        dispatch({
            type: 'component',
            payload: name
        })
    }

    setLanguage = lang => {
        const { dispatch } = this.props;
        dispatch({
            type: 'language',
            payload: lang
        })
    }

    logout = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'user',
            payload: ''
        })
    };

    render() {
        const { lang, user } = this.props.reducer;
        return <Navbar className="navigation">
            <Container>
                <Navbar.Brand onClick={()=> this.dispatchHandler('login')}>
                    <img src="../../../static/Logo.svg" alt="The Boats"/>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <ul className="language-picker">
                        <li className={lang === "ru" ? 'active' : ''} onClick={()=> this.setLanguage('ru')}><img src="../../../static/flags/ru.png" alt="ru"/></li>
                        <li className={lang === "en" ? 'active' : ''} onClick={()=> this.setLanguage('en')}><img src="../../../static/flags/en.png" alt="en" /></li>
                        <li className={lang === "de" ? 'active' : ''} onClick={()=> this.setLanguage('de')}><img src="../../../static/flags/de.png" alt="de" /></li>
                    </ul>
                    <Navbar.Text className="account">
                        { user ? <span onClick={this.logout}>{user}</span> : 'Guest'}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    }
}


export default connect(state=>state)(Navigation)
