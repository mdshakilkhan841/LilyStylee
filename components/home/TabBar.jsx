import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import LinearGradient from "react-native-linear-gradient";
import { useState } from "react";
import LogoMain from "@/assets/images/logo-main.svg";
import { useRouter } from "expo-router";

const TabBar = () => {
    const router = useRouter();
    const width = Dimensions.get("window").width;
    const [currentScreen, setCurrentScreen] = useState("Home");

    const tabs = [
        {
            text: "Home",
            icon: LogoMain,
            iconName: "home",
            screen: "index",
        },
        {
            text: "Lily's Choice",
            icon: FontAwesome6,
            iconName: "chess-queen",
            screen: "lilysChoice",
        },
        {
            text: "Wishlist",
            icon: Feather,
            iconName: "heart",
            screen: "wishlist",
        },

        {
            text: "Bag",
            icon: Feather,
            iconName: "shopping-bag",
            screen: "(cart)",
        },
    ];

    return (
        <View className="absolute bottom-0 flex flex-row w-full h-[60px]">
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
                        width: width / 4,
                        borderTopWidth: 2.5,
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
                        onPress={() => {
                            // setCurrentScreen(tab.text);
                            if (tab.screen !== "index") {
                                router.navigate(tab.screen);
                            }
                        }}
                    >
                        {tab.text === "Home" ? (
                            <LogoMain width={35} height={35} />
                        ) : (
                            <>
                                <tab.icon
                                    name={tab.iconName}
                                    size={20}
                                    color={
                                        currentScreen === tab.text
                                            ? "#db2777"
                                            : "black"
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
                            </>
                        )}
                    </TouchableOpacity>
                </LinearGradient>
            ))}
        </View>
    );
};

export default TabBar;
