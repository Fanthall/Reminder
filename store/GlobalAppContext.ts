// tslint:disable: max-line-length

import { createContext, Dispatch } from 'react';
import constants from '../constants';

import GlobalAppActionType from './GlobalAppActions';

export interface AppNavHistoryItem {
    routeName: string;
    params?: any;
}

export interface GlobalAppContextModel {
    state: GlobalAppContextState;
    dispatch: Dispatch<GlobalAppActionType>;

    actions: {
        addNavHistory: (routeItem: AppNavHistoryItem) => void;
    };
}

export const initialAppState: GlobalAppContextState = {
    navigationHistory: [],
};

const navHistoryLimit = 30;


export const defaultAppContextValue: GlobalAppContextModel = {
    state: initialAppState,
    dispatch: () => { /** */ },
    actions: {
        addNavHistory: (routeItem: AppNavHistoryItem) => {
            //
        },
    },
};

export interface GlobalAppContextState {
    navigationHistory: AppNavHistoryItem[];
}

const GlobalAppContext = createContext(defaultAppContextValue);

export const globalAppReducer: React.Reducer<GlobalAppContextState, GlobalAppActionType> = (state, action) => {
    switch (action.type) {

        case '@globalApp/appNavigateChanged':
            const routes = state.navigationHistory;
            let lastRoute: AppNavHistoryItem = { routeName: constants.routes.home };
            if (routes.length > 0) {
                lastRoute = routes.length > 1 ? routes[(routes.length - 1)] : routes[0];
                const isLastRoute = lastRoute.params === action.payload.params
                    && lastRoute.routeName === action.payload.routeName;
                if (isLastRoute) {
                    return {
                        ...state,
                    };
                }
            }
            routes.push(action.payload);
            if (routes.length >= navHistoryLimit) {
                routes.shift();
            }
            return {
                ...state,
                navigationHistory: routes,
            };
        default:
            return initialAppState;
    }
};

export default GlobalAppContext;
