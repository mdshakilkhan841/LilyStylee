import { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Button, Divider } from "react-native-paper";
import { router } from "expo-router";
import {
    AntDesign,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import CartItemCard from "@/components/cart/CartItemCard";
import CartProducts from "@/assets/data/cartProducts.json";
import OfferTiming from "@/components/cart/OfferTiming";

const index = () => {
    const [checkedAll, setCheckedAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const products = CartProducts.products;

    const handleSelectAll = () => {
        const newCheckedItems = {};
        products.forEach((product) => {
            newCheckedItems[product.id] = !checkedAll;
        });
        setCheckedItems(newCheckedItems);
        setCheckedAll(!checkedAll);
    };

    const handleSelectItem = (id) => {
        const newCheckedItems = { ...checkedItems, [id]: !checkedItems[id] };
        setCheckedItems(newCheckedItems);
        setCheckedAll(Object.values(newCheckedItems).every((value) => value));
    };

    const selectedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
        <SafeAreaView edges={["bottom"]} className="flex-1">
            <Appbar.Header style={{ backgroundColor: "white" }}>
                <Appbar.BackAction
                    rippleColor="rgba(236, 72, 153, 0.15)"
                    onPress={() => {
                        router.back();
                    }}
                />
                <Appbar.Content
                    title="SHOPPING BAG"
                    titleStyle={{ fontSize: 16, fontWeight: "bold" }}
                />
                <Appbar.Action
                    rippleColor="rgba(236, 72, 153, 0.15)"
                    icon="heart-outline"
                    onPress={() => {}}
                />
            </Appbar.Header>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 12 }}
            >
                <View className="px-4 py-2 bg-white">
                    <Text>Indicator</Text>
                </View>

                {/* Sale ends */}
                <OfferTiming />

                {/* Deliver to */}
                <View className="flex-row flex-wrap items-center justify-between px-4 py-2 bg-white">
                    <Text>
                        Deliver to:{" "}
                        <Text className="font-bold">Shakil Khan, 769008</Text>
                    </Text>
                    <Pressable>
                        <Text className="font-bold text-pink-600">Change</Text>
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
                                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                                }}
                                color={checkedAll ? "#db2777" : "#4b5563"}
                                value={checkedAll}
                                onValueChange={handleSelectAll}
                            />
                            <Text className="text-sm font-bold text-center text-gray-600 uppercase">
                                {selectedCount}/{products.length} Items Selected
                            </Text>
                        </View>
                        <View className="flex-row items-center gap-5">
                            <Ionicons
                                name="share-social-outline"
                                size={20}
                                color="black"
                            />
                            <AntDesign name="delete" size={20} color="black" />
                            <MaterialCommunityIcons
                                name="tag-heart-outline" // "cart-heart"
                                size={20}
                                color="black"
                            />
                        </View>
                    </View>
                    {products.map((product) => (
                        <CartItemCard
                            key={product.id}
                            product={product}
                            isChecked={checkedItems[product.id]}
                            onCheck={() => handleSelectItem(product.id)}
                        />
                    ))}
                </View>

                {/* Price Details */}
                <View className="p-4 bg-white">
                    <Text className="text-sm font-bold text-black">
                        PRICE DETAILS ({selectedCount}{" "}
                        {selectedCount > 1 ? "Items" : "Item"})
                    </Text>
                    <View className="gap-2 py-3 my-3 border-t border-b border-gray-300">
                        <View className="flex-row flex-wrap items-center justify-between">
                            <Text className="">Total MRP</Text>
                            <Text className="">$123.45</Text>
                        </View>
                        <View className="flex-row flex-wrap items-center justify-between">
                            <Text className="">Discount on MRP</Text>
                            <Text className="text-green-600">- $123.45</Text>
                        </View>
                        <View className="flex-row flex-wrap items-center justify-between">
                            <Text className="">Coupon Discount</Text>
                            <Pressable
                                onPress={() => {
                                    console.log("Apply Coupon");
                                }}
                            >
                                <Text className="text-pink-600">
                                    Apply Coupon
                                </Text>
                            </Pressable>
                        </View>
                        <View className="flex-row flex-wrap items-center justify-between">
                            <Text className="">Shipping Fee</Text>
                            <Text className="text-green-600 uppercase">
                                Free
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row flex-wrap items-center justify-between">
                        <Text className="font-bold">Total Amount</Text>
                        <Text className="font-bold">$123.45</Text>
                    </View>
                </View>

                {/* Privacy Policy */}
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
                <Text className="p-1.5 text-sm text-center bg-red-100 font-bold">
                    {selectedCount > 0
                        ? `${selectedCount} ${
                              selectedCount > 1 ? "Items" : "Item"
                          } selected for order`
                        : "No items selected, select at least one item to place order"}
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
    );
};

export default index;
