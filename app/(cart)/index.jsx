import {
    View,
    Text,
    Platform,
    SafeAreaView,
    ScrollView,
    Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar, Button } from "react-native-paper";
import { router } from "expo-router";
import {
    AntDesign,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import CartItemCard from "@/components/cart/CartItemCard";

const index = () => {
    const [checked, setChecked] = useState(false);
    const [timeLeft, setTimeLeft] = useState(3600 * 24 * 7); // 7 days in seconds

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return {
            days: days < 10 ? `0${days}` : days,
            hours: hours < 10 ? `0${hours}` : hours,
            minutes: minutes < 10 ? `0${minutes}` : minutes,
            seconds:
                remainingSeconds < 10
                    ? `0${remainingSeconds}`
                    : remainingSeconds,
        };
    };

    const { days, hours, minutes, seconds } = formatTime(timeLeft);

    const demoProduct = {
        id: 1,
        title: "Essence Mascara Lash Princess",
        description:
            "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
        category: "beauty",
        price: 9.99,
        discountPercentage: 7.17,
        rating: 4.94,
        stock: 5,
        tags: ["beauty", "mascara"],
        brand: "Essence",
        sku: "RCH45Q1A",
        weight: 2,
        dimensions: {
            width: 23.17,
            height: 14.43,
            depth: 28.01,
        },
        warrantyInformation: "1 month warranty",
        shippingInformation: "Ships in 1 month",
        availabilityStatus: "Low Stock",
        reviews: [
            {
                rating: 2,
                comment: "Very unhappy with my purchase!",
                date: "2024-05-23T08:56:21.618Z",
                reviewerName: "John Doe",
                reviewerEmail: "john.doe@x.dummyjson.com",
            },
            {
                rating: 2,
                comment: "Not as described!",
                date: "2024-05-23T08:56:21.618Z",
                reviewerName: "Nolan Gonzalez",
                reviewerEmail: "nolan.gonzalez@x.dummyjson.com",
            },
            {
                rating: 5,
                comment: "Very satisfied!",
                date: "2024-05-23T08:56:21.618Z",
                reviewerName: "Scarlett Wright",
                reviewerEmail: "scarlett.wright@x.dummyjson.com",
            },
        ],
        returnPolicy: "30 days return policy",
        minimumOrderQuantity: 24,
        meta: {
            createdAt: "2024-05-23T08:56:21.618Z",
            updatedAt: "2024-05-23T08:56:21.618Z",
            barcode: "9164035109868",
            qrCode: "https://assets.dummyjson.com/public/qr-code.png",
        },
        images: [
            "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png",
        ],
        thumbnail:
            "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
    };

    return (
        <>
            <Appbar.Header style={{ backgroundColor: "white" }}>
                <Appbar.BackAction
                    onPress={() => {
                        router.back();
                    }}
                />
                <Appbar.Content
                    title="SHOPPING BAG"
                    titleStyle={{ fontSize: 16, fontWeight: "bold" }}
                />
                <Appbar.Action icon="heart-outline" onPress={() => {}} />
            </Appbar.Header>
            <SafeAreaView className="flex-1">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="px-4 py-2 bg-white">
                        <Text>Indicator</Text>
                    </View>

                    {/* Sale ends */}
                    <View className="flex-row flex-wrap items-center justify-center px-4 py-2 bg-white">
                        <Text className="px-2 text-sm font-bold text-center text-black">
                            Sale Ends in
                        </Text>

                        <Text className="px-1.5 py-0.5 font-bold text-center text-orange-600 bg-orange-100 rounded-lg text-sm">
                            {days}
                        </Text>
                        <Text className="text-sm text-center text-black">
                            {" "}
                            Days :{"  "}
                        </Text>

                        <Text className="px-1.5 py-0.5 font-bold text-center text-orange-600 bg-orange-100 rounded-lg text-sm">
                            {hours}
                        </Text>
                        <Text className="text-sm text-center text-black">
                            {" "}
                            Hrs :{"  "}
                        </Text>

                        <Text className="px-1.5 py-0.5 font-bold text-center text-orange-600 bg-orange-100 rounded-lg text-sm">
                            {minutes}
                        </Text>
                        <Text className="text-sm text-center text-black">
                            {" "}
                            Min
                        </Text>
                        {/* <Text className="px-1.5 py-0.5 font-bold text-center text-orange-600 bg-orange-100 rounded-lg text-sm">
                                {seconds}
                            </Text>
                            <Text className="text-sm text-center text-black">
                                {" "}
                                Sec
                            </Text> */}
                    </View>

                    {/* Deliver to */}
                    <View className="flex-row flex-wrap items-center justify-between px-4 py-2 bg-white">
                        <Text>
                            Deliver to:{" "}
                            <Text className="font-bold">769008</Text>
                        </Text>
                        <Pressable>
                            <Text className="font-bold text-pink-600">
                                Change
                            </Text>
                        </Pressable>
                    </View>

                    {/* Selected Items */}
                    <View>
                        <View className="flex-row flex-wrap items-center justify-between px-4 py-3 bg-red-50">
                            <View className="flex-row items-center gap-4">
                                <Checkbox
                                    style={{
                                        height: 18,
                                        width: 18,
                                        backgroundColor:
                                            "rgba(255, 255, 255, 0.5)",
                                    }}
                                    color={checked ? "#db2777" : "#4b5563"}
                                    value={checked}
                                    onValueChange={setChecked}
                                />
                                <Text className="text-sm font-bold text-center text-gray-600 uppercase">
                                    0/1 Items Selected
                                </Text>
                            </View>
                            <View className="flex-row items-center gap-5">
                                <Ionicons
                                    name="share-social-outline"
                                    size={20}
                                    color="black"
                                />
                                <AntDesign
                                    name="delete"
                                    size={20}
                                    color="black"
                                />
                                <MaterialCommunityIcons
                                    name="tag-heart-outline" // "cart-heart"
                                    size={20}
                                    color="black"
                                />
                            </View>
                        </View>
                        <CartItemCard product={demoProduct} />
                        <CartItemCard product={demoProduct} />
                        <CartItemCard product={demoProduct} />
                        <CartItemCard product={demoProduct} />
                        <CartItemCard product={demoProduct} />
                        <CartItemCard product={demoProduct} />
                    </View>

                    <View>
                        <Text className="px-4 py-3 text-center text-gray-500">
                            By Placing the order, you agree to LilyStylee{" "}
                            <Text
                                className="font-bold text-pink-600 underline"
                                onPress={() => {}}
                            >
                                Terms of Use
                            </Text>{" "}
                            and{" "}
                            <Text
                                className="font-bold text-pink-600 underline"
                                onPress={() => {}}
                            >
                                Privacy Policy
                            </Text>
                        </Text>
                    </View>
                </ScrollView>

                {/* Footer */}
                <View className="border-t border-red-300 bg-red-50">
                    <Text className="p-1.5 text-sm text-center bg-red-100">
                        1 item selected for order
                    </Text>
                    <Button
                        buttonColor="#db2777"
                        mode="contained"
                        textColor="white"
                        style={{
                            borderRadius: 5,
                            margin: 12,
                            marginBottom: 18,
                        }}
                        labelStyle={{ padding: 4 }}
                        onPress={() => {}}
                    >
                        PLACE ORDER
                    </Button>
                </View>
            </SafeAreaView>
        </>
    );
};

export default index;
