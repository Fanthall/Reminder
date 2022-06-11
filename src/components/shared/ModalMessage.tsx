import {  Text } from 'native-base';
import {
    View,
} from 'native-base';
import React, {
    Fragment,
    FunctionComponent,
} from 'react';
import {
    Modal,
    StyleSheet, TouchableOpacity
} from 'react-native';

import { AppColors } from '../../utils/commonStyle';
import Icon from "react-native-vector-icons/FontAwesome5";

interface ModalMessageProps {
    children?: any
    modalVisible?: boolean;
    title: string;
    bodyText?: string;
    buttonTitlePositive?: string;
    buttonTitleNegative?: string;
    positiveButtonOnPress?: () => void;
    negativeButtonOnPress?: () => void;
    closeHandler: () => void;
}

const ModalMessage: FunctionComponent<ModalMessageProps> = (props) => {
    return (
        <Modal animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                props.closeHandler();
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView} >
                    <View style={{ ...styles.layoutContaiıner }}>
                        <Text style={{ ...styles.modalText, fontWeight: 'bold', }}>{props.title}</Text>
                        <TouchableOpacity
                            onPress={() => props.closeHandler()}>                            
                            <Icon name="times" style={{fontSize:25}}/>

                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        {props.children ?
                            <Fragment>{props.children}</Fragment>
                            : <Text style={{ ...styles.modalText, }}>{props.bodyText}</Text>
                        }
                    </View>
                    <View style={props.buttonTitleNegative && props.buttonTitlePositive
                        ? { ...styles.layoutContaiıner }
                        : { ...styles.alternativeLayoutButtonContainer }}>
                        {props.buttonTitleNegative ?
                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: AppColors.white }}
                                onPress={() => {
                                    props.closeHandler();
                                    if (props.negativeButtonOnPress) {
                                        props.negativeButtonOnPress();
                                    }
                                }}>
                                <Text style={{ ...styles.textStyle, color: AppColors.grayDark }}>{props.buttonTitleNegative}</Text>
                            </TouchableOpacity> : null}
                        {props.buttonTitlePositive ?
                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: AppColors.red }}
                                onPress={() => {
                                    props.closeHandler();
                                    if (props.positiveButtonOnPress) {
                                        props.positiveButtonOnPress();
                                    }
                                }}
                            >
                                <Text style={styles.textStyle}>{props.buttonTitlePositive}</Text>
                            </TouchableOpacity>
                            : null}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ModalMessage;

const styles = StyleSheet.create({
    modalWrapper: {
        flex: 2,
        alignContent: 'stretch',
    },
    centeredView: {
        flex: 2,
        justifyContent: 'center',
        marginTop: 22
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 17
    },
    modalView: {

        backgroundColor: AppColors.grayUltraLight,
        borderRadius: 20,
        padding: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    layoutContaiıner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    alternativeLayoutButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    openButton: {
        backgroundColor: AppColors.white,
        borderRadius: 10,
        elevation: 5,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.5,
        shadowRadius: 8,
    },
    textStyle: {
        color: AppColors.white,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
});
