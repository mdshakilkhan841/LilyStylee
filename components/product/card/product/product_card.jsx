import { View, Text, Image } from "react-native";
import React from "react";
import Octicons from "@expo/vector-icons/Octicons";
import ClippedView from "@/components/product/clipped_view";
import { router } from "expo-router";
import useWishListStore from "@/store/use_wishlist_store";
import AddToBagButton from "@/components/product/add_to_bag_button";
import { Colors } from "@/constants/colors";
import { TouchableRipple } from "react-native-paper";
import toast from "@/utils/toast";

const ProductCard = React.memo(({ product, width }) => {
    const addToWishList = useWishListStore((state) => state.addToWishList);
    const removeFromWishList = useWishListStore(
        (state) => state.removeFromWishList,
    );
    const inWishList = useWishListStore((state) =>
        state.wishList.some((item) => item.id === product.id),
    );

    const handleWishlist = () => {
        if (inWishList) {
            removeFromWishList(product.id);
            toast.success("Removed from Wishlist");
        } else {
            addToWishList(product);
            toast.success("Added to Wishlist");
        }
    };

    const originalPrice =
        product?.price / (1 - product?.discountPercentage / 100);

    return (
        <TouchableRipple
            borderless
            onPress={() => {
                router.push({
                    pathname: "/product_details",
                    params: { product: JSON.stringify(product) },
                });
            }}
            style={{
                width: width,
                borderRadius: 8,
                overflow: "hidden",
                padding: 4,
            }}
        >
            <View>
                <View className="w-full h-52">
                    <Image
                        source={{ uri: product?.thumbnail }}
                        className="w-full h-full rounded-md"
                        resizeMode="contain"
                        fadeDuration={0}
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
                    <Text
                        numberOfLines={1}
                        className="text-sm font-bold w-[80%]"
                    >
                        {product?.title}
                    </Text>
                    <TouchableRipple
                        rippleColor={Colors.ripple}
                        borderless={true}
                        onPress={handleWishlist}
                        style={{ borderRadius: 12 }}
                    >
                        <View style={{ padding: 4 }}>
                            <Octicons
                                name={inWishList ? "heart-fill" : "heart"}
                                size={16}
                                color={Colors.primary}
                            />
                        </View>
                    </TouchableRipple>
                </View>
                {/* Description */}
                <Text numberOfLines={1} className="pr-2 text-xs">
                    {product?.description}
                </Text>
                {/* Price */}
                <View className="flex flex-row flex-wrap items-center w-full gap-1 py-0.5">
                    <Text
                        numberOfLines={1}
                        className="text-[11px] line-through"
                    >
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
                    {product?.shippingInformation}
                </Text>

                {/* Add to cart */}
                <AddToBagButton product={product} />
            </View>
        </TouchableRipple>
    );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
