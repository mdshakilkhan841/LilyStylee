import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React, { useState } from "react";
import mens from "@/assets/images/mens.jpg";
import Octicons from "@expo/vector-icons/Octicons";
import ClippedView from "./ClippedView";
import { router } from "expo-router";

const ProductCard = React.memo(({ product, width, AddToBagButton }) => {
    const [addWishlist, setAddWishlist] = useState(false);

    const handleWishlist = () => {
        setAddWishlist(!addWishlist);
    };

    const originalPrice =
        product?.price / (1 - product?.discountPercentage / 100);

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
                router.push({
                    pathname: "productDetails",
                    params: { product: JSON.stringify(product) },
                });
            }}
            style={{ width: width }}
        >
            <View className="w-full h-52">
                <Image
                    source={{ uri: product?.thumbnail }}
                    className="w-full h-full rounded-md"
                    style={{ objectFit: "contain" }}
                />
                <View className="absolute flex flex-row items-center justify-center px-1 rounded-full py-0.5 bottom-2 left-2 bg-white/80">
                    <View className="flex flex-row items-center gap-1 px-1.5">
                        <Text className="text-xs font-bold text-center text-black">
                            {product?.rating}
                        </Text>
                        <Octicons name="star-fill" size={9} color="green" />
                    </View>
                    <Text className="px-1.5 text-xs font-bold text-center text-black border-l border-slate-600">
                        {product?.reviews?.length}
                    </Text>
                </View>
            </View>
            {/* Title/Brand */}
            <View className="flex-row flex-wrap items-center justify-between w-full gap-1">
                <Text numberOfLines={1} className="text-sm font-bold w-[80%]">
                    {product?.title}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    className="p-1"
                    onPress={handleWishlist}
                >
                    <Octicons
                        name={addWishlist ? "heart-fill" : "heart"}
                        size={16}
                        color="#db2777"
                    />
                </TouchableOpacity>
            </View>
            {/* Description */}
            <Text numberOfLines={1} className="pr-2 text-xs">
                {product?.description}
            </Text>
            {/* Price */}
            <View className="flex flex-row flex-wrap items-center w-full gap-1 py-0.5">
                <Text numberOfLines={1} className="text-[11px] line-through">
                    ${originalPrice?.toFixed(2)}
                </Text>
                <Text numberOfLines={1} className="text-sm font-bold">
                    ${product?.price?.toFixed()}
                </Text>
                {product?.discountPercentage?.toFixed() > 0 && (
                    <ClippedView
                        text={`${product?.discountPercentage?.toFixed()}% OFF`}
                    />
                )}
            </View>
            {/* Delivery time */}
            <Text numberOfLines={1} className="text-xs">
                {/* Delivery in 2-3 days */}
                {product?.shippingInformation}
            </Text>

            {/* Add to cart */}
            {AddToBagButton && <AddToBagButton product={product} />}
        </TouchableOpacity>
    );
});

export default ProductCard;
