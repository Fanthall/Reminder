import React, { FunctionComponent } from 'react';
import { StyleSheet } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import Zocial from "react-native-vector-icons/Zocial";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
interface IconProps {
    icon: string;
    iconSize?: number;
    iconType?: "FontAwesome5" | "Ionicons" | "AntDesign" | "Entypo" | "EvilIcons" | "Feather" | "FontAwesome" | "Fontisto" | "Foundation" | "MaterialIcons" | "MaterialCommunityIcons" |"MaterialIcons"| "Octicons" | "Zocial" | "SimpleLineIcons";
    iconColor?: string;
    style?: any;
}
const FtIcon: FunctionComponent<IconProps> = (props) => {
    const iconSize = props.iconSize ? props.iconSize : 20;
    const iconStyle = props.style;
    const colorStyle = props.iconColor ? ({ color: props.iconColor }) : styles.icon;

    if (typeof props.icon === 'string') {
        if (props.iconType === 'Ionicons') {
            return (
                <Ionicons name={props.icon} style={[colorStyle, iconStyle]} size={iconSize} />
            );
        }
        if (props.iconType === 'AntDesign') {
            return (
                <AntDesign name={props.icon} style={[colorStyle, iconStyle]} size={iconSize} />
            );
        }
        if (props.iconType === 'Entypo') {
            return (
                <Entypo name={props.icon} style={[colorStyle, iconStyle]} size={iconSize} />
            );
        }
        if (props.iconType === 'Feather') {
            return (
                <Feather name={props.icon} style={[colorStyle, iconStyle]} size={iconSize} />
            );
        }
        if (props.iconType === 'EvilIcons') {
            return (
                <EvilIcons name={props.icon} style={[colorStyle, iconStyle]} size={iconSize} />
            );
        }
        if (props.iconType === 'FontAwesome') {
            return (
                <FontAwesome name={props.icon} style={[colorStyle, iconStyle]} size={iconSize} />
            );
        }
        if (props.iconType === 'Fontisto') {
            return (
                <Fontisto name={props.icon} style={[colorStyle, iconStyle]} size={iconSize} />
            );
        }
        if (props.iconType === 'Foundation') {
            return (
                <Foundation name={props.icon} style={[colorStyle, iconStyle]} size={iconSize} />
            );
        }
        if (props.iconType === 'MaterialIcons') {
            return (
                <MaterialIcons name={props.icon} style={[colorStyle, iconStyle]} size={iconSize} />
            );
        }
        if (props.iconType === 'MaterialCommunityIcons') {
            return (
                <MaterialCommunityIcons name={props.icon} style={[colorStyle, iconStyle]} size={iconSize} />
            );
        }
        if (props.iconType === 'Octicons') {
            return (
                <Octicons name={props.icon} style={[colorStyle, iconStyle]} size={iconSize} />
            );
        }
        if (props.iconType === 'Zocial') {
            return (
                <Zocial name={props.icon} style={[colorStyle, iconStyle]} size={iconSize} />
            );
        }
        if (props.iconType === 'SimpleLineIcons') {
            return (
                <SimpleLineIcons name={props.icon} style={[colorStyle, iconStyle]} size={iconSize} />
            );
        }

        return (
            <FontAwesome5 name={props.icon} style={[colorStyle, iconStyle]} size={iconSize} />
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        color: "#fff",
    },
});

export default FtIcon;
