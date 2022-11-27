import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons"
import { useDispatch, useSelector } from "react-redux"
import { removeList } from "../redux/actions"
import LotteView from "lottie-react-native"

export default function TodoItem({ item }) {
    const dispatch = useDispatch()

    const pressHandler = (key) => {
        dispatch(removeList(key))
    }
    return (
        <TouchableOpacity onPress={() => pressHandler(item._id)}>
            <View style={styles.item}>
                <MaterialIcons name="delete" size={18} color={"#333"} />
                <View style={styles.cont}>
                    <Text style={styles.itemText}>{item.text}</Text>
                    <Text style={styles.createTime}>{item.createdAt}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        padding: 16,
        marginTop: 16,
        borderColor: "#bbb",
        borderWidth: 1,
        borderStyle: "dashed",
        borderRadius: 10
    },
    cont: {
        width: "100%"
    },
    itemText: {
        marginLeft: 10,
    },
    createTime: {
        color: "grey",
        fontSize: 10,
        alignSelf: "flex-end",
        marginRight: 5,
        marginTop: 3
    }
})