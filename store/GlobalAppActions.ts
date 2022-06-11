import {
    AppNavHistoryItem,
} from "./GlobalAppContext";

export interface AppNavigateChanged {
    type: "@globalApp/appNavigateChanged";
    payload: AppNavHistoryItem;
}

type GlobalAppActionType =
    // | ile ayrımlı olarak eklenmeli
    AppNavigateChanged
    ;

export default GlobalAppActionType;
