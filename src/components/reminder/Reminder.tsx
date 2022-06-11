import { Text, View, ScrollView } from 'native-base';
import React from 'react';
import Language from '../../translations/Language';
import Header from '../shared/Header';
import { StyleSheet, useColorScheme } from "react-native";
import { AppColors } from '../../utils/commonStyle';
import { useNavigation } from '@react-navigation/core';
import constants from '../../../constants';
import BackButton from '../shared/BackButton';

const language = Language.getInstance();

const Reminder = () => {
    const navigation = useNavigation();
    const darkMode = useColorScheme()

    return (
        <View style={[styles.safeAreaView, { backgroundColor: (darkMode === "dark" ? AppColors.grayDarker : AppColors.white) }]}>
            <Header left={<BackButton />} headerText={language.render("reminder")} />
            <ScrollView style={styles.scrollView}>
            <Text >{language.render("reminder")}</Text>                
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
    },

})
export default Reminder;