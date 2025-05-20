import { View, Animated } from "react-native";
import React, { useRef, useEffect } from "react";

const CategoriesSkeleton = () => {
    const pulseAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: false,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, []);

    const animatedBg = pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["#f3f3f3", "rgba(236, 72, 153, 0.25)"],
    });

    return (
        <View
            style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                borderWidth: 1,
                borderColor: "#db2777",
                backgroundColor: "#f3f3f3",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Animated.View
                style={{
                    width: "94%",
                    height: "94%",
                    borderRadius: 32,
                    backgroundColor: animatedBg,
                }}
            />
        </View>
    );
};

export default CategoriesSkeleton;
