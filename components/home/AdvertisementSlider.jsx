import React, { useRef } from "react";
import { View, Image, Dimensions, Text } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { Colors } from "../../constants/Colors";

const PaginationDot = React.memo(({ index, progress, total }) => {
    const animatedStyle = useAnimatedStyle(() => {
        if (total === 0) return { opacity: 0.4, width: 6 };
        const val = ((progress.value % total) + total) % total;
        const diff = Math.abs(val - index);
        const distance = Math.min(diff, total - diff);
        const active = Math.max(1 - distance, 0);

        return {
            opacity: 0.4 + active * 0.6,
            width: 6 + active * 8,
        };
    });

    return (
        <Animated.View
            style={[
                {
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: Colors.primary,
                },
                animatedStyle,
            ]}
        />
    );
});

PaginationDot.displayName = "PaginationDot";

const CustomPagination = ({ progress, data }) => {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 6,
                marginTop: 12,
            }}
        >
            {data.map((_, index) => (
                <PaginationDot
                    key={index}
                    index={index}
                    progress={progress}
                    total={data.length}
                />
            ))}
        </View>
    );
};

const AdvertisementSlider = () => {
    const width = Dimensions.get("window").width;
    const ref = useRef(null);
    const progress = useSharedValue(0);

    const banners = [
        {
            label: "EXTRA 10% OFF",
            image: require("@/assets/images/beauty.jpg"),
        },
        {
            label: "Timeless Style, Every Day.",
            image: require("@/assets/images/fashion.jpg"),
        },
        {
            label: "UP TO 50% OFF",
            image: require("@/assets/images/kids.jpg"),
        },
        {
            label: "EXTRA 10% OFF",
            image: require("@/assets/images/mens.jpg"),
        },
        {
            label: "NEW Collections\nLily's Choice",
            image: require("@/assets/images/womans.jpg"),
        },
    ];

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Carousel
                ref={ref}
                loop
                defaultIndex={0}
                width={width}
                height={width >= 768 ? 240 * 1.2 : 240 * 0.7}
                autoPlay={true}
                autoPlayInterval={3000}
                data={banners}
                scrollAnimationDuration={2000}
                onProgressChange={progress}
                renderItem={({ item }) => (
                    <View style={{ flex: 1 }}>
                        <Image
                            source={item.image}
                            style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "cover",
                            }}
                        />
                        <View className="absolute bottom-[20%] left-10 bg-slate-500/50 py-1 px-4 rounded">
                            <Text className="z-10 text-2xl font-bold text-white ">
                                {item.label}
                            </Text>
                        </View>
                    </View>
                )}
            />
            <CustomPagination progress={progress} data={banners} />
        </View>
    );
};

export default AdvertisementSlider;
