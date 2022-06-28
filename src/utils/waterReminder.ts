import constants from "../../constants";
import localStorageHelper from "./localStorageHelper";

export interface StoredWaterReminder {
    dailyTotalSize: number;
    startHour: string;
    endHour: string;
    cupSize: number;
    completedSize: number;
    reminderList: WaterReminderList[];
    remindMe: boolean;
};

export interface WaterReminderList {
    id: string;
    time: Date;
};

export const saveWaterReminderList = async (val: StoredWaterReminder) => {
    await localStorageHelper.store(constants.storeKeys.waterReminder, val);
};

export const getWaterReminderList = async (): Promise<StoredWaterReminder> => {
    return await localStorageHelper.retrieve<StoredWaterReminder>(constants.storeKeys.waterReminder);
};
