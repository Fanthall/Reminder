import { Text, View, ScrollView, FlatList, Input } from 'native-base';
import React, { useEffect, useState } from 'react';
import Language from '../../translations/Language';
import Header from '../shared/Header';
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { AppColors } from '../../utils/commonStyle';
import { useNavigation } from '@react-navigation/core';
import constants from '../../../constants';
import BackButton from '../shared/BackButton'; import moment from 'moment';
import { format } from "date-fns";
import { tr } from 'date-fns/locale';
import FtIcon from '../shared/FtIcon';
import Loading from '../shared/Loading';
import DatePicker from 'react-native-date-picker';
import FtCheckBox from '../shared/FtCheckbox';
import { BirthdayReminderList, getBirthReminderList, getOwnerBirthDays, saveBirthReminderList, saveOwnerBirthDay } from '../../utils/birthdayReminder';
import ModalMessage from '../shared/ModalMessage';

const language = Language.getInstance();

const BirthdayReminder = () => {
    const navigation = useNavigation();
    const darkMode = useColorScheme()
    const [birthdayReminderList, setBirthdayReminderList] = useState<BirthdayReminderList[]>();
    const [refresh, setRefresh] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [date, setDate] = useState<Date>(new Date());
    const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
    const [importantCheckbox, setImportantCheckbox] = useState<boolean>(false);
    const [remindCheckbox, setRemindCheckbox] = useState<boolean>(false);
    const [ownerWarning, setOwnerWarning] = useState<boolean>(false);
    const [saveOwnerWarning, setSaveOwnerWarning] = useState<boolean>(false);
    const [dateText, setDateText] = useState<string>("Tarih Seçin");
    const [name, setName] = useState<string>();
    const [beforeRemind, setBeforeRemind] = useState<string>("");
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [birthYear, setBirthYear] = useState<number>();
    useEffect(() => {
        setLoading(true);
        const getList = async () => {
            const ownerBirthday = await getOwnerBirthDays();
            if (!ownerBirthday) {
                setOwnerWarning(true);
            }
            let birthdayList = await getBirthReminderList();
            if (!birthdayList) {
                if (ownerBirthday) {
                    await saveBirthReminderList([ownerBirthday])
                    birthdayList = await getBirthReminderList();
                }
            }
            if (birthdayList) {
                const checkAndSetDate = (val: Date) => {
                    const date = new Date(val.setFullYear(new Date().getFullYear()));
                    date.setHours(23);
                    date.setMinutes(59)
                    if (date.getTime() < new Date().getTime()) {
                        return new Date(val.setFullYear(new Date().getFullYear() + 1))
                    }
                    return (date)
                }
                let owner = false;
                birthdayList.map((item) => {
                    if (item.name.includes("👑")) {
                        owner = true;
                    }
                    item.date = checkAndSetDate(new Date(item.date));
                });
                if (!owner) {
                    if (ownerBirthday) {
                        birthdayList.push(ownerBirthday);
                    }
                }
                const orderedDummy: BirthdayReminderList[] | any = birthdayList.sort((a, b) => {
                    return new Date(a.date).getTime() - new Date(b.date).getTime();

                });
                orderedDummy.map((item) => {
                    item.date = checkAndSetDate(new Date(item.date));
                })
                setBirthdayReminderList(orderedDummy);
            }
        }
        getList();

        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, [refresh]);

    const renderItem = ({ item, index }) => {
        const tempDate = new Date(item.date);
        const day = tempDate.getDate();
        const month = tempDate.getMonth() + 1;
        const year = tempDate.getFullYear();
        let containerColor = AppColors.FrameGray;
        if (tempDate.getTime() - new Date().getTime() < 2592000000) {
            containerColor = (index < 4 ? AppColors[index.toString()] : AppColors.FrameGray);
        }
        return (
            <View style={[{ backgroundColor: containerColor }, styles.rowContainer]}>
                <View style={{ flexDirection: "column", backgroundColor: "transparent", width: "60%" }}>
                    <Text bold>{item.name + ", " + (new Date().getFullYear() - item.birthYear)}</Text>
                    <Text>{numberCheck(day) + "/" + numberCheck(month) + "/" + year + (item.beforeRemind != 0 ? "\n" + item.beforeRemind + " gün önce ilk bildirim." : "\nErken hatırlatma yok.")}</Text>
                </View>
                <View style={{ flexDirection: "row", backgroundColor: "transparent", width: "30%", justifyContent: "space-between" }}>
                    <TouchableOpacity onPress={async () => {
                        setDateText(format(new Date(item.date), 'MM/dd/yyyy', { locale: tr }));
                        setDate(new Date(item.date));
                        setName(item.name);
                        if (item.name.includes("👑")) {
                            setSaveOwnerWarning(true);
                        }
                        else {
                            setSaveOwnerWarning(false);
                        }
                        setRemindCheckbox(item.remind);
                        setImportantCheckbox(item.important);
                        setBeforeRemind(item.beforeRemind);
                        setSelectedIndex(index);
                        setBirthYear(item.birthYear);
                        setRefresh(!refresh);
                    }}>

                        <FtIcon icon={"edit"} iconType='Feather' iconSize={22} iconColor={AppColors.black} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={async () => {
                        birthdayReminderList[index].important = !item.important;
                        await saveBirthReminderList(birthdayReminderList);
                        setRefresh(!refresh);
                    }}>
                        {item.important ?
                            (<FtIcon icon={"star"} iconType='Entypo' iconSize={22} iconColor={AppColors.green} />)
                            :
                            (<FtIcon icon={"star-outlined"} iconType='Entypo' iconSize={22} iconColor={AppColors.black} />)
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={async () => {
                        birthdayReminderList[index].remind = !item.remind;
                        await saveBirthReminderList(birthdayReminderList);
                        setRefresh(!refresh);
                    }}>
                        {item.remind ?
                            (<FtIcon icon={"notifications-outline"} iconType='Ionicons' iconSize={22} iconColor={AppColors.orange} />)
                            :
                            (<FtIcon icon={"notifications-off-outline"} iconType='Ionicons' iconSize={22} iconColor={AppColors.black} />)
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={async () => {
                        if (birthdayReminderList[index].name.includes("👑")) {
                            await saveOwnerBirthDay(null);
                        }
                        birthdayReminderList.splice(index, 1);
                        await saveBirthReminderList(birthdayReminderList);
                        setRefresh(!refresh);
                    }}>

                        <FtIcon icon={"trash-alt"} iconType='FontAwesome5' iconSize={22} iconColor={AppColors.red} />
                    </TouchableOpacity>
                </View>

            </View>
        );
    };

    const numberCheck = (val: number): string => {
        return (val < 10 ? "0" + val : val.toString());
    };

    const renderAddPanel = () => {
        return (
            <View style={[styles.addPanel, { height: (saveOwnerWarning ? 350 : 325) }]} key="addPanel">
                <View style={{ marginTop: 10 }}>
                    {saveOwnerWarning && <Text style={{ color: AppColors.red }}>{language.render("yourBirthday")}</Text>}
                    <Text>{language.render("name")}</Text>
                    <Input
                        value={name}
                        mt={0.2}
                        size="xl"
                        placeholder="Adı Soyadı"
                        onChangeText={(value) => {
                            setName(value);
                        }} />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>{language.render("dateOfTheBirth")}</Text>
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
                        setDatePickerOpen(true);
                    }}>
                        <Text style={{ fontSize: 18, marginTop: 5, color: (dateText === "Tarih Seçin" ? AppColors.grayLight : AppColors.black) }}>{language.render("dateOfTheBirth") + ":" + dateText}</Text>
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        open={datePickerOpen}
                        date={date}
                        mode="date"
                        locale="tr-TR"
                        onConfirm={(date) => {
                            setDatePickerOpen(false);
                            setDate(date);
                            setDateText(format(new Date(date), 'MM/dd/yyyy', { locale: tr }));
                        }}
                        onCancel={() => {
                            setDatePickerOpen(false);
                        }}
                    />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text>{language.render("beforeRemind")}</Text>
                    <Input
                        value={beforeRemind.toString()}
                        mt={0.2}
                        size="xl"
                        keyboardType={'numeric'}
                        placeholder="Gün önce hatırlat"
                        onChangeText={(value) => {
                            setBeforeRemind(value);
                        }} />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-around", marginTop: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <FtCheckBox selected={importantCheckbox}
                            onPress={() => setImportantCheckbox(!importantCheckbox)}
                            style={{ alignSelf: 'flex-start' }}
                            iconSelected="star"
                            iconTypeSelected='Entypo'
                            iconDeselected="star-outlined"
                            iconTypeDeselected='Entypo'
                            iconColorSelected={AppColors.green}
                            iconColorDeselected={AppColors.black}
                        />
                        <Text> Önemli</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <FtCheckBox selected={remindCheckbox}
                            onPress={() => setRemindCheckbox(!remindCheckbox)}
                            style={{ alignSelf: 'flex-start' }}
                            iconSelected="notifications-outline"
                            iconTypeSelected='Ionicons'
                            iconDeselected="notifications-off-outline"
                            iconTypeDeselected='Ionicons'
                            iconColorSelected={AppColors.orange}
                            iconColorDeselected={AppColors.black}
                        />
                        <Text> Hatırlat</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    <TouchableOpacity style={styles.save} onPress={async () => {
                        let objTemp: BirthdayReminderList = {
                            name: name,
                            date: date,
                            remind: remindCheckbox,
                            birthYear: (selectedIndex >= 0 ? birthYear : date.getFullYear()),
                            important: importantCheckbox,
                            beforeRemind: (beforeRemind == "" ? 0 : parseInt(beforeRemind)),
                        };
                        if (saveOwnerWarning) {
                            objTemp = {
                                name: name + (name.includes("👑") ? "" : "👑"),
                                date: date,
                                remind: remindCheckbox,
                                birthYear: (selectedIndex >= 0 ? birthYear : date.getFullYear()),
                                important: importantCheckbox,
                                beforeRemind: (beforeRemind == "" ? 0 : parseInt(beforeRemind)),
                            };
                            await saveOwnerBirthDay(objTemp);
                            setSaveOwnerWarning(false);
                        }
                        //TODO: Burada bildirim gönderme için notification ayarı eklenecek.
                        if (selectedIndex < 0) {
                            birthdayReminderList.push(objTemp);
                        }
                        else {
                            birthdayReminderList[selectedIndex] = objTemp;
                        }
                        await saveBirthReminderList(birthdayReminderList);
                        setDateText("Tarih Seçin");
                        setDate(new Date());
                        setName("");
                        setRemindCheckbox(false);
                        setImportantCheckbox(false);
                        setRefresh(!refresh);
                        setBeforeRemind("");
                        setBirthYear(undefined);
                        setSelectedIndex(-1);
                    }}>
                        <Text style={{ color: AppColors.white }}>{language.render("save")}</Text>
                    </TouchableOpacity>
                </View>
            </View >
        );

    }

    if (loading) {
        return <Loading />
    }
    return (
        <View style={[styles.safeAreaView, { backgroundColor: (darkMode === "dark" ? AppColors.grayDarker : AppColors.white) }]}>
            <Header left={<BackButton />} headerText={language.render("birthdayReminder")} />

            <ScrollView style={styles.scrollView}>
                {renderAddPanel()}
                {
                    <ModalMessage
                        modalVisible={ownerWarning}
                        bodyText={language.render("mustSetOwnerBirthday")}
                        title={language.render("ownerBirthdayTitle")} closeHandler={() => {
                            setOwnerWarning(false);
                            setSaveOwnerWarning(true);
                        }} />
                }
                <FlatList
                    style={{ backgroundColor: "transparent" }}
                    data={birthdayReminderList}
                    renderItem={renderItem}
                />

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
        height: "100%"
    },
    rowContainer: {
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 16,
        flexDirection: "row",
        height: 75,
        justifyContent: "center",
        alignItems: "center",
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
    addPanel: {
        width: "100%",
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
    input: {
        marginTop: 10
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
    }
})
export default BirthdayReminder;