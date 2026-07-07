import React from "react";
import { View } from "react-native";
import { Appbar, Badge, TouchableRipple } from "react-native-paper";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "@/constants/colors";
import useCartStore from "@/store/use_cart_store";

const PageHeader = ({
    title,
    showBack = false,
    showWishlist = false,
    showCart = false,
    showProfile = false,
}) => {
    const { cart } = useCartStore();

    return (
        <Appbar.Header
            style={{
                backgroundColor: Colors.bgPrimary,
                elevation: 0,
                borderBottomWidth: 1,
                borderBottomColor: Colors.borderLight,
                height: 56,
            }}
        >
            {showBack && (
                <Appbar.BackAction
                    rippleColor={Colors.ripple}
                    onPress={() => {
                        if (router.canGoBack()) {
                            router.back();
                        } else {
                            router.replace("/");
                        }
                    }}
                />
            )}

            <Appbar.Content
                title={title}
                titleStyle={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: Colors.textDark,
                    letterSpacing: 0.5,
                }}
            />

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                {showWishlist && (
                    <TouchableRipple
                        borderless={true}
                        rippleColor={Colors.ripple}
                        style={{
                            borderRadius: 100,
                            padding: 12,
                        }}
                        onPress={() => {
                            router.push("/wishlist");
                        }}
                    >
                        <MaterialCommunityIcons
                            name="heart-outline"
                            color={Colors.iconPrimary}
                            size={22}
                        />
                    </TouchableRipple>
                )}

                {showCart && (
                    <TouchableRipple
                        borderless={true}
                        rippleColor={Colors.ripple}
                        style={{
                            borderRadius: 100,
                            padding: 12,
                        }}
                        onPress={() => {
                            router.push("/cart");
                        }}
                    >
                        <>
                            <MaterialCommunityIcons
                                name="shopping-outline"
                                size={22}
                                color={Colors.iconPrimary}
                            />
                            {cart.length > 0 && (
                                <Badge
                                    size={16}
                                    style={{
                                        position: "absolute",
                                        top: 8,
                                        right: 3,
                                        backgroundColor: Colors.primary,
                                        fontSize: 10,
                                        color: "white",
                                    }}
                                >
                                    {cart.length}
                                </Badge>
                            )}
                        </>
                    </TouchableRipple>
                )}

                {showProfile && (
                    <TouchableRipple
                        borderless={true}
                        rippleColor={Colors.ripple}
                        style={{
                            borderRadius: 100,
                            padding: 12,
                        }}
                        onPress={() => {}}
                    >
                        <Feather
                            name="user"
                            size={22}
                            color={Colors.iconPrimary}
                        />
                    </TouchableRipple>
                )}
            </View>
        </Appbar.Header>
    );
};

export default PageHeader;
