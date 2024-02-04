import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { AddCartType } from './app/product/AddToCartButton';

interface CartState {
    isOpen: boolean,
    cart: AddCartType[],
    // clearCart: () => void
    removeProduct: (item: AddCartType) => void,
    toggleCart: () => void,
    addProduct: (item: AddCartType) => void
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
                const existingItem = state.cart.find((cartItem) => cartItem.name === item.name)
                if(existingItem){
                    const updatedCart = state.cart.map((cartItem) => {
                        if(cartItem.name === item.name){
                            return {...cartItem, quantity: cartItem.quantity! + 1}
                        }
                        return cartItem
                    })
                    return {cart: updatedCart} 
                } else {
                    return { cart: [...state.cart, {...item, quantity: 1}]}
                }
            }),
            removeProduct: (item: AddCartType) => set((state) => {
                // Check if item exists and remove quantity -1 

                const existingItem = state.cart.find(cartItem => cartItem.name === item.name)
                if (existingItem && existingItem.quantity! > 1){
                    const updatedCart = state.cart.map((cartItem) => {
                        if(cartItem.name == item.name){
                            return {...cartItem, quantity: cartItem.quantity! - 1}
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


type ThemeState = {
    mode: "light" | "dark"
    toggleMode: (theme: "light" | "dark") => void
  }
  
  export const useThemeStore = create<ThemeState>()(
    persist(
      (set) => ({
        mode: "light",
        toggleMode: (theme) => set((state) => ({ mode: theme })),
      }),
      { name: "theme-store" }
    )
  )


  type NavToggle = {
    isOpen : Boolean
    toggleMenu : () => void
}


export const useNavToggle = create<NavToggle>()(
    persist(
        (set) => ({
            isOpen: false,
            toggleMenu: () => set((state) => ({isOpen: !state.isOpen}))
        }),
        {name: "navbarbutton"}
    )
    

)


