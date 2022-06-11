import { StyleSheet } from 'react-native';
import { NativeBaseProvider, extendTheme } from 'native-base';

export const AppColors = {
    FtRed: '#E52421',
    FtBlue: '#1A64AE',
    FloorLightGray: '#FDFDFD',
    FrameGray: '#D8D8D8',
    lightCyan: '#C5E1E5',
    blue: '#007bff',
    indigo: '#6610f2',
    purple: '#6f42c1',
    pink: '#e83e8c',
    red: '#dc3545',
    lightRed: '#DE5D5D',
    orange: '#fd7e14',
    yellow: '#ffc107',
    green: '#28a745',
    teal: '#20c997',
    cyan: '#17a2b8',
    pink2: '#D04A60',
    white: '#FFFFFF',
    brand: '#C21E27',
    black: '#000000',
    lightblue: '#e0eeee',
    blueGray: '#c1cdcd',
    grayDarker: '#222222',
    grayDark: '#333333',
    gray: '#666666',
    grayLight: '#999999',
    grayLighter: '#cccccc',
    grayUltraLight: '#efefefef',
    placeholderColor: '#707070',
    highlighUnderlayColor: '#ccf8ff',
    favoriteActionButtonColor: '#9b59b6',
    0:"#20c997",
    1:"#ffc107",
    2:"#ffc107",
    3:"#ffc107",
    baseColor:"#1DA4BC",
};

export const AppStyleVars = {
    brandColor: AppColors.brand,
    primaryColor: AppColors.blue,

    appBgColor: AppColors.grayUltraLight,
    appTextColor: AppColors.grayDarker,
    appOutlineColor: AppColors.grayLighter,

    contentBgColor: '#ffffff',

    mainNavBgColor: AppColors.grayDark,
    mainNavTextColor: '#ffffff',
    mainNavTextInactiveColor: AppColors.grayLight,
    mainNavTextActiveColor: '#ffffff',
    mainNavWidth: 300,

    mainNavHeaderBgColor: AppColors.brand,
    mainNavHeaderTextColor: '#ffffff',
    mainNavHeaderFontSize: 18,

    buttonPrimaryBgColor: AppColors.brand,
    buttonPrimaryTextColor: '#ffffff',
    buttonDangerBgColor: AppColors.red,
    buttonDangerTextColor: '#ffffff',

    highlightOverlayColor: '#baf5ff',
};

const CommonStyles = StyleSheet.create({
    main: {
        flex: 8,
        backgroundColor: AppColors.white
    },
    mainText: {
        fontSize: 17,
        margin: 10,
        fontWeight: 'bold'
    },
    addButton: {
        width: '12%',
        padding: 15,
        margin: 10,
        borderRadius: 50,
        elevation: 10,
        alignItems: 'center',
        backgroundColor: AppColors.grayUltraLight
    },
    cancelButton: {
        width: '12%',
        padding: 15,
        margin: 10,
        borderRadius: 50,
        elevation: 10,
        alignItems: 'center',
        backgroundColor: AppColors.lightRed
    },

    appWrapper: {
        backgroundColor: AppStyleVars.appBgColor,
        padding: 0,
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'nowrap',
        alignItems: 'stretch',
        alignContent: 'stretch',
        justifyContent: 'space-between',
    },
    screenWrapper: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'nowrap',
        alignItems: 'stretch',
        alignContent: 'stretch',
        justifyContent: 'space-between',
    },
    contentWrapper: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexGrow: 1,
    },
    whiteBg: {
        backgroundColor: '#ffffff',
    },

    buttonBase: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    buttonPrimary: {
        backgroundColor: AppStyleVars.buttonPrimaryBgColor,
    },
    buttonPrimaryText: {
        color: AppStyleVars.buttonPrimaryTextColor,
    },
    buttonDanger: {
        backgroundColor: AppStyleVars.buttonDangerBgColor,
    },
    buttonDangerText: {
        color: AppStyleVars.buttonDangerTextColor,
    },

    inputWrapper: {
        marginBottom: 5,
    },
    input: {
        height: 40,
        backgroundColor: AppColors.grayUltraLight,
        marginBottom: 10,
        padding: 10,
        color: '#000',
        borderWidth: 1,
        borderColor: AppStyleVars.appOutlineColor,
    },

    alertText: {
        color: '#383d41',
    },
    alertWrapper: {
        backgroundColor: '#e2e3e5',
        borderColor: '#d6d8db',
        borderWidth: 1,
        padding: 5,
    },

    alertDangerText: {
        color: '#721c24',
    },
    alertDangerWrapper: {
        backgroundColor: '#f8d7da',
        borderColor: '#f5c6cb',
    },

    alertInfoText: {
        color: '#0c5460',
    },
    alertInfoWrapper: {
        backgroundColor: '#d1ecf1',
        borderColor: '#bee5eb',
    },

    alertWarningText: {
        color: '#856404',
    },
    alertWarningWrapper: {
        backgroundColor: '#fff3cd',
        borderColor: '#ffeeba',
    },

    alertSuccessText: {
        color: '#155724',
    },
    alertSuccessWrapper: {
        backgroundColor: '#d4edda',
        borderColor: '#c3e6cb',
    },

    centeredContent: {
        flex: 1,
        justifyContent: 'center',
        height: 500,
    },
    centeredContentWithoutHeight: {
        flex: 1,
        justifyContent: 'center',
    },
    centeredText: {
        textAlign: 'center',
    },
    boldText: {
        fontWeight: '700',
    },
    underlinedText: {
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
    },
    rightAlignedText: {
        textAlign: 'right',
    },

    textLink: {
        color: AppColors.brand,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
    },
    searchSectionContainer: {
        marginBottom: 5,
        paddingVertical: 10,
    },
    searchSectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 1,
    },
    actionButton: {
        marginRight: 5,
    },
    actionButtonUnauthorized: {
        backgroundColor: AppColors.grayDarker,
        opacity: 0.3,
        marginRight: 5,
    },
    buttonUnauthorized: {
        backgroundColor: AppColors.grayDarker,
        opacity: 0.3,
    },
    infoMessage: {
        padding: 20,
        borderWidth: 1,
        borderColor: AppColors.grayLighter,
        marginTop: 30,
    },
    infoMessageText: {
        textAlign: 'center',
        fontSize: 14,
        color: AppColors.gray,
    },
    searchMoreText: {
        paddingTop: 20,
        paddingBottom: 30,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    searchNoMoreResultsText: {
        fontSize: 15,
    },
    activityIndicatorStyle: {
        paddingTop: 20,
        paddingBottom: 20
    },
    etkinMaddeUyarilarDurumStyle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: AppColors.black,
    },
    etkinMaddeUyarilarBaslikStyle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: AppColors.red
    },
    fontSizeSmall: {
        fontSize: 12,
    },
    fontSizeMedium: {
        fontSize: 14,
    },
    fontSizeLarge: {
        fontSize: 16,
    },
    fontSize1XLarge: {
        fontSize: 18,
    },
    fontSize2XLarge: {
        fontSize: 20,
    },
    fontSize3XLarge: {
        fontSize: 22,
    },
    fontSize4XLarge: {
        fontSize: 24,
    },
    fontSize5XLarge: {
        fontSize: 26,
    },
    fontSize6XLarge: {
        fontSize: 28,
    },
    smallGrayText: {
        fontSize: 12,
        color: AppColors.grayLight,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    mustahzarExtraButon: {
        justifyContent: 'center'
    }
});

