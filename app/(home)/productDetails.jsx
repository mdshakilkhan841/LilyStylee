import React, { useRef, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    FlatList,
    Dimensions,
    Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Badge, TouchableRipple, Button } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import ProductImageSlider from "../../components/product/ProductImageSlider";
import { SimpleLineIcons } from "@expo/vector-icons";

const STICKY_SEGMENT_HEIGHT = 80; // Adjust to your button segment's height

const productDetails = () => {
    const { product } = useLocalSearchParams();
    const productObj = JSON.parse(product);

    const originalPrice =
        productObj.price / (1 - productObj.discountPercentage / 100);

    // For "sticky until released" (optional advanced)
    const [isSticky, setIsSticky] = useState(true);
    const [buttonSegmentY, setButtonSegmentY] = useState(0);
    const scrollY = useRef(new Animated.Value(0)).current;
    const { height: SCREEN_HEIGHT } = Dimensions.get("window");

    // Calculate fade out as you scroll past the sticky segment
    const fadeOutStart =
        buttonSegmentY - (SCREEN_HEIGHT - STICKY_SEGMENT_HEIGHT) - 0;
    const fadeOutEnd =
        buttonSegmentY - (SCREEN_HEIGHT - STICKY_SEGMENT_HEIGHT) + 0;

    const opacity = scrollY.interpolate({
        inputRange: [fadeOutStart, fadeOutEnd],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        {
            useNativeDriver: false,
        }
    );

    return (
        <SafeAreaView
            edges={["bottom"]}
            style={{ flex: 1, backgroundColor: "#fff" }}
        >
            {/* App Bar */}
            <Appbar.Header style={{ backgroundColor: "white" }}>
                <Appbar.BackAction
                    rippleColor="rgba(236, 72, 153, 0.15)"
                    onPress={() => router.back()}
                />
                <Appbar.Content title="" />
                <Appbar.Action
                    rippleColor="rgba(236, 72, 153, 0.15)"
                    icon="heart-outline"
                    onPress={() => router.push("wishlist")}
                />
                <TouchableRipple
                    borderless
                    rippleColor="rgba(236, 72, 153, 0.15)"
                    style={{
                        borderRadius: 50,
                        padding: 14,
                        marginRight: 8,
                    }}
                    onPress={() => router.push("(cart)")}
                >
                    <>
                        <Feather name="shopping-bag" size={20} color="black" />
                        <Badge
                            style={{
                                position: "absolute",
                                top: 5,
                                right: 5,
                                backgroundColor: "#db2777",
                            }}
                        >
                            30
                        </Badge>
                    </>
                </TouchableRipple>
            </Appbar.Header>

            {/* Body */}
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={handleScroll}
                contentContainerStyle={{
                    paddingBottom: STICKY_SEGMENT_HEIGHT + 24,
                }}
            >
                {/* Image Slider */}
                <ProductImageSlider images={productObj.images} />

                {/* Title, Brand, Rating */}
                <View
                    className="sticky top-0"
                    style={{ paddingHorizontal: 16, paddingTop: 16 }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "#222",
                        }}
                    >
                        {productObj.title}
                    </Text>
                    <Text
                        style={{
                            color: "#666",
                            fontSize: 14,
                            marginTop: 2,
                        }}
                    >
                        by {productObj.brand}
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: 8,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 2,
                                backgroundColor: "rgba(251, 191, 36, 0.2)",
                                paddingHorizontal: 8,
                                paddingVertical: 2,
                                borderRadius: 5,
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 15,
                                    color: "#222",
                                }}
                            >
                                {productObj.rating}
                            </Text>
                            <Octicons
                                name="star-fill"
                                size={14}
                                color="#fbbf24"
                                style={{ marginLeft: 2 }}
                            />
                        </View>
                        <Text
                            style={{
                                color: "#666",
                                marginLeft: 8,
                                fontSize: 13,
                            }}
                        >
                            {productObj.reviews?.length || 0} Ratings
                        </Text>
                    </View>
                </View>

                {/* Price, Discount, Stock */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "flex-end",
                        paddingHorizontal: 16,
                        marginTop: 12,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 22,
                            fontWeight: "bold",
                            color: "#db2777",
                        }}
                    >
                        ₹{productObj.price?.toFixed(0)}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            color: "#888",
                            textDecorationLine: "line-through",
                            marginLeft: 10,
                            marginBottom: 2,
                        }}
                    >
                        ₹{originalPrice.toFixed(0)}
                    </Text>
                    <Text
                        style={{
                            fontSize: 15,
                            color: "#388e3c",
                            fontWeight: "bold",
                            marginLeft: 10,
                            marginBottom: 2,
                        }}
                    >
                        {productObj.discountPercentage?.toFixed(0)}% OFF
                    </Text>
                </View>

                {/* Description */}
                <View style={{ paddingHorizontal: 16, marginTop: 14 }}>
                    <Text
                        style={{
                            color: "#444",
                            fontSize: 15,
                            lineHeight: 20,
                        }}
                    >
                        {productObj.description}
                    </Text>
                </View>

                {/* Stock, Shipping, Warranty */}
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 16,
                        paddingHorizontal: 16,
                        marginTop: 18,
                        marginBottom: 8,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#fdf2f8",
                            borderRadius: 8,
                            padding: 10,
                            flex: 1,
                            minWidth: 120,
                        }}
                    >
                        <Text style={{ color: "#db2777", fontWeight: "bold" }}>
                            Stock
                        </Text>
                        <Text style={{ color: "#222" }}>
                            {productObj.stock} available
                        </Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: "#f1f5f9",
                            borderRadius: 8,
                            padding: 10,
                            flex: 1,
                            minWidth: 120,
                        }}
                    >
                        <Text style={{ color: "#64748b", fontWeight: "bold" }}>
                            Shipping
                        </Text>
                        <Text style={{ color: "#222" }}>
                            {productObj.shippingInformation}
                        </Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: "#f1f5f9",
                            borderRadius: 8,
                            padding: 10,
                            flex: 1,
                            minWidth: 120,
                        }}
                    >
                        <Text style={{ color: "#64748b", fontWeight: "bold" }}>
                            Warranty
                        </Text>
                        <Text style={{ color: "#222" }}>
                            {productObj.warrantyInformation}
                        </Text>
                    </View>
                </View>

                {/* Return Policy */}
                <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
                    <Text style={{ color: "#64748b", fontWeight: "bold" }}>
                        Return Policy
                    </Text>
                    <Text style={{ color: "#222" }}>
                        {productObj.returnPolicy}
                    </Text>
                </View>

                {/* Add to Bag Button Segment */}
                <View
                    className="sticky bottom-0"
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 6,
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 16,
                        marginTop: 24,
                        marginBottom: 12,
                    }}
                >
                    <TouchableRipple
                        borderless={true}
                        rippleColor="rgba(236, 72, 153, 0.15)"
                        style={{
                            borderRadius: 100,
                            padding: 12,
                            height: 50,
                            width: 50,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onPress={() => {}}
                    >
                        <Feather name="heart" size={26} color="#db2777" />
                    </TouchableRipple>
                    <Button
                        mode="outlined"
                        textColor="#db2777"
                        contentStyle={
                            {
                                // paddingVertical: 0,
                            }
                        }
                        labelStyle={{
                            fontWeight: "medium",
                            fontSize: 16,
                            marginLeft: 12,
                            marginRight: 12,
                        }}
                        style={{
                            borderRadius: 8,
                            borderColor: "#db2777",
                        }}
                        onPress={() => {
                            // Add to bag logic here
                        }}
                    >
                        <SimpleLineIcons name="bag" size={17} color="#db2777" />
                        {"  "}
                        Buy Now
                    </Button>

                    <Button
                        mode="contained"
                        buttonColor="#db2777"
                        contentStyle={{}}
                        labelStyle={{
                            fontWeight: "bold",
                            fontSize: 14,
                            marginLeft: 12,
                            marginRight: 12,
                        }}
                        style={{
                            borderRadius: 8,
                            borderColor: "#db2777",
                            borderWidth: 1,
                        }}
                        onPress={() => {
                            // Add to bag logic here
                        }}
                    >
                        <SimpleLineIcons name="bag" size={17} color="white" />
                        {"  "}
                        ADD TO BAG
                    </Button>
                </View>

                {/* Placeholder for measuring position */}
                <View
                    onLayout={(e) => setButtonSegmentY(e.nativeEvent.layout.y)}
                />

                {/* Reviews */}
                <View
                    style={{
                        paddingHorizontal: 16,
                        marginTop: 18,
                        marginBottom: 24,
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 16,
                            marginBottom: 8,
                            color: "#222",
                        }}
                    >
                        Reviews
                    </Text>
                    {productObj.reviews && productObj.reviews.length > 0 ? (
                        <FlatList
                            data={productObj.reviews}
                            keyExtractor={(_, idx) => idx.toString()}
                            renderItem={({ item }) => (
                                <View
                                    style={{
                                        backgroundColor: "#f9fafb",
                                        borderRadius: 8,
                                        padding: 10,
                                        marginBottom: 10,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginBottom: 2,
                                        }}
                                    >
                                        <Octicons
                                            name="star-fill"
                                            size={13}
                                            color="#fbbf24"
                                        />
                                        <Text
                                            style={{
                                                marginLeft: 4,
                                                fontWeight: "bold",
                                                color: "#222",
                                            }}
                                        >
                                            {item.rating}
                                        </Text>
                                        <Text
                                            style={{
                                                marginLeft: 10,
                                                color: "#64748b",
                                                fontSize: 13,
                                            }}
                                        >
                                            {item.reviewerName}
                                        </Text>
                                    </View>
                                    <Text
                                        style={{
                                            color: "#444",
                                            fontSize: 14,
                                        }}
                                    >
                                        {item.comment}
                                    </Text>
                                </View>
                            )}
                            scrollEnabled={false}
                        />
                    ) : (
                        <Text style={{ color: "#888" }}>No reviews yet.</Text>
                    )}
                </View>
            </Animated.ScrollView>

            {/* Non-sticky Button Segment (shows when scrolled past) */}
            <Animated.View
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "#fff",
                    paddingBottom: 8,
                    paddingHorizontal: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    // borderTopWidth: 1,
                    // borderColor: "#f3f3f3",
                    zIndex: 10,
                    height: STICKY_SEGMENT_HEIGHT,
                    opacity, // <-- animated opacity
                }}
            >
                <TouchableRipple
                    borderless={true}
                    rippleColor="rgba(236, 72, 153, 0.15)"
                    style={{
                        borderRadius: 100,
                        padding: 12,
                        height: 50,
                        width: 50,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onPress={() => {}}
                >
                    <Feather name="heart" size={26} color="#db2777" />
                </TouchableRipple>
                <Button
                    mode="outlined"
                    textColor="#db2777"
                    labelStyle={{
                        fontWeight: "medium",
                        fontSize: 16,
                        marginLeft: 12,
                        marginRight: 12,
                    }}
                    style={{
                        borderRadius: 8,
                        borderColor: "#db2777",
                    }}
                    onPress={() => {
                        // Add to bag logic here
                    }}
                >
                    <SimpleLineIcons name="bag" size={17} color="#db2777" />
                    {"  "}
                    Buy Now
                </Button>
                <Button
                    mode="contained"
                    buttonColor="#db2777"
                    labelStyle={{
                        fontWeight: "bold",
                        fontSize: 14,
                        marginLeft: 12,
                        marginRight: 12,
                    }}
                    style={{
                        borderRadius: 8,
                        borderColor: "#db2777",
                        borderWidth: 1,
                    }}
                    onPress={() => {
                        // Add to bag logic here
                    }}
                >
                    <SimpleLineIcons name="bag" size={17} color="white" />
                    {"  "}
                    ADD TO BAG
                </Button>
            </Animated.View>
        </SafeAreaView>
    );
};

export default productDetails;
