import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    Dimensions,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import LinearGradient from "react-native-linear-gradient";
import { useState } from "react";

{
    /* <Feather name="heart" size={24} color="black" />; */
}

const TabBar = () => {
    const width = Dimensions.get("window").width;
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
        <View className="absolute bottom-0 flex flex-row w-full h-[60px] border-t border-gray-50">
            {tabs.map((tab) => (
                <LinearGradient
                    key={tab.text}
                    colors={
                        currentScreen === tab.text
                            ? ["#fbcfe8", "#fff"]
                            : ["#fff", "#fff"]
                    } // Gradient colors
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }} // Vertical gradient
                    style={{
                        width: width / 3,
                        borderTopWidth: 2,
                        borderTopColor:
                            currentScreen === tab.text ? "#ec4899" : "white",
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={{
                            flex: 1,
                            // justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            width: "100%",
                            paddingTop: 5,
                        }}
                        onPress={() => setCurrentScreen(tab.text)}
                    >
                        <tab.icon
                            name={tab.iconName}
                            size={20}
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
                    </TouchableOpacity>
                </LinearGradient>
            ))}
        </View>
    );
};

export default TabBar;
