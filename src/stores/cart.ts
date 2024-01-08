import { defineStore } from "pinia";

type cartItem = {
  name: string,
  itemId: number,
  actualPrice: number,
  multiple: number,
}

export const useCartStore = defineStore('cart', {
  state: () => ({ items: [] as cartItem[] }),
  getters: {
    getSelectedPriceById: (state) => {
      return (productId: number) => {
        const cartMatch = state.items.find(item => item.itemId === productId)

        if (cartMatch) return cartMatch?.actualPrice * cartMatch?.multiple
      }
    },
    getItemActualPriceDollar: (state) => {
      const priceById = new Map(state.items.map(item => [item.itemId, item.actualPrice]))
      return (productId: number) => formatPrice(priceById.get(productId))
    },
    getItemSelectedPriceDollar: (state) => {
      const priceById = new Map(state.items.map(item => [item.itemId, item.actualPrice * item.multiple]))
      return (productId: number) => formatPrice(priceById.get(productId))
    },
    getTotalCountOfItems: (state) => {
      let totalCount = 0;
      state.items.forEach(item => totalCount += item.multiple)
      return totalCount
    }
  },
  actions: {
    addToCart(newItem: cartItem) {
      console.log("cart.addToCart()!")

      // handle item that's already in cart
      const itemExists = this.items.find(item => newItem.itemId === item.itemId)

      if (!itemExists) this.items.push(newItem)
      else {
        this.items = this.items.map(item => {
          if (item.itemId === newItem.itemId) {
            return { ...item, multiple: itemExists.multiple + newItem.multiple }
          }
          return item
        })
      }
    },
    removeFromCart(id: number) {
      this.items = this.items.filter(item => id !== item.itemId)
    }
  }
})

function formatPrice(price: number | undefined) {
  if (price === undefined) return ""
  return "$" + price.toFixed(2)
}