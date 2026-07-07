import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { Feather, FontAwesome } from "@expo/vector-icons";
import ClippedView from "@/components/product/clipped_view";
import { Checkbox } from "expo-checkbox";
import { Colors } from "@/constants/colors";
import { TouchableRipple } from "react-native-paper";

const CartItemCard = ({ product, isChecked, onCheck, onRemove }) => {
    const originalPrice =
        product?.price / (1 - product?.discountPercentage / 100);

    return (
        <View className="flex-row bg-white rounded-lg overflow-hidden">
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
            <TouchableRipple
                borderless={true}
                onPress={onCheck}
                rippleColor={Colors.ripple}
                style={{
                    position: "absolute",
                    padding: 10,
                    borderRadius: 20,
                }}
            >
                <View pointerEvents="none">
                    <Checkbox
                        style={{
                            height: 18,
                            width: 18,
                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                        }}
                        color={isChecked ? Colors.primary : "#4b5563"}
                        value={isChecked}
                    />
                </View>
            </TouchableRipple>
            {/* need to pass item id as an array */}
            <Pressable onPress={() => onRemove(product.id)}>
                <Feather
                    className="absolute right-2 top-0"
                    name="x"
                    size={20}
                    color="black"
                />
            </Pressable>
        </View>
    );
};

export default CartItemCard;
