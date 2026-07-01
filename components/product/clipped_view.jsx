import React from "react";
import { View, Text } from "react-native";
import Svg, { Defs, Path, LinearGradient, Stop } from "react-native-svg";
import { Colors } from "@/constants/colors";

const ClippedView = ({ text, width: propWidth, height = 18 }) => {
    const fontSize = height * 0.55;
    const charWidth = fontSize * 0.52;
    const textWidth = text ? text.length * charWidth : 0;
    const leftPadding = height * 0.25;
    const safetyMargin = 4;
    const slopeOffset = height * 0.41;

    // Dynamically calculate width based on text length if no width prop is passed
    const width =
        propWidth || leftPadding + textWidth + safetyMargin + slopeOffset;

    const r = 3;
    const xTopRight = width;
    const xBottomRight = width - slopeOffset;

    // Smooth custom vector path matching the original geometry exactly
    const pathData = `
        M 0,${r}
        Q 0,0 ${r},0
        L ${xTopRight - r},0
        Q ${xTopRight},0 ${xTopRight - r * 0.3},${r * 0.9}
        L ${xBottomRight + r * 0.3},${height - r * 0.9}
        Q ${xBottomRight},${height} ${xBottomRight - r},${height}
        L ${r},${height}
        Q 0,${height} 0,${height - r}
        Z
    `;

    return (
        <View style={{ position: "relative", width, height }}>
            {/* Background with smooth custom Path rendering */}
            <Svg
                height="100%"
                width="100%"
                style={{ position: "absolute", top: 0, left: 0 }}
            >
                <Defs>
                    {/* Define the gradient */}
                    <LinearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                    >
                        <Stop
                            offset="0%"
                            stopColor="#ea580c"
                            stopOpacity="0.6"
                        />
                        <Stop
                            offset="100%"
                            stopColor={Colors.primary}
                            stopOpacity="1"
                        />
                    </LinearGradient>
                </Defs>
                {/* Background shape with gradient */}
                <Path d={pathData} fill="url(#gradient)" />
            </Svg>

            {/* Text inside the clipped view */}
            <View
                style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    paddingLeft: height * 0.25,
                }}
            >
                <Text
                    numberOfLines={1}
                    style={{
                        fontWeight: "bold",
                        color: "#fff", // White text for better contrast
                        fontSize: height * 0.55, // Dynamic text size
                    }}
                >
                    {text}
                </Text>
            </View>
        </View>
    );
};

export default ClippedView;
