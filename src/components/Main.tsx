import React from 'react';
import Language from '../translations/Language';
import Header from './shared/Header';
import { StyleSheet, useColorScheme } from "react-native";
import { AppColors } from '../utils/commonStyle';
import { useNavigation } from '@react-navigation/core';
import constants from '../../constants';
import { CardButton, CardButtonsWrapper } from './shared/CardButtons';
import { View, ScrollView, Text } from 'native-base';

const language = Language.getInstance();

const Main = () => {
    const navigation = useNavigation();
    const darkMode = useColorScheme();

    return (
        <View style={[styles.safeAreaView, { backgroundColor: (darkMode === "dark" ? AppColors.grayDarker : AppColors.white) }]}>
            <Header headerText={language.render("home")} />
            <ScrollView style={styles.scrollView}>
                <CardButtonsWrapper>
                    <CardButton buttonsPerRow={2}
                        onPress={
                            () => {
                                navigation.navigate(constants.routes.waterReminder);
                            }
                        }
                        iconType="Ionicons"
                        icon="water-outline"
                        label={language.render('waterReminder')} />
                    <CardButton buttonsPerRow={2}
                        onPress={
                            () => {
                                navigation.navigate(constants.routes.reminder);
                            }
                        }
                        iconType="FontAwesome5"
                        icon="clock"
                        label={language.render('reminder')} />
                    <CardButton buttonsPerRow={2}
                        onPress={
                            () => {
                                navigation.navigate(constants.routes.birthday);
                            }
                        }
                        iconType="FontAwesome5"
                        icon="birthday-cake"
                        label={language.render('birthdayReminder')} />
                        <CardButton buttonsPerRow={2}
                            onPress={
                                () => {
                                    navigation.navigate(constants.routes.hospital);
                                }
                            }
                            iconType="Ionicons"
                            icon="medical"
                            label={language.render('hospitalReminder')} />
                </CardButtonsWrapper>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        padding: 0
    },
    scrollView: {
        width: "100%",
        flexDirection: 'column',
        margin: 16,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        backgroundColor: 'transparent'
    },
    backgroundWhiteMode: {
        backgroundColor: "#f2f2f2",
        foregroundColor: AppColors.black,
    },
    backgroundDarkMode: {
        backgroundColor: AppColors.black,
        foregroundColor: AppColors.white
    }
})
export default Main;