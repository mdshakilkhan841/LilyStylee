import { Text } from "react-native";
import React, { useRef } from "react";
import LocationBottomSheet from "@/components/home/location_bottom_sheet";
import useLocationStore from "@/store/use_location_store";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchProducts = () => {
    const bottomSheetRef = useRef(null);
    const { selectedLocation, setSelectedLocation } = useLocationStore();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text>searchProducts - {selectedLocation}</Text>
            <Button
                mode="contained"
                onPress={() => bottomSheetRef.current?.expand()}
            >
                Change Location
            </Button>

            <LocationBottomSheet
                ref={bottomSheetRef}
                onSelectLocation={setSelectedLocation}
                selectedLocation={selectedLocation}
            />
        </SafeAreaView>
    );
};

export default SearchProducts;
