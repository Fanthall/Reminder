import { Text, View, ScrollView, FlatList, Input } from 'native-base';
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
import FtIcon from '../shared/FtIcon';
import Loading from '../shared/Loading';
import DatePicker from 'react-native-date-picker';
import FtCheckBox from '../shared/FtCheckbox';
import { BirthdayReminderList, getBirthReminderList, getOwnerBirthDays, saveBirthReminderList, saveOwnerBirthDay } from '../../utils/birthdayReminder';
import ModalMessage from '../shared/ModalMessage';
import * as Progress from 'react-native-progress';
import { Dropdown } from 'react-native-element-dropdown';
import { saveWaterReminderList, WaterReminderList, StoredWaterReminder, getWaterReminderList } from '../../utils/waterReminder';
/*
TODO: Bildirimleri bir günün listesi olarak yapılacak ve bunları 1 günde tekrar edecek şekilde ayarlanacak
TODO: Bu bildirimler ayrıca butonlara sahip olacak için içmediğini belirten butonlar.
TODO: Local storage içinde o güne ait su miktarını güncelleyecek.
*/
const language = Language.getInstance();

const WaterReminder = () => {
    const navigation = useNavigation();
    const darkMode = useColorScheme()

    const [refresh, setRefresh] = useState<boolean>(false);
    const [newSave, seNewSave] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [remindAll, setRemindAll] = useState<boolean>(true);
    const [date, setDate] = useState<Date>(new Date());
    const [startHourPickerOpen, setStartHourPickerOpen] = useState<boolean>(false);
    const [endHourPickerOpen, setEndHourPickerOpen] = useState<boolean>(false);
    const [waterRemindWarning, setWaterRemindWarning] = useState<boolean>(false);
    const [startHour, setStartHour] = useState<string>(language.render("choseClock"));
    const [endHour, setEndHour] = useState<string>(language.render("choseClock"));
    const [maxWater, setMaxWater] = useState<string>("");
    const [maxWaterIsFocus, setMaxWaterIsFocus] = useState<boolean>(false);
    const [cupSizeIsFocus, setCupSizeIsFocus] = useState<boolean>(false);
    const [cupSize, setCupSize] = useState<string>("");
    const [progressValue, setProgressValue] = useState<number>();
    const [completedValue, setCompletedValue] = useState<number>();
    const [reminderList, setReminderList] = useState<WaterReminderList[]>([]);
    const [localStorageData, setLocalStorageData] = useState<StoredWaterReminder>({});

    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            const data = await getWaterReminderList();
            if (data) {
                setLocalStorageData(data);
                for (let i = 0; i < data.reminderList.length; i++) {
                    if (!data.reminderList[i].remindMe) {
                        setWaterRemindWarning(true);
                        setRemindAll(false);
                        break;
                    }
                }
                setStartHour(data.startHour);
                setEndHour(data.endHour);
                setMaxWater(data.dailyTotalSize.toString());
                setCupSize(data.cupSize.toString());
                setReminderList(data.reminderList);
                setCompletedValue(data.completedSize);
                setProgressValue(Math.round((((data.completedSize * 100) / data.dailyTotalSize) / 100) * 100) / 100);
                setRefresh(!refresh);
            }
            else {
                setStartHour(language.render("choseClock"));
                setEndHour(language.render("choseClock"));
                setMaxWater("");
                setCupSize("");
                setWaterRemindWarning(false);
                setReminderList([]);
                setProgressValue(0);
                setRefresh(!refresh);
            }
        };

        getData();
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, [newSave]);

    const getTime = (val: string) => {
        const hourVal = parseInt(val.split(":")[0]);
        const minuteVal = parseInt(startHour.split(":")[1]) + ((hourVal == 0 ? 24 : hourVal) * 60);
        return minuteVal * 60000;
    }
    const handleSave = async () => {
        const list: WaterReminderList[] = [];
        const count = parseInt(maxWater) / parseInt(cupSize);
        const start = getTime(startHour);
        const end = getTime(endHour);

        let differenceOfTimes = 0;
        if (start <= end) {
            differenceOfTimes = end - start;
        }
        else {
            console.log("else")
            differenceOfTimes = (end + ((1000 * 3600 * 24))) - start;
        }
        const differenceOfNotifications = differenceOfTimes / count;
        for (let i = 0; i < count; i++) {
            const time = new Date();
            time.setHours(0);
            time.setMinutes(0);
            time.setSeconds(0);
            time.setMilliseconds(0);
            list.push({
                id: i.toString(),
                time: new Date(((time.getTime() + start) + (differenceOfNotifications * i))),
                remindMe: true
            });
        }
        const waterReminderList: StoredWaterReminder = {
            dailyTotalSize: parseInt(maxWater),
            startHour: startHour,
            endHour: endHour,
            cupSize: parseInt(cupSize),
            completedSize: 0,
            reminderList: list,
        };
        await saveWaterReminderList(waterReminderList);
        seNewSave(!newSave);
        setRefresh(!refresh);
    };

    const renderSetup = () => {
        return (
            <View style={[styles.addPanel, { height: (waterRemindWarning ? 275 : 225) }]} key="addPanel">
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <View style={{ marginTop: 10, width: "48%" }}>
                        <Text>{language.render("firstWaterNotification")}</Text>
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
                            mode="time"
                            onConfirm={(date) => {
                                setStartHourPickerOpen(false);
                                setDate(new Date());
                                setStartHour(format(new Date(date), 'HH:mm', { locale: tr }));
                            }}
                            onCancel={() => {
                                setStartHourPickerOpen(false);
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 10, width: "48%" }}>
                        <Text>{language.render("lastWaterNotification")}</Text>
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
                            setEndHourPickerOpen(true);
                        }}>
                            <Text style={{
                                fontSize: 18,
                                marginTop: 5,
                                height: 80,
                                color: (endHour === language.render("choseClock") ? AppColors.grayLight : AppColors.black)
                            }}>{endHour}</Text>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={endHourPickerOpen}
                            date={date}
                            mode="time"
                            locale="tr-TR"
                            onConfirm={(date) => {
                                setEndHourPickerOpen(false);
                                setDate(new Date());
                                setEndHour(format(new Date(date), 'HH:mm', { locale: tr }));
                            }}
                            onCancel={() => {
                                setEndHourPickerOpen(false);
                            }}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <View style={{ marginTop: 10, width: "48%" }}>
                        <Text>{language.render("maxWater")}</Text>
                        <Dropdown
                            style={[styles.dropdown, maxWaterIsFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={maxWaterValue}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!maxWaterIsFocus ? language.render("waterSize") : '...'}
                            value={maxWater}
                            onFocus={() => setMaxWaterIsFocus(true)}
                            onBlur={() => setMaxWaterIsFocus(false)}
                            onChange={item => {
                                setMaxWater(item.value);
                                setMaxWaterIsFocus(false);
                            }}

                        />
                    </View>
                    <View style={{ marginTop: 10, width: "48%" }}>
                        <Text>{language.render("cupSize")}</Text>
                        <Dropdown
                            style={[styles.dropdown, cupSizeIsFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            data={cupSizeValue}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!cupSizeIsFocus ? language.render("waterSize") : '...'}
                            value={cupSize}
                            onFocus={() => setCupSizeIsFocus(true)}
                            onBlur={() => setCupSizeIsFocus(false)}
                            onChange={item => {
                                setCupSize(item.value);
                                setCupSizeIsFocus(false);
                            }}

                        />

                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    <TouchableOpacity
                        style={styles.save}
                        onPress={async () => {
                            handleSave()
                        }}>
                        <Text style={{ color: AppColors.white }}>{language.render("save")}</Text>
                    </TouchableOpacity>
                </View>
                {
                    waterRemindWarning &&
                    <Text style={{ color: AppColors.red }}>{language.render("waterWarning")}</Text>
                }
            </View >
        );
    }

    const renderResult = () => {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: "center",
                marginTop: 10,
            }}>
                <View style={{ width: "30%" }}></View>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: "center",
                    width: "40%",
                    marginTop: 10,
                }}>
                    <Text>{language.render("drankValue")}</Text>
                    <Progress.Circle size={60} showsText={true} thickness={4} progress={progressValue} animated={true} formatText={() => {
                        if (progressValue)
                            return `${progressValue * 100}%`;
                        return "0%";
                    }} />
                    <Text>{completedValue + "/" + maxWater + " ml"}</Text>
                </View>
                <View style={{
                    width: "30%",
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: "center",
                }}>
                    <FtCheckBox selected={remindAll}
                        onPress={async () => {
                            reminderList.map((item)=>{
                                item.remindMe=!remindAll;
                            })
                            localStorageData.reminderList = reminderList;
                            await saveWaterReminderList(localStorageData);                         
                            setReminderList(reminderList);
                            setWaterRemindWarning(!waterRemindWarning);
                            setLocalStorageData(localStorageData);
                            setRemindAll(!remindAll);
                            setRefresh(!refresh);
                        }}
                        style={{ alignSelf: 'center', justifyContent: "center" }}
                        iconSelected="notifications-outline"
                        iconTypeSelected='Ionicons'
                        iconDeselected="notifications-off-outline"
                        iconTypeDeselected='Ionicons'
                        iconColorSelected={AppColors.orange}
                        iconColorDeselected={AppColors.black}
                    />
                </View>
            </View >
        )
    }

    const renderList = ({ item, index }) => {
        return (
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: AppColors.grayUltraLight,
                height: 40,
                marginTop: 5,
                padding: 5,
                borderRadius: 10
            }}>
                <Text>{format(new Date(item.time), 'HH:mm ', { locale: tr })}</Text>
                <FtCheckBox selected={item.remindMe}
                    onPress={async () => {
                        reminderList[index].remindMe = !reminderList[index].remindMe;
                        setWaterRemindWarning(false);
                        for (let i = 0; i < reminderList.length; i++) {
                            if (!reminderList[i].remindMe) {
                                setWaterRemindWarning(true);
                                break;
                            }
                        }
                        localStorageData.reminderList = reminderList;
                        await saveWaterReminderList(localStorageData);
                        setReminderList(reminderList);
                        setLocalStorageData(localStorageData);
                        setRefresh(!refresh);
                    }}
                    style={{ alignSelf: 'center', justifyContent: "center" }}
                    iconSelected="notifications-outline"
                    iconTypeSelected='Ionicons'
                    iconDeselected="notifications-off-outline"
                    iconTypeDeselected='Ionicons'
                    iconColorSelected={AppColors.orange}
                    iconColorDeselected={AppColors.black}
                />
            </View>
        );
    }

    return (
        <View style={[styles.safeAreaView, { backgroundColor: (darkMode === "dark" ? AppColors.grayDarker : AppColors.white) }]}>
            <Header left={<BackButton />} headerText={language.render("waterReminder")} />
            {loading ? <Loading /> :
                <ScrollView style={styles.scrollView}>
                    <View style={{ flex: 1, flexDirection: "column", padding: 0 }}>
                        {renderSetup()}
                        {renderResult()}
                        {(reminderList && reminderList.length > 0) &&
                            <FlatList data={reminderList} renderItem={renderList} />//TODO: Buradaki flatlist virtual hatası çözülecek.
                        }
                    </View>
                </ScrollView>}
        </View>
    );
}
const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        padding: 0,
        margin: 0,
    },
    scrollView: {
        width: "100%",
        flexDirection: 'column',
        margin: 16,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    addPanel: {
        width: "100%",
        margin: 0,
        padding: 15,
        paddingTop: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        zIndex: 10,
    },
    save: {
        backgroundColor: AppColors.baseColor,
        width: "100%",
        justifyContent: 'center',
        alignItems: "center",
        height: 35,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        zIndex: 10,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
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
export default WaterReminder;

const maxWaterValue = [
    { label: '2.5 Lt', value: '2500' },
    { label: '3 Lt', value: '3000' },
    { label: '3.5 Lt', value: '3500' },
    { label: '4 LT', value: '4000' },
    { label: '4.5 Lt', value: '4500' },
    { label: '5 Lt', value: '5000' },
    { label: '5.5 Lt', value: '5500' },
    { label: '6 Lt', value: '6000' },
    { label: '6.5 Lt', value: '6500' },
    { label: '7 Lt', value: '7000' },
    { label: '7.5 Lt', value: '7500' },
    { label: '8 Lt', value: '8000' },
    { label: '8.5 Lt', value: '8500' },
    { label: '9 Lt', value: '9000' },
    { label: '9.5 Lt', value: '9500' },
    { label: '10 Lt', value: '10000' },
];
const cupSizeValue = [
    { label: '200 ml', value: '200' },
    { label: '250 ml', value: '250' },
    { label: '300 ml', value: '300' },
    { label: '350 ml', value: '350' },
    { label: '400 ml', value: '400' },
    { label: '450 ml', value: '450' },
    { label: '500 ml', value: '500' },
    { label: '550 ml', value: '550' },
    { label: '600 ml', value: '600' },
    { label: '650 ml', value: '650' },
    { label: '700 ml', value: '700' },
    { label: '750 ml', value: '750' },
    { label: '800 ml', value: '800' },
    { label: '850 ml', value: '850' },
    { label: '900 ml', value: '900' },
    { label: '950 ml', value: '950' },
    { label: '1 Lt', value: '1000' },
];