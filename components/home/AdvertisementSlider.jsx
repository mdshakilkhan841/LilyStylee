import React, { useState, useRef } from "react";
import { View, Image, Dimensions, Text } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";

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

    const onPressPagination = (index) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        });
    };

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Carousel
                ref={ref}
                loop
                defaultIndex={0}
                width={width}
                height={width >= 768 ? 240 * 1.2 : 240 * 0.7}
                // height={width / 3}
                autoPlay={true}
                data={banners}
                scrollAnimationDuration={2000}
                onProgressChange={progress}
                renderItem={({ item }) => (
                    <View>
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
            <Pagination.Basic
                progress={progress}
                data={banners}
                dotStyle={{
                    backgroundColor: "#db2777",
                    width: 6,
                    height: 6,
                    borderRadius: 50,
                }}
                containerStyle={{ gap: 5, marginTop: 8 }}
                onPress={onPressPagination}
            />
        </View>
    );
};

export default AdvertisementSlider;
