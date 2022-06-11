// tslint:disable: max-line-length
import { extendTheme, NativeBaseProvider, themeTools } from 'native-base';
import React, {
    FunctionComponent, useReducer,
} from 'react';
import GlobalAppContext, {
    AppNavHistoryItem,
    defaultAppContextValue,
    GlobalAppContextModel,
    globalAppReducer,
    initialAppState,
} from './GlobalAppContext';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from '../src/components/navigation';
import { AppColors } from '../src/utils/commonStyle';
import { useColorScheme } from 'react-native';

const GlobalAppProvider: FunctionComponent<{}> = () => {
    const [state, dispatch] = useReducer(globalAppReducer, initialAppState);
    const colorMode = useColorScheme();

    const theme = extendTheme({
        components: {
            Text: {
                baseStyle: (props: any) => {
                    return {
                        _light: {
                            color: (colorMode === "dark" ? AppColors.white : AppColors.black)
                        },
                        _dark: {
                            color: (colorMode === "dark" ? AppColors.white : AppColors.black)
                        },
                    };
                },
            },
            View: {
                baseStyle: (props: any) => {
                    return {
                        backgroundColor: (colorMode === "dark" ? AppColors.grayDark : AppColors.white)
                    };
                },
            },
            FlatList: {
                baseStyle: (props: any) => {
                    return {
                        backgroundColor: (colorMode === "dark" ? AppColors.black : AppColors.white)
                    };
                },
            },
            HStack: {
                baseStyle: (props: any) => {
                    return {
                        backgroundColor: (colorMode === "dark" ? AppColors.grayDark : AppColors.white)
                    };
                },
            },
            Stack: {
                baseStyle: (props: any) => {
                    return {
                        backgroundColor: (colorMode === "dark" ? AppColors.black : AppColors.white)
                    };
                },
            },
            Icon: {
                baseStyle: (props: any) => {
                    return {
                        color: (colorMode === "dark" ? AppColors.white : AppColors.black),
                    };
                },
            },
            Button: {
                baseStyle: (props: any) => {
                    return {
                        color: (colorMode === "dark" ? AppColors.white : AppColors.black),
                    };
                },
            },
            ScrollView: {
                baseStyle: (props: any) => {
                    return {
                        color: (colorMode === "dark" ? AppColors.FloorLightGray : AppColors.white),
                    };
                },
            },
            Input: {
                baseStyle: (props: any) => {
                    return {
                        color: (colorMode === "dark" ? AppColors.white : AppColors.black),
                    };
                },
            },
            Radio: {
                baseStyle: (props: any) => {
                    return {
                        color: (colorMode === "dark" ? AppColors.white : AppColors.black)
                    };
                },
            },
        },
    });
    const val: GlobalAppContextModel = {
        state,
        dispatch,
        actions: {
            ...defaultAppContextValue.actions,
            addNavHistory: (routeItem: AppNavHistoryItem) => {
                dispatch({
                    type: '@globalApp/appNavigateChanged',
                    payload: routeItem,
                });
            },
        },
    };
    return (
        <GlobalAppContext.Provider value={val}>
            <NativeBaseProvider theme={theme}>
                <NavigationContainer>
                    <RootStack />
                </NavigationContainer>
            </NativeBaseProvider>
        </GlobalAppContext.Provider >
    );
};

export default GlobalAppProvider;