const typography = {
    letterSpacings: {
        xs: '-0.05em',
        sm: '-0.025em',
        md: 0,
        lg: '0.025em',
        xl: '0.05em',
        '2xl': '0.1em',
    },
    lineHeights: {
        '2xs': '1em',
        xs: '1.125em',
        sm: '1.25em',
        md: '1.375em',
        lg: '1.5em',
        xl: '1.75em',
        '2xl': '2em',
        '3xl': '2.5em',
        '4xl': '3em',
        '5xl': '4em',
    },
    fontWeights: {
        hairline: 100,
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
        extrablack: 950,
    },
    fonts: {
        heading: undefined,
        body: undefined,
        mono: undefined,
    },
    fontSizes: {
        '2xs': 10,
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 30,
        '4xl': 36,
        '5xl': 48,
        '6xl': 60,
        '7xl': 72,
        '8xl': 96,
        '9xl': 128,
    },
};

const opacity = {
    0: 0,
    5: 0.05,
    10: 0.1,
    20: 0.2,
    25: 0.25,
    30: 0.3,
    40: 0.4,
    50: 0.5,
    60: 0.6,
    70: 0.7,
    75: 0.75,
    80: 0.8,
    90: 0.9,
    95: 0.95,
    100: 1,
};

const shadow = {
    0: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
    },
    1: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    2: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    3: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    4: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    5: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    6: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    7: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    8: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    9: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    }
};

const theme = extendTheme({
    fontConfig: {
        Roboto: {
            100: {
                normal: 'Roboto-Light',
                italic: 'Roboto-LightItalic',
            },
            200: {
                normal: 'Roboto-Light',
                italic: 'Roboto-LightItalic',
            },
            300: {
                normal: 'Roboto-Light',
                italic: 'Roboto-LightItalic',
            },
            400: {
                normal: 'Roboto-Regular',
                italic: 'Roboto-Italic',
            },
            500: {
                normal: 'Roboto-Medium',
            },
            600: {
                normal: 'Roboto-Medium',
                italic: 'Roboto-MediumItalic',
            },
            700: {
                normal: 'Roboto-Bold',
            },
            800: {
                normal: 'Roboto-Bold',
                italic: 'Roboto-BoldItalic',
            },
            900: {
                normal: 'Roboto-Bold',
                italic: 'Roboto-BoldItalic',
            },
        },
    },
    // Make sure values below matches any of the keys in `fontConfig`
    fonts: {
        heading: 'Roboto',
        body: 'Roboto',
        mono: 'Roboto',
    },
});

export default CommonStyles;
