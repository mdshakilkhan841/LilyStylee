import React from "react";
import { View, Text } from "react-native";
import Svg, {
    Defs,
    ClipPath,
    Polygon,
    Rect,
    LinearGradient,
    Stop,
} from "react-native-svg";

const ClippedView = ({ text }) => {
    return (
        <View style={{ position: "relative", width: 70, height: 18 }}>
            {/* Background with Clip Path */}
            <Svg
                height="100%"
                width="100%"
                style={{ position: "absolute", top: 0, left: 0 }}
            >
                <Defs>
                    <ClipPath id="clip">
                        <Polygon points="0,0 62,0 52,20 0,20" />
                    </ClipPath>
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
                            stopColor="#db2777"
                            stopOpacity="1"
                        />
                    </LinearGradient>
                </Defs>
                {/* Background rectangle with gradient */}
                <Rect
                    width="100%"
                    height="100%"
                    fill="url(#gradient)" // Use the gradient defined above
                    clipPath="url(#clip)"
                    rx="5" // Border radius
                    ry="5"
                />
            </Svg>

            {/* Text inside the clipped view */}
            <View
                style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    paddingLeft: 5,
                }}
            >
                <Text
                    numberOfLines={1}
                    style={{
                        fontWeight: "bold",
                        color: "#fff", // White text for better contrast
                        fontSize: 11, // Adjust text size for the smaller container
                    }}
                >
                    {text}
                </Text>
            </View>
        </View>
    );
};

export default ClippedView;
