import constants from "../../constants";
import localStorageHelper from "./localStorageHelper";

export interface BirthdayReminderList {
    name: string;
    date: Date;
    remind: boolean;
    birthYear: number;
    important: boolean;
    beforeRemind: number;
};

export const saveBirthReminderList = async (val: BirthdayReminderList[]) => {
    await localStorageHelper.store(constants.storeKeys.birthReminderList, val);
};

export const getBirthReminderList = async (): Promise<BirthdayReminderList[]> => {
    return await localStorageHelper.retrieve<BirthdayReminderList[]>(constants.storeKeys.birthReminderList);
};


export const saveOwnerBirthDay = async (val: BirthdayReminderList) => {
    await localStorageHelper.store(constants.storeKeys.birthReminderOwner, val);
};

export const getOwnerBirthDays = async (): Promise<BirthdayReminderList> => {
    return await localStorageHelper.retrieve<BirthdayReminderList>(constants.storeKeys.birthReminderOwner);
};