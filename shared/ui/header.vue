<template>
  <header>
    <div class="navbar bg-base-100 container mx-auto">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <nuxt-link to="/">{{ $t('home') }}</nuxt-link>
            </li>
            <li v-if="user">
              <nuxt-link to="/dashboard">{{ $t('dashboard') }}</nuxt-link>
            </li>
            <!-- <li>
              <nuxt-link :to="localePath('blog')">{{ $t('blog') }}</nuxt-link>
            </li> -->
          </ul>
        </div>
        <a class="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li>
            <nuxt-link to="/">{{ $t('home') }}</nuxt-link>
          </li>
          <li v-if="user">
            <nuxt-link to="/dashboard">{{ $t('dashboard') }}</nuxt-link>
          </li>
          <!-- <li>
            <nuxt-link :to="localePath('blog')">{{ $t('blog') }}</nuxt-link>
          </li> -->
        </ul>
      </div>
      <div class="navbar-end">
        <div class="flex gap-2">
          <select v-model="currentLocale" class="select">
            <option v-for="(locale, idx) in locales" :key="idx">{{ locale.code }}</option>
          </select>
        </div>

        <input
          type="checkbox"
          class="toggle toggle-primary toggle-md"
          :checked="$colorMode.preference === 'dark' || $colorMode.value === 'dark'"
          @change="toggleTheme"
        />
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
const localePath = useLocalePath()

const user = useSupabaseUser()

const colorMode = useColorMode()
const { locale: currentLocale, locales } = useI18n()
const toggleTheme = (event: Event) => {
  if (event.target!.checked) {
    colorMode.preference = 'dark'
  } else {
    colorMode.preference = 'light'
  }
}
</script>
