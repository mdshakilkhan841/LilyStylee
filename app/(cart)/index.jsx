import { useEffect, useState, useMemo } from "react";
import { View, Text, ScrollView, Pressable, Dimensions } from "react-native";
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
import OfferTiming from "@/components/cart/OfferTiming";
import useCartStore from "../../store/useCartStore";
import ShoppingBag from "@/assets/animations/shopping-bag.svg";

const { width } = Dimensions.get("window");
const index = () => {
    const { cart, removeFromCart } = useCartStore();
    const [checkedAll, setCheckedAll] = useState(false);
    const [checkedItemsId, setCheckedItemsId] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    // Update selectedItems whenever checkedItemsId or cart changes
    useEffect(() => {
        setSelectedItems(
            cart.filter((item) => checkedItemsId.includes(item.id))
        );
    }, [checkedItemsId, cart]);

    // Calculate totals using selectedItems
    const totalMRP = useMemo(() => {
        return selectedItems.reduce((sum, item) => {
            // Assuming item.price is discounted price, and item.discountPercentage exists
            const originalPrice =
                item.price / (1 - item.discountPercentage / 100);
            return sum + originalPrice * item.quantity;
        }, 0);
    }, [selectedItems]);

    const totalDiscount = useMemo(() => {
        return selectedItems.reduce((sum, item) => {
            const originalPrice =
                item.price / (1 - item.discountPercentage / 100);
            const discount = (originalPrice - item.price) * item.quantity;
            return sum + discount;
        }, 0);
    }, [selectedItems]);

    const handleSelectAll = () => {
        if (checkedAll) {
            setCheckedItemsId([]);
            setCheckedAll(false);
        } else {
            setCheckedItemsId(cart.map((product) => product.id));
            setCheckedAll(true);
        }
    };

    const handleSelectItem = (id) => {
        let newCheckedItems;
        if (checkedItemsId.includes(id)) {
            newCheckedItems = checkedItemsId.filter((itemId) => itemId !== id);
        } else {
            newCheckedItems = [...checkedItemsId, id];
        }
        setCheckedItemsId(newCheckedItems);
        setCheckedAll(
            cart.length > 0 && newCheckedItems.length === cart.length
        );
    };

    // New handler to remove and update checkedItemsId
    const handleRemoveSingleItem = (id) => {
        removeFromCart([id]);
        setCheckedItemsId((prev) => prev.filter((itemId) => itemId !== id));
        setCheckedAll(
            cart.length - 1 > 0 &&
                checkedItemsId.filter((itemId) => itemId !== id).length ===
                    cart.length - 1
        );
    };

    const handleRemoveAllItems = () => {
        removeFromCart(checkedItemsId);
        setCheckedItemsId([]);
        setCheckedAll(false);
    };

    const selectedCount = checkedItemsId.length;

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

            {cart.length > 0 ? (
                <>
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
                                <Text className="font-bold">
                                    Shakil Khan, 769008
                                </Text>
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
                                        color={
                                            checkedAll ? "#db2777" : "#4b5563"
                                        }
                                        value={checkedAll}
                                        onValueChange={handleSelectAll}
                                    />
                                    <Text className="text-sm font-bold text-center text-gray-600 uppercase">
                                        {selectedCount}/{cart.length} Items
                                        Selected
                                    </Text>
                                </View>
                                <View className="flex-row items-center gap-5">
                                    <Ionicons
                                        name="share-social-outline"
                                        size={20}
                                        color="black"
                                    />
                                    <Pressable onPress={handleRemoveAllItems}>
                                        <AntDesign
                                            name="delete"
                                            size={20}
                                            color="black"
                                        />
                                    </Pressable>
                                    <MaterialCommunityIcons
                                        name="tag-heart-outline" // "cart-heart"
                                        size={20}
                                        color="black"
                                    />
                                </View>
                            </View>
                            {cart.map((product) => (
                                <CartItemCard
                                    key={product.id}
                                    product={product}
                                    isChecked={checkedItemsId.includes(
                                        product.id
                                    )}
                                    onCheck={() => handleSelectItem(product.id)}
                                    onRemove={handleRemoveSingleItem}
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
                                    <Text className="">
                                        ${totalMRP.toFixed(2)}
                                    </Text>
                                </View>
                                <View className="flex-row flex-wrap items-center justify-between">
                                    <Text className="">Discount on MRP</Text>
                                    <Text className="text-green-600">
                                        - ${totalDiscount.toFixed(2)}
                                    </Text>
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
                                <Text className="font-bold">
                                    ${(totalMRP - totalDiscount).toFixed()}
                                </Text>
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
                </>
            ) : (
                <View className="items-center flex-1">
                    <ShoppingBag height={width * 0.8} width={"80%"} />
                    <Text className="py-2 text-2xl font-bold text-center text-black">
                        Hey, your shopping bag is empty!
                    </Text>
                    <Text className="px-4 text-xs text-center text-gray-500">
                        There is nothing in your shopping bag, let's add some
                        items.
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
};

export default index;
