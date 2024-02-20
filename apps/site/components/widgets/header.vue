<template>
  <header>
    <div class="container mx-auto flex justify-between items-center h-[48px] px-10">
      <div class="font-bold text-primary-500 text-xl ">
        <nuxt-link :to="getHomeLink()" class="flex items-center gap-1">
          <Icon name="ph:link-simple-bold"/>
          liny
        </nuxt-link>
      </div>
      <div class="navbar-center hidden lg:flex">
        <!-- <ul class="menu menu-horizontal px-1">
          <li>
            <nuxt-link to="/">{{ $t('home') }}</nuxt-link>
          </li>
          <li v-if="user">
            <nuxt-link to="/dashboard">{{ $t('dashboard') }}</nuxt-link>
          </li>
        </ul> -->
      </div>
      <div>
        <!-- <div class="flex gap-2">
          <select v-model="currentLocale" class="select">
            <option v-for="(locale, idx) in locales" :key="idx">{{ locale.code }}</option>
          </select>
          <shared-ui-color-toggle />
        </div> -->
        <div v-if="user" class="flex gap-4">
          <u-dropdown :items="options">
            <u-button color="white">
              {{ user.email }}
            </u-button>
          </u-dropdown>
          <!-- <features-select-lang v-if="['dashboard', 'dashboard-id'].includes($route.name as string)" /> -->
        </div>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { LogOut as LogoutIcon } from '@vicons/ionicons5'

import DashboardIcon from 'assets/icons/dashboard.svg'

const { locale, defaultLocale, t } = useI18n()

const user = await useUser()

// ** Hardcode */
function getHomeLink() {
  // if (locale.value !== defaultLocale) {
  //   return `/${locale.value}`
  // }
  return '/'
}

const options = [
  [
    {
      label: t('dashboard'),
      click: () => navigateTo('/dashboard'),
      icon: 'ph:house-thin',
      // icon: renderIcon(DashboardIcon),
    },
    {
      label: t('logout'),
      click: () => logout(),
      icon: 'ph:sign-out',
      // icon: renderIcon(LogoutIcon),
    },
  ],
]

const handleSelect = (val: 'dashboard' | 'logout') => {
  if (val === 'dashboard') {
    return navigateTo('/dashboard')
  }
  logout()
}

async function logout() {
  try {
    await $fetch('/api/auth/logout', {
      method: 'GET',
      headers: useRequestHeaders(['cookie']) as Record<string, string>,
    })
    navigateTo('/')
  } catch (error) {}
}
</script>

