import React, { useState } from "react";
import { View, Image, Dimensions, Text } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const AdvertisementSlider = () => {
    const width = Dimensions.get("window").width;
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
            image: require("@/assets/images/womens.jpg"),
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0); // Track active slide

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Carousel
                loop
                defaultIndex={0}
                width={width}
                height={width / 3}
                autoPlay={true}
                data={banners}
                scrollAnimationDuration={2000}
                onScrollEnd={(index) => setCurrentIndex(index)}
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
            {/* Pagination Dots */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                }}
            >
                {banners.map((_, index) => (
                    <View
                        key={index}
                        style={{
                            width: 10,
                            height: 3,
                            borderRadius: 5,
                            backgroundColor:
                                currentIndex === index ? "#db2777" : "gray",
                            marginHorizontal: 5,
                        }}
                    />
                ))}
            </View>
        </View>
    );
};

export default AdvertisementSlider;
