import React, {Component, ReactNode} from 'react';
import {connect} from 'react-redux';
import './style.scss';
// interfaces
// eslint-disable-next-line import/no-unresolved
import {RouterProps} from 'next-server/router';
import {Account} from '../interface/account';
import {Locales} from '../interface/locales';
import {Dispatch} from '../interface/dispatch';
// components
import Map from '../components/map';
import Login from './Login';
import Forgot from './Forgot';
import Register from './Register';

// config
import config from '../../config';

interface MainProps {
    dispatchHandler(name): void;
    dispatch(obj: Dispatch): void;
    router: RouterProps;
    lang: string;
    component: string;
    user: Account;
    reducer: {
        accounts: Account[];
        locale: Locales;
    };
}

interface MainState {
    defaultPosition: number[];
}

class Main extends Component<MainProps, MainState> {
    public state: Readonly<MainState> = {
        defaultPosition: config.coordinates
    };

    public static async getInitialProps({
        lang, locale, component, user
    }): Promise<object> {
        return {
            lang, locale, component, user
        };
    }

    public componentDidMount(): void {
        if (process.browser) {
            this.setDefaultPos();
            setTimeout((): void => {
                // console.log(typeof this.props.router.query.pos)
                // const pos: string[] = this.props.router.query.pos;
                let defaultPos = this.defaultPos();
                if (this.props.router.query.pos && typeof this.props.router.query.pos === 'string') {
                    defaultPos = this.props.router.query.pos.split(',');
                }
                const defaultZoom = this.props.router.query.zoom.toString() || '12';
                this.setUrl(defaultPos.join(','), defaultZoom);
            }, 10);

            const { lang } = this.props;
            if (navigator.language.indexOf(lang)) {
                const { dispatch } = this.props;
                const languages = ['en-US', 'ru-RU', 'de-DE'];
                dispatch({
                    type: 'language',
                    payload: languages.indexOf(navigator.language) > -1 ? navigator.language.split('-')[0] : config.language
                });
            }
        }
    }

    private dispatchHandler = (name: string): void => {
        const { dispatch } = this.props;
        dispatch({
            type: 'component',
            payload: name
        });
    };

    private setDefaultPos = (): void => {
        const { router } = this.props;
        const that = this;
        if (navigator.geolocation && !router.query.pos) {
            navigator.geolocation.getCurrentPosition((pos): void => {
                const {latitude, longitude} = pos.coords;
                that.setUrl([latitude, longitude].join(','), router.query.zoom ? router.query.zoom.toString() : '12');
            });
        }
    };

    private defaultPos = (): string[] => {
        const {defaultPosition} = this.state;
        return defaultPosition.map((item): string => item.toString());
    };

    private setUrl = (newPos: string, zoom: string): void => {
        const { router } = this.props;
        const {pos} = router.query;
        if (pos !== newPos) {
            router.push(`/?pos=${newPos}&zoom=${zoom}`);
            setTimeout((): void => this.setState({}), 100);
        }
    };

    public render(): ReactNode {
        const { component, user, router } = this.props;
        const { pos, zoom } = router.query;
        return (
            <>
                {
                    pos && zoom
                    && <Map onUpdate={this.setUrl} pos={pos.toString().split(',')} zoom={zoom.toString()}/>
                }
                {!user && component === 'login' && <Login dispatchHandler={this.dispatchHandler}/> }
                {!user && component === 'forgot' && <Forgot dispatchHandler={this.dispatchHandler}/> }
                {!user && component === 'register' && <Register dispatchHandler={this.dispatchHandler}/> }
            </>
        );
    }
}

const mapStateToProps = ({reducer}): object => ({
    lang: reducer.lang,
    component: reducer.component,
    user: reducer.user
});

export default connect(mapStateToProps)(Main);
