import { useNavigation } from '@react-navigation/core';
import { ArrowBackIcon, Icon } from 'native-base';
import React, {
    FunctionComponent, useContext,
} from 'react';

import { StyleSheet, TouchableOpacity, Keyboard, useColorScheme } from 'react-native';
import { AppColors } from '../../utils/commonStyle';

interface BackButtonProps {
    backAction?: () => void;
}

const BackButton: FunctionComponent<BackButtonProps> = (props) => {

    const navigation = useNavigation();
    const darkMode = useColorScheme();


    const goBack = () => {
        if (!props.backAction) {
            //Klavye gösterildiğinde gizlemelesi için listener eklendi.
            let keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', function () {
                Keyboard.dismiss();
                //Global klavyeyi etkilediği için 150 ms sonra yeniden açılabilmesine imkan verildi. 
                setTimeout(function () { keyboardDidShowListener.remove(); }, 150);
            });
            navigation.goBack();
            setTimeout(function () { keyboardDidShowListener.remove(); }, 1000);
            return;
        }
        props.backAction();
    };

    return (
        <TouchableOpacity onPress={goBack}>
            <ArrowBackIcon size="6" style={{color: (darkMode === "dark" ? AppColors.white : AppColors.black)}} />
        </TouchableOpacity>
    );
};

export default BackButton;
