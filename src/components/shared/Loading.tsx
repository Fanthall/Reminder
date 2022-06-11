import React, { FunctionComponent } from "react";
import { View } from "native-base";
import { ActivityIndicator, StyleSheet } from "react-native";

const Loading: FunctionComponent<{}> = () => {
    return (
        <View style={styles.container} >
            <ActivityIndicator size="large" color="#79cdcd" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        justifyContent: 'center',
        height:"100%",
        width:"100%",
    }
});

export default Loading;
