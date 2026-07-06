import { Button } from "react-native-paper";
import useCartStore from "@/store/use_cart_store";
import React from "react";
import { Colors } from "@/constants/colors";
import toast from "@/utils/toast";

const AddToBagButton = React.memo(({ product }) => {
    const addToCart = useCartStore((state) => state.addToCart);

    const handleAddToCart = () => {
        addToCart(product);
        toast.success("Added to Bag");
    };

    return (
        <Button
            mode="contained"
            buttonColor="transparent"
            textColor={Colors.primary}
            labelStyle={{
                fontSize: 13,
                fontWeight: 700,
                marginVertical: 5,
            }}
            style={{
                borderRadius: 6,
                borderWidth: 1,
                borderColor: Colors.primary,
                marginTop: 8,
            }}
            onPress={handleAddToCart}
        >
            ADD TO BAG
        </Button>
    );
});

AddToBagButton.displayName = "AddToBagButton";

export default AddToBagButton;
