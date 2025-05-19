import { View, Animated, Dimensions } from "react-native";
import React, { useRef, useEffect } from "react";

const ProductCardSkeleton = ({ width, cartButton = true }) => {
    const pulseAnim = useRef(new Animated.Value(0)).current;
    const skeletonWidth = width || Dimensions.get("window").width / 2;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 900,
                    useNativeDriver: false,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0,
                    duration: 900,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, []);

    // Animate between two colors
    const animatedBg = pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["#fdf2f8", "#fce7f3"], // base to rippleColor
    });

    return (
        <View
            style={{
                width: skeletonWidth,
                borderRadius: 8,
                backgroundColor: "#fff",
                padding: 8,
                overflow: "hidden",
            }}
        >
            {/* Image skeleton */}
            <Animated.View
                style={{
                    width: "100%",
                    height: 155,
                    borderRadius: 8,
                    backgroundColor: animatedBg,
                    marginBottom: 8,
                }}
            />
            {/* Title skeleton */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Animated.View
                    style={{
                        width: "70%",
                        height: 18,
                        borderRadius: 4,
                        backgroundColor: animatedBg,
                        marginBottom: 6,
                    }}
                />
                <Animated.View
                    style={{
                        width: "20%",
                        height: 18,
                        borderRadius: 4,
                        backgroundColor: animatedBg,
                        marginBottom: 6,
                    }}
                />
            </View>
            {/* Description skeleton */}
            <Animated.View
                style={{
                    width: "100%",
                    height: 12,
                    borderRadius: 4,
                    backgroundColor: animatedBg,
                    marginBottom: 6,
                }}
            />
            <Animated.View
                style={{
                    width: "90%",
                    height: 12,
                    borderRadius: 4,
                    backgroundColor: animatedBg,
                    marginBottom: 6,
                }}
            />
            {/* Price skeleton */}
            <Animated.View
                style={{
                    width: "50%",
                    height: 16,
                    borderRadius: 4,
                    backgroundColor: animatedBg,
                }}
            />
            {/* Button skeleton */}
            {cartButton && (
                <Animated.View
                    style={{
                        width: "100%",
                        height: 28,
                        borderRadius: 6,
                        marginTop: 8,
                        backgroundColor: animatedBg,
                    }}
                />
            )}
        </View>
    );
};

export default ProductCardSkeleton;
