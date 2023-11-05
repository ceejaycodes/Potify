import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { AddCartIn } from './app/product/AddToCartButton';

interface CartState {
    isOpen: boolean,
    cart: AddCartIn[],
    // clearCart: () => void
    removeProduct: (item: AddCartIn) => void,
    toggleCart: () => void,
    addProduct: (item: AddCartIn) => void
    paymentIntent: string
    onCheckout: string,
    setCheckout: (val:string) => void
    setPaymentIntent: (val: string) => void
}



export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            isOpen: false,
            paymentIntent: "",
            onCheckout: "cart",
            toggleCart: () => set((state) => ({isOpen: !state.isOpen})),
            addProduct: (item) => set((state) => {
                const existingItem = state.cart.find(cartItem => cartItem.id === item.id)
                if(existingItem){
                    const updatedCart = state.cart.map((cartItem) => {
                        if(cartItem.id === item.id){
                            return {...cartItem, quantity: cartItem.quantity + 1}
                        }
                        return cartItem
                    })
                    return {cart: updatedCart} 
                } else {
                    return { cart: [...state.cart, {...item, quantity: 1}]}
                }
            }),
            removeProduct: (item: AddCartIn) => set((state) => {
                // Check if item exists and remove quantity -1 

                const existingItem = state.cart.find(cartItem => cartItem.id === item.id)
                if (existingItem && existingItem.quantity > 1){
                    const updatedCart = state.cart.map((cartItem) => {
                        if(cartItem.id == item.id){
                            return {...cartItem, quantity: cartItem.quantity - 1}
                        }

                        return cartItem
                    })
                    return {cart: updatedCart}
                }else {

                    const filteredCart = state.cart.filter(
                        (cartItem) => cartItem.id !== item.id

                    )
                    return {cart: filteredCart}
                }
                

            }),
            setPaymentIntent: (val) => set((state) => ({paymentIntent: val})),
            setCheckout: (val) => set((state) => ({
                onCheckout: val
            }))

        }),
        {name: "cart-store"}
    )

)