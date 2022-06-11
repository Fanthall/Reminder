import { Text, View, } from 'native-base';
import React, { FunctionComponent } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { AppColors } from '../../utils/commonStyle';
import FtIcon from './FtIcon';
export const CardButtonsWrapper: FunctionComponent = (props) => {
    return (
        <View style={[styles.buttonsWrapper]}>
            {props.children}
        </View>
    );
};

export interface CardButton {
    onPress: () => void;
    icon?: string;
    iconSize?: number;
    label?: string;
    labelSize?: number;
    buttonsPerRow: number;
    style?: any;
    iconType?: "FontAwesome5" | "Ionicons" | "AntDesign" | "Entypo" | "EvilIcons" | "Feather" | "FontAwesome" | "Fontisto" | "Foundation" | "MaterialIcons" | "MaterialCommunityIcons" | "Octicons" | "Zocial" | "SimpleLineIcons";
}

export const CardButton: FunctionComponent<CardButton> = (props) => {
    const iconSize = props.iconSize || 23;
    const height = 70;
    const width = 97 / props.buttonsPerRow;
    const screenHeight = Math.round(Dimensions.get('window').height);
    let textLength = 1;
    if (props.label) {
        let splitted = props.label.split(" ");
        var longest = splitted.sort(
            function (a, b) {
                return b.length - a.length;
            }
        )[0];
        textLength = longest.length;
    }
    const fontSize = textLength > 9 ? (screenHeight / height) * 1.3 : (screenHeight / height) * 4;
    let labelSize = Math.max(fontSize, 8);
    if (labelSize > 15) {
        labelSize = 15;
    }
    const renderIcon = () => {
        return (<FtIcon icon={props.icon} iconSize={props.iconSize} iconType={props.iconType} />)
    };

    const renderLabel = () => {
        if (!props.label) {
            return null;
        }
        return (
            <Text numberOfLines={2} adjustsFontSizeToFit style={[styles.label, { fontSize: labelSize }, { marginLeft: 5 }]}>{props.label}</Text>
        );
    };



    return (
        /*
         */
        <TouchableOpacity
            activeOpacity={1}
            disabled={props.style}
            style={[styles.container, props.style, { width: `${width}%` }]}
        >
            <TouchableOpacity style={{
                width: '100%', height: '100%',
                padding: 15, margin: 0,
                flexDirection: "column",
                flexWrap: "wrap",
                alignContent: "stretch",
                backgroundColor: "transparent"
            }} onPress={props.onPress}>
                {props.children ? props.children : (
                    <View style={styles.innerWrapper}>
                        {
                            renderIcon()
                        }
                        {
                            renderLabel()
                        }

                    </View>
                )}
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default {
    CardButtonsWrapper,
    CardButton,
};

const styles = StyleSheet.create({
    buttonsWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "flex-start",
        backgroundColor: "transparent"
    },
    container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.23,
        shadowRadius: 5,
        elevation: 1,
        height: 90,
        marginBottom: 5,
        backgroundColor: AppColors.baseColor,
        padding: 0,
        flexDirection: "column",
        flexWrap: "wrap",
        alignContent: "stretch",
        borderWidth: 1,
        borderColor: "transparent",
        borderRadius: 10,
    },
    innerWrapper: {
        flexDirection: "row",
        flex: 5,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "transparent",
    },
    label: {
        fontFamily: "Helvetica",
        color: "#fff",
        fontWeight: 'bold',
        flex: 1,
        flexWrap: "wrap",
        marginTop: "auto",
        marginBottom: "auto",
    },
});
