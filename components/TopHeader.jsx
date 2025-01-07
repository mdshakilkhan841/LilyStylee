import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import Logo from "../assets/images/logo.svg";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

const TopHeader = () => {
    const fullText = "Search for brands and products";
    const [displayedText, setDisplayedText] = useState("");
    const [typingIndex, setTypingIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDisplayedText((prev) => fullText.slice(0, typingIndex));
            setTypingIndex((prev) => (prev < fullText.length ? prev + 1 : 0));
        }, 150); // Adjust typing speed here

        return () => clearInterval(interval);
    }, [typingIndex]);

    return (
        <View className="">
            {/* Header */}
            <View className="flex flex-row items-center justify-between">
                <View className="px-4">
                    <Logo width={115} />
                </View>
                <View className="flex flex-row items-center">
                    <TouchableOpacity activeOpacity={0.6} className="p-4">
                        <SimpleLineIcons name="bell" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} className="p-4">
                        {/* <SimpleLineIcons name="heart" size={24} color="black" /> */}
                        <SimpleLineIcons name="bag" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} className="p-4">
                        <FontAwesome6
                            name="circle-user"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search bar */}
            <View
                className="flex flex-row items-center justify-between h-12 px-5 mx-4 my-2 bg-white border border-gray-400 rounded-full"
                style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                    elevation: 5, // Android-specific shadow
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.6}
                    className="flex flex-row items-center w-4/6 h-full gap-3"
                >
                    <Ionicons name="search-sharp" size={24} color="#9ca3af" />
                    <Text className="text-gray-400">{displayedText}</Text>
                </TouchableOpacity>
                <View className="flex flex-row items-center gap-8">
                    <TouchableOpacity activeOpacity={0.6} className="">
                        <Feather name="camera" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} className="">
                        <Feather name="mic" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default TopHeader;
