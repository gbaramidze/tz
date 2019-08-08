import React from 'react';
import LocalizedStrings from 'react-localization';
import config from "../../config";
import ru from '../../locale/ru';
import en from '../../locale/en';
import de from '../../locale/de';


const defaultLanguage = config.language;

const locale = new LocalizedStrings({
  ru,
  en,
  de
});
locale.setLanguage(defaultLanguage);

export const initialState = {
    isLoading: false,
    lang: defaultLanguage,
    component: 'login',
    accounts: [
        {
            email: 'admin@admin.com',
            password: '1234'
        }
    ],
    user: null,
    locale
};


export default function reducer(state = initialState, action) {
    if (action.type === 'init') {
        return {
            ...state,
            init: true
        };
    }

    if (action.type === 'component') {
        return {
            ...state,
            component: action.payload
        };
    }

    if (action.type === 'language') {
        locale.setLanguage(action.payload);
        return {
            ...state,
            lang: action.payload,
            locale
        };
    }

    if (action.type === 'add_account') {
        state.accounts.push(action.payload);
        console.log(state.accounts)
    }

    if (action.type === 'user') {
        return {
            ...state,
            user: action.payload
        };
    }


    return state;
}

