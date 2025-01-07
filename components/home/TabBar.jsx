import { View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import LinearGradient from "react-native-linear-gradient";
import { useState } from "react";

{
    /* <Feather name="heart" size={24} color="black" />; */
}

const TabBar = () => {
    const [currentScreen, setCurrentScreen] = useState("Home");

    const tabs = [
        {
            text: "Home",
            icon: Feather,
            iconName: "home",
        },
        {
            text: "Wishlist",
            icon: Feather,
            iconName: "heart",
        },
        {
            text: "Bag",
            icon: Feather,
            iconName: "shopping-bag",
        },
    ];

    return (
        <View className="absolute bottom-0 flex flex-row h-16 border-t border-gray-50">
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.text}
                    activeOpacity={0.6}
                    className={`w-1/3 ${
                        currentScreen === tab.text &&
                        "border-t-2 border-pink-600"
                    }`}
                    onPress={() => setCurrentScreen(tab.text)}
                >
                    <LinearGradient
                        colors={
                            currentScreen === tab.text
                                ? ["#fbcfe8", "#fff"]
                                : ["#fff", "#fff"]
                        } // Gradient colors
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }} // Vertical gradient
                        className="flex items-center justify-center w-full h-full"
                    >
                        <tab.icon
                            name={tab.iconName}
                            size={22}
                            color={
                                currentScreen === tab.text ? "#db2777" : "black"
                            }
                        />
                        <Text
                            className={`sm:text-base text-sm ${
                                currentScreen === tab.text
                                    ? "text-pink-600"
                                    : "text-black"
                            }`}
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
