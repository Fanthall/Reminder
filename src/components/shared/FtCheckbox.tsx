import React, { FunctionComponent } from 'react'
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native'
import { Text } from 'native-base';
import FtIcon from './FtIcon';


interface RxCheckBoxProps {
    selected: boolean;
    onPress?: () => void;
    style?: any;
    iconSize?: number;
    iconColorSelected?: string;
    iconColorDeselected?: string;
    iconColor?: string;
    iconSelected?: string;
    iconDeselected?: string;
    icon?: string;
    iconTypeSelected?: "FontAwesome5" | "Ionicons" | "AntDesign" | "Entypo" | "EvilIcons" | "Feather" | "FontAwesome" | "Fontisto" | "Foundation" | "MaterialIcons" | "MaterialCommunityIcons" | "Octicons" | "Zocial" | "SimpleLineIcons";
    iconTypeDeselected?: "FontAwesome5" | "Ionicons" | "AntDesign" | "Entypo" | "EvilIcons" | "Feather" | "FontAwesome" | "Fontisto" | "Foundation" | "MaterialIcons" | "MaterialCommunityIcons" | "Octicons" | "Zocial" | "SimpleLineIcons";
    iconType?: "FontAwesome5" | "Ionicons" | "AntDesign" | "Entypo" | "EvilIcons" | "Feather" | "FontAwesome" | "Fontisto" | "Foundation" | "MaterialIcons" | "MaterialCommunityIcons" | "Octicons" | "Zocial" | "SimpleLineIcons";
    textStyle?: any;
    text?: string;
}

const FtCheckBox: FunctionComponent<RxCheckBoxProps> = (props) => {
    return (
        <TouchableOpacity style={[styles.checkBox, props.style]} onPress={props.onPress} {...props}>
            <FtIcon
                iconSize={props.iconSize || 25}
                iconType={props.iconType ? props.iconType : (props.selected ? (props.iconTypeSelected ? props.iconTypeSelected : 'MaterialIcons')
                    :
                    (props.iconTypeDeselected ? props.iconTypeDeselected : 'MaterialIcons'))}

                iconColor={props.iconColor ? props.iconColor : (props.selected ? props.iconColorSelected : props.iconColorDeselected)}
                icon={props.icon ? props.icon : (props.selected ? (props.iconSelected ? props.iconSelected : 'check-box')
                    :
                    (props.iconDeselected ? props.iconDeselected : 'check-box-outline-blank'))}
            />
            {
                props.text ? <Text style={props.textStyle}> {props.text} </Text> : null
            }
        </TouchableOpacity>
    )
}

export default FtCheckBox

const styles = StyleSheet.create({
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});
