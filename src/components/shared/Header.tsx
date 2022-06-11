import React, { FunctionComponent, ReactElement } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Text, HStack, View } from 'native-base';
import { Platform, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

interface HeaderProps {
    left?: ReactElement | FunctionComponent<any> | null;
    right?: ReactElement | FunctionComponent<any> | null;
    headerText?: string;
    textColor?: string;
}
const Header: FunctionComponent<HeaderProps> = (props) => {
    const navigation = useNavigation();
    const darkMode = useColorScheme();

    const renderLeft = props.left ? (props.left) : (
        null
        // TODO: ilerde burada default değer gelirse güncellenecek.
    );
    const titlePress = () => {
        //title click
    };
    const renderCenter = (<>
        {
            props.headerText ? (
                <TouchableOpacity onPress={titlePress}>
                    <Text style={stylesPage.headerTitle}>
                        {props.headerText}
                    </Text>
                </TouchableOpacity>
            ) : (
                null
                // TODO: ilerde burada default değer gelirse güncellenecek.
            )
        }</>
    );

    const renderRight = props.right ? (props.right) : (
        <View></View>
    );
    return (
        <HStack direction="row" style={[stylesPage.container,
        Platform.OS === 'ios' ? {
            zIndex: 50
        } : null
        ]}>
            <View style={stylesPage.left}>{renderLeft}</View>
            <View style={stylesPage.middle}>{renderCenter}</View>
            <View style={stylesPage.right}>{renderRight}</View>
        </HStack>
    );
}

const stylesPage = StyleSheet.create({

    container: {
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: 20,
        marginTop: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        zIndex: 10,
        paddingLeft: 0,
        paddingRight: 0,
    },
    left: {
        width: "15%",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
    },
    middle: {
        width: "65%",
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    right: {
        width: "15%",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 16,
        lineHeight: 32,
        fontFamily: 'Helvetica',
        textAlign: 'center',
        fontWeight: "bold",
    },
});

export default Header;
