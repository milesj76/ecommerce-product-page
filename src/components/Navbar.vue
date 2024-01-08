<script setup lang="ts">
  import { ref } from 'vue';
  import { db } from '@/stores/db';
  import { useCartStore } from '@/stores/cart'

  import XButton from '@/assets/img/icon-close.svg';
  import IconCart from '@/components/icons/IconCart.vue';
  import trash from '@/assets/img/icon-delete.svg';

  const cart = useCartStore();
  const menuOpen = ref(false);
  const cartHidden = ref(true);
  const menuPages = [
    { name: "Collections", href: "#"},
    { name: "Men", href: "#"},
    { name: "Women", href: "#"},
    { name: "About", href: "#"},
    { name: "Contact", href: "#"},
  ]

  function handleMenu() {
    menuOpen.value = !menuOpen.value
  }

  function showCart() {
    cartHidden.value = !cartHidden.value
  }

  function getCartThumbnail(productId: number) {
    if (db.product.id === productId) return db.product.thumb[0]
  }

</script>

<template>
  <!-- Hamburger Menu -->
  <div class="fixed w-full z-40 bg-[rgba(0,0,0,0.6)] ease-in duration-200"
    :class="{ 'h-full': menuOpen }"
    @click="handleMenu()"
    >
  </div>
  <div class="fixed w-full z-50 right-[100%] text-sg-black" :class="{ 'open-menu': menuOpen }">
    <div class="bg-white w-[60%] min-h-screen p-6">
      <div class="mb-8">
        <button>
          <img :src="XButton" alt="Close Menu" @click="handleMenu()">
        </button>
      </div>
      <div class="h-full flex flex-col gap-4 font-bold text-xl">
        <a v-for="page in menuPages" href="#">{{ page.name }}</a>
        <!-- <a href="#">Collections</a>
        <a href="#">Men</a>
        <a href="#">Women</a>
        <a href="#">About</a>
        <a href="#">Contact</a> -->
      </div>
    </div>
  </div>

  <!-- Navbar -->
  <nav class="px-8 py-8 lg:py-0 flex justify-between lg:border-b">
    <div class="flex items-center gap-4">
      <img @click="handleMenu()" src="./../assets/img/icon-menu.svg" alt="Menu Button" class="h-5 lg:hidden">
      <img src="./../assets/img/logo.svg" alt="sneakers logo" class="h-6">
      
      <div class="hidden h-full lg:flex space-x-8 ml-10 text-sg-darkGrayishBlue">
        <div v-for="page in menuPages"
          class="relative py-8"
          >
          <a href="#" class="nav-link z-40 hover:text-sg-black">{{ page.name }}</a>
          <div class="absolute z-40 top-0 h-full w-full border-b-2 border-transparent bg-transparent pointer-events-none" />
        </div>
      </div>

    </div>

    <div class="flex items-center gap-4 lg:gap-10">
      <div class="relative hover:cursor-pointer">
        <IconCart @click="showCart()" :class="[!cartHidden ? 'fill-sg-black' : 'fill-sg-darkGrayishBlue']" />
        <p class="absolute top-0 right-0 translate-y-[-50%] translate-x-[50%] text-[0.6rem] bg-sg-orange text-sg-white px-2 rounded-md" :class="{ 'hidden': cart.getTotalCountOfItems < 1 }">{{ cart.getTotalCountOfItems }}</p>
      </div>
      <div class="hover:cursor-pointer border-2 border-transparent hover:border-sg-orange rounded-full">
        <img :src="db.userAvatar" alt="user image" class="h-6 lg:h-10">
      </div>
    </div>
  </nav>

  <!-- Cart -->
  <div class="absolute z-30 w-full sm:max-w-80 sm:right-10 desk:right-20 sm:translate-y-[-10%]" :class="{ 'hidden': cartHidden }">
    <div class="bg-sg-white m-2 rounded-md drop-shadow-lg">
      <header class="p-4 border-b">
        <h2 class="font-bold">Cart</h2>
      </header>

      <div class="min-h-40 flex items-center justify-center">
        <p v-if="cart.items.length < 1" class="font-bold text-sm text-sg-darkGrayishBlue">Your cart is empty.</p>

        <ul class="p-6 w-full space-y-4" :class="{ 'hidden': cart.items.length < 1 }">
          <li v-for="item in cart.items" class="flex justify-between">
            <div class="flex gap-4">
              <img :src="getCartThumbnail(item.itemId)" alt="Product thumbnail" class="max-h-12 rounded-md" />
              <div class="text-sg-darkGrayishBlue">
                <p>{{ item.name }}</p>
                <p>{{ cart.getItemActualPriceDollar(item.itemId) }} x {{ item.multiple }} <span class="font-bold text-sg-black">{{ cart.getItemSelectedPriceDollar(item.itemId) }}</span></p>
              </div>
            </div>
            <button @click="cart.removeFromCart(item.itemId)" class="">
              <img :src="trash" alt="Remove from cart">
            </button>
          </li>

          <button class="w-full p-4 rounded-md bg-sg-orange text-sg-white">Checkout</button>
        </ul>
      </div>

    </div>
  </div>

</template>

<style>

.open-menu {
  @apply right-0;
}

.darker-bg {
  background: rgba(0, 0, 0, 0.6);
}

.nav-link:hover + div {
  @apply border-sg-orange;
}
</style>