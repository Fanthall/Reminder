import { Text, View, ScrollView, Input } from 'native-base';
import React, { useEffect, useState } from 'react';
import Language from '../../translations/Language';
import Header from '../shared/Header';
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { AppColors } from '../../utils/commonStyle';
import { useNavigation } from '@react-navigation/core';
import constants from '../../../constants';
import BackButton from '../shared/BackButton';
import { format } from "date-fns";
import { tr } from 'date-fns/locale';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';

const language = Language.getInstance();

const Reminder = () => {
    const navigation = useNavigation();
    const darkMode = useColorScheme()

    const [date, setDate] = useState<Date>(new Date());
    const [startHour, setStartHour] = useState<string>(language.render("choseClock"));
    const [notificationHeader, setNotificationHeader] = useState<string>("");
    const [notificationBody, setNotificationBody] = useState<string>("");
    const [startHourPickerOpen, setStartHourPickerOpen] = useState<boolean>(false);


    const [selectedRepeatType, setSelectedRepeatType] = useState<string>("day");
    const [selectedRepeatTimePeriod, setSelectedRepeatTimePeriod] = useState<string>("");
    const [repeatTypeIsFocus, setRepeatTypeIsFocus] = useState<boolean>(false);
    const [repeatTimePeriodIsFocus, setRepeatTimePeriodIsFocus] = useState<boolean>(false);

    const getTimePeriodByType = () => {
        console.log(selectedRepeatType)
        switch (selectedRepeatType) {
            default:
                return repeatTimePeriodDay;
            case "week":
                return repeatTimePeriodWeek;
            case "month":
                return repeatTimePeriodMonth;
            case "year":
                return repeatTimePeriodYear;
        }
    }
    const [repeatTimePeriod, setRepeatTimePeriod] = useState<any>();

    useEffect(() => {
        setRepeatTimePeriod(getTimePeriodByType());
    }, [selectedRepeatType])
    const renderAddinonPart = () => {
        return (<View>
            <View style={{ marginTop: 10, width: "100%" }}>
                <Text>{language.render("remindDate")}</Text>
                <TouchableOpacity style={{
                    width: "100%",
                    borderColor: AppColors.grayLighter,
                    borderWidth: 0.75,
                    borderRadius: 5,
                    justifyContent: "flex-start",
                    marginTop: 2,
                    paddingLeft: 10,
                    height: 35,
                }} onPress={() => {
                    setStartHourPickerOpen(true);
                }}>
                    <Text style={{
                        fontSize: 18,
                        marginTop: 5,
                        height: 80,
                        color: (startHour === language.render("choseClock") ? AppColors.grayLight : AppColors.black)
                    }}>{startHour}</Text>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={startHourPickerOpen}
                    date={date}
                    mode="datetime"
                    onConfirm={(date) => {
                        setStartHourPickerOpen(false);
                        setDate(new Date());
                        setStartHour(format(new Date(date), 'dd MMMM yyyy HH:mm', { locale: tr }));
                    }}
                    onCancel={() => {
                        setStartHourPickerOpen(false);
                    }}
                />
            </View>
            <View style={{ marginTop: 10 }}>
                <Text>{language.render("notificationTitle")}</Text>
                <Input
                    value={notificationHeader.toString()}
                    mt={0.2}
                    size="xl"
                    placeholder={language.render("notificationHeaderPlaceHolder")}
                    onChangeText={(value) => {
                        setNotificationHeader(value);
                    }} />
            </View>
            <View style={{ marginTop: 10 }}>
                <Text>{language.render("notificationBody")}</Text>
                <Input
                    value={notificationBody.toString()}
                    mt={0.2}
                    size="xl"
                    placeholder={language.render("notificationBodyPlaceHolder")}
                    onChangeText={(value) => {
                        setNotificationBody(value);
                    }} />
            </View>
            <View style={{ width: "100%", height: "100%", flexDirection: "row", justifyContent: "space-between", paddingLeft: 3, paddingRight: 3 }}>
                <View style={{ marginTop: 10, width: "47%" }}>
                    <Text>{language.render("repeatType")}</Text>
                    <Dropdown
                        style={[styles.dropdown, repeatTypeIsFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={repeatType}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!repeatTypeIsFocus ? language.render("repeatType") : '...'}
                        value={selectedRepeatType}
                        onFocus={() => setRepeatTypeIsFocus(true)}
                        onBlur={() => setRepeatTypeIsFocus(false)}
                        onChange={item => {
                            setSelectedRepeatType(item.value);
                            setRepeatTypeIsFocus(false);
                        }}

                    />
                </View>
                <View style={{ marginTop: 10, width: "47%" }}>
                    <Text>{language.render("repeatTimePeriod")}</Text>
                    <Dropdown
                        style={[styles.dropdown, repeatTimePeriodIsFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={repeatTimePeriod}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!repeatTimePeriodIsFocus ? language.render("repeatTimePeriod") : '...'}
                        value={selectedRepeatTimePeriod}
                        onFocus={() => setRepeatTimePeriodIsFocus(true)}
                        onBlur={() => setRepeatTimePeriodIsFocus(false)}
                        onChange={item => {
                            setSelectedRepeatTimePeriod(item.value);
                            setRepeatTimePeriodIsFocus(false);
                        }}

                    />
                </View>
            </View>
        </View>);
    };

    const renderResult = () => {
        return (<></>);
    };

    return (
        <View style={[styles.safeAreaView, { backgroundColor: (darkMode === "dark" ? AppColors.grayDarker : AppColors.white) }]}>
            <Header left={<BackButton />} headerText={language.render("reminder")} />
            <ScrollView style={styles.scrollView}>
                <View style={{ flex: 1, flexDirection: "column", padding: 0 }}>
                    {renderAddinonPart()}
                    {renderResult()}
                    {//<FlatList data={reminderList} renderItem={renderList} />//TODO: Buradaki flatlist virtual hatası çözülecek.
                    }
                </View>
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
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },

})
export default Reminder;

const repeatType = [
    { label: 'Gün', value: 'day' },
    { label: 'Hafta', value: 'week' },
    { label: 'Ay', value: 'month' },
    { label: 'Yıl', value: 'year' },
];

const repeatTimePeriodDay = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
    { label: '13', value: '13' },
    { label: '14', value: '14' },
    { label: '15', value: '15' },
    { label: '16', value: '16' },
    { label: '17', value: '17' },
    { label: '18', value: '18' },
    { label: '19', value: '19' },
    { label: '20', value: '20' },
    { label: '21', value: '21' },
    { label: '21', value: '22' },
    { label: '23', value: '23' },
    { label: '24', value: '24' },
    { label: '25', value: '25' },
    { label: '26', value: '26' },
    { label: '27', value: '27' },
    { label: '28', value: '28' },
    { label: '29', value: '29' },
    { label: '30', value: '30' },
    { label: '31', value: '31' },
];

const repeatTimePeriodMonth = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },

];
const repeatTimePeriodWeek = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
];
const repeatTimePeriodYear = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
];