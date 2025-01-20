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

const ClippedView = ({ text, width = 50, height = 18 }) => {
    // Calculate dynamic points for the clip path
    const clipPoints = `
    0,0 
    ${width},0 
    ${width * 0.85},${height} 
    0,${height}
  `;

    return (
        <View style={{ position: "relative", width, height }}>
            {/* Background with Clip Path */}
            <Svg
                height="100%"
                width="100%"
                style={{ position: "absolute", top: 0, left: 0 }}
            >
                <Defs>
                    <ClipPath id="clip">
                        <Polygon points={clipPoints} />
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
                    rx={height * 0.2} // Dynamic border radius
                    ry={height * 0.2}
                />
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
