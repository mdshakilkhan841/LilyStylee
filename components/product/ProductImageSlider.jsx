import React, { useRef } from "react";
import { View, Image, Dimensions } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import { Colors } from "../../constants/Colors";
import Carousel from "react-native-reanimated-carousel";

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

const ProductImageSlider = ({ images = [] }) => {
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    const ref = useRef(null);
    const progress = useSharedValue(0);

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Carousel
                ref={ref}
                loop
                defaultIndex={0}
                width={width}
                height={width >= 768 ? height * 0.35 : height * 0.5}
                autoPlay={true}
                autoPlayInterval={3000}
                data={images}
                scrollAnimationDuration={2000}
                onProgressChange={progress}
                renderItem={({ item }) => (
                    <View style={{ flex: 1 }}>
                        <Image
                            source={{ uri: item }}
                            style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "contain",
                            }}
                        />
                    </View>
                )}
            />
            {images.length > 1 && (
                <CustomPagination progress={progress} data={images} />
            )}
        </View>
    );
};

export default ProductImageSlider;
