import { View, Text } from "react-native";
import React, { useRef, useState } from "react";
import LocationBottomSheet from "@/components/home/location_bottom_sheet";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const searchProducts = () => {
    const bottomSheetRef = useRef(null);
    const [selectedLocation, setSelectedLocation] = useState(
        "769008, Shakil Khan",
    );
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text>searchProducts</Text>
            <Button
                mode="contained"
                onPress={() => bottomSheetRef.current?.expand()}
            >
                Change Location
            </Button>

            <LocationBottomSheet
                ref={bottomSheetRef}
                onSelectLocation={setSelectedLocation}
            />
        </SafeAreaView>
    );
};

export default searchProducts;
