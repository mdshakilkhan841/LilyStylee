import { View, Text } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import ClippedView from "@/components/ClippedView";
import Checkbox from "expo-checkbox";

const CartItemCard = ({ product }) => {
    const [checked, setChecked] = useState(false);

    const originalPrice =
        product?.price / (1 - product?.discountPercentage / 100);

    return (
        <View className="flex-row p-3 bg-white">
            <Image
                className="w-[30%] h-full"
                style={{ objectFit: "cover" }}
                source={{ uri: product?.thumbnail }}
            />
            <View className="flex-shrink w-[70%] px-3 pr-7">
                <Text
                    className="font-bold text-gray-600 text-"
                    numberOfLines={2}
                >
                    {product?.title}
                </Text>
                <Text className="text-sm text-gray-500" numberOfLines={1}>
                    {product.description}
                </Text>
                <Text className="text-xs text-gray-500" numberOfLines={1}>
                    Sold by: {product.brand}
                </Text>

                {/* Size */}
                <View className="flex flex-row flex-wrap items-center w-full gap-4 py-1">
                    <View className="flex flex-row items-center gap-1.5 px-2 py-1 bg-gray-200 rounded-sm">
                        <Text className="items-center text-sm font-bold">
                            Size: {"75-100 ML"}{" "}
                        </Text>
                        <FontAwesome
                            name="caret-down"
                            size={14}
                            color="black"
                        />
                    </View>
                    <View className="flex flex-row items-center gap-1.5 px-2 py-1 bg-gray-200 rounded-sm">
                        <Text className="items-center text-sm font-bold">
                            Qty: {4}{" "}
                        </Text>
                        <FontAwesome
                            name="caret-down"
                            size={14}
                            color="black"
                        />
                    </View>
                </View>

                {/* Price */}
                <View className="flex flex-row flex-wrap items-center w-full gap-1 py-0.5">
                    <Text numberOfLines={1} className="font-bold">
                        ${product?.price?.toFixed()}
                    </Text>
                    <Text numberOfLines={1} className="text-sm line-through">
                        ${originalPrice?.toFixed(2)}
                    </Text>

                    {product?.discountPercentage?.toFixed() > 0 && (
                        <ClippedView
                            text={`${product?.discountPercentage?.toFixed()}% OFF`}
                        />
                    )}
                </View>
                {/* return policy */}
                <Text className="font-bold">{product.returnPolicy}</Text>
            </View>
            <Checkbox
                style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    height: 18,
                    width: 18,
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                }}
                color={checked ? "#db2777" : "#4b5563"}
                value={checked}
                onValueChange={setChecked}
            />
            <Feather
                className="absolute right-4 top-3"
                name="x"
                size={20}
                color="black"
            />
        </View>
    );
};

export default CartItemCard;
