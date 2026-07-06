import React from "react";
import { View, Text } from "react-native";
import Toast from "react-native-root-toast";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "@/constants/colors";

const getTypeConfig = (type) => {
    switch (type) {
        case "success":
            return {
                iconName: "check-circle",
                iconColor: Colors.success || "#22c55e",
            };
        case "info":
            return {
                iconName: "information",
                iconColor: "#3b82f6",
            };
        case "warning":
            return {
                iconName: "alert",
                iconColor: "#eab308",
            };
        case "danger":
            return {
                iconName: "close-circle",
                iconColor: "#ef4444",
            };
        default:
            return {
                iconName: "check-circle",
                iconColor: Colors.success || "#22c55e",
            };
    }
};

const showToast = (message, options = {}, type = "success") => {
    // Global default configurations automatically applied to all toasts
    const DEFAULT_OPTIONS = {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM - 40,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: "#000000",
        opacity: 0.9,
    };

    // Merge global defaults with custom per-toast options
    const mergedOptions = {
        ...DEFAULT_OPTIONS,
        ...options,
    };

    const { iconName, iconColor } = getTypeConfig(type);

    // Render customized view with icons if the message is a string
    const content =
        typeof message === "string" ? (
            <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
                <Text
                    style={{
                        color: "#ffffff",
                        fontSize: 13,
                        fontWeight: "bold",
                    }}
                >
                    {message}
                </Text>
                <MaterialCommunityIcons
                    name={iconName}
                    size={16}
                    color={iconColor}
                />
            </View>
        ) : (
            message
        );

    // Return the RootSiblings instance so callers can still manually dismiss or manipulate it
    return Toast.show(content, mergedOptions);
};

const customToast = {
    ...Toast,
    show: (message, options) => showToast(message, options, "success"),
    success: (message, options) => showToast(message, options, "success"),
    info: (message, options) => showToast(message, options, "info"),
    warning: (message, options) => showToast(message, options, "warning"),
    danger: (message, options) => showToast(message, options, "danger"),
};

export default customToast;
