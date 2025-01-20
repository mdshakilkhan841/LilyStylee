import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const AddToBagButton = () => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className="mt-3 border border-pink-600 rounded-md"
        >
            <Text className="p-1.5 font-bold text-center text-pink-600 text-sm">
                ADD TO BAG
            </Text>
        </TouchableOpacity>
    );
};

export default AddToBagButton;
