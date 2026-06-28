import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

export const Skeleton = ({
    width,
    height,
    borderRadius = 4,
    style,
    baseColor = "#f3f4f6", // Neutral light gray base
    highlightColor = "rgba(255, 255, 255, 0.6)", // Smooth white shimmer beam
}) => {
    const [layoutWidth, setLayoutWidth] = useState(0);
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withRepeat(
            withTiming(1, { duration: 1200, easing: Easing.linear }),
            -1,
            false, // Consistent left-to-right shimmer
        );
    }, [progress]);

    const animatedStyle = useAnimatedStyle(() => {
        const translateX = interpolate(
            progress.value,
            [0, 1],
            [-layoutWidth, layoutWidth],
        );

        return {
            transform: [{ translateX }],
        };
    });

    return (
        <View
            onLayout={(e) => setLayoutWidth(e.nativeEvent.layout.width)}
            style={[
                {
                    width,
                    height,
                    borderRadius,
                    backgroundColor: baseColor,
                    overflow: "hidden",
                    position: "relative",
                },
                style,
            ]}
        >
            {layoutWidth > 0 && (
                <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
                    <LinearGradient
                        colors={["transparent", highlightColor, "transparent"]}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={{ flex: 1 }}
                    />
                </Animated.View>
            )}
        </View>
    );
};

export default Skeleton;
