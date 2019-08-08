import React, {Component} from 'react'
import Map from '../map'
import './style.scss'
import Login from "./Login";
import Forgot from "./Forgot";
import Register from "./Register";

import {connect} from "react-redux";
import config from "../../config";

class Main extends Component {
    state = {
        defaultPosition: config.coordinates,
    };

    static async getInitialProps({lang, locale, component, user}) {
        return {
            lang, locale, component, user
        }
    }

    componentDidMount() {
        if (process.browser) {
            this.setDefaultPos();
            setTimeout(() => {
                const defaultPos = this.props.router.query.pos ? this.props.router.query.pos.split(',') : this.defaultPos();
                const defaultZoom = this.props.router.query.zoom || 12;
                this.setUrl(defaultPos.join(","), defaultZoom);
            }, 10)

            const { lang } = this.props;
            if(navigator.language.indexOf(lang)) {
                const { dispatch } = this.props;
                const languages = ['en-US','ru-RU','de-DE'];
                dispatch({
                    type: 'language',
                    payload: languages.indexOf(navigator.language) > -1 ? navigator.language.split("-")[0] : config.language
                })
            }
        }
    }

    dispatchHandler = name => {
        const { dispatch } = this.props;
        dispatch({
            type: 'component',
            payload: name
        })
    }

    setDefaultPos = () => {
        const that = this;
        if (navigator.geolocation && !this.props.router.query.pos) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                const {latitude, longitude} = pos.coords;
                that.setUrl([latitude, longitude].join(","), that.props.router.query.zoom || 12);
            });
        }
    };

    defaultPos = () => {
        const {defaultPosition} = this.state;
        return defaultPosition;
    };

    setUrl = (newPos, zoom) => {
        const {pos} = this.props.router.query;
        if (pos !== newPos) {
            this.props.router.push("/?pos=" + newPos + "&zoom=" + zoom);
            setTimeout(()=> {
                this.setState({})
            },100)
        }
    };

    render() {

        const {pos, zoom} = this.props.router.query;
        const { component, user } = this.props;
        return (
            <>
                {
                    pos && zoom &&
                    <Map onUpdate={(pos, zoom) => this.setUrl(pos, zoom)} pos={pos.split(',')} zoom={zoom}/>
                }
                {!user && component === 'login' && <Login dispatchHandler={this.dispatchHandler}/> }
                {!user && component === 'forgot' && <Forgot dispatchHandler={this.dispatchHandler}/> }
                {!user && component === 'register' && <Register dispatchHandler={this.dispatchHandler}/> }
            </>
        )
    }

}

const mapStateToProps = ({reducer}) => {
    return {
        lang: reducer.lang,
        component: reducer.component,
        user: reducer.user
    }
};

export default connect(mapStateToProps)(Main)
