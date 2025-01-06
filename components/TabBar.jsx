import { View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import { useState } from "react";

const TabBar = () => {
    const [currentScreen, setCurrentScreen] = useState("Home");

    const tabs = [
        {
            key: "Home",
            icon: Feather,
            iconName: "home",
            text: "Home",
        },
        {
            key: "Wishlist",
            icon: MaterialIcons,
            iconName: "favorite-border",
            text: "Wishlist",
        },
        {
            key: "Bag",
            icon: SimpleLineIcons,
            iconName: "handbag",
            text: "Bag",
        },
    ];

    return (
        <View className="absolute bottom-0 flex flex-row h-16 border-t border-gray-50">
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.key}
                    activeOpacity={0.6}
                    className={`w-1/3 ${
                        currentScreen === tab.key &&
                        "border-t-2 border-pink-600"
                    }`}
                    onPress={() => setCurrentScreen(tab.key)}
                >
                    <LinearGradient
                        colors={
                            currentScreen === tab.key
                                ? ["#fbcfe8", "#fff"]
                                : ["#fff", "#fff"]
                        } // Gradient colors
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }} // Vertical gradient
                        className="flex items-center justify-center w-full h-full"
                    >
                        <tab.icon
                            name={tab.iconName}
                            size={24}
                            color={
                                currentScreen === tab.key ? "#db2777" : "black"
                            }
                        />
                        <Text
                            className={
                                currentScreen === tab.key
                                    ? "text-pink-600"
                                    : "text-black"
                            }
                        >
                            {tab.text}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default TabBar;
