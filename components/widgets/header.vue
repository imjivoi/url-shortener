<template>
  <header>
    <div class="container mx-auto flex justify-between items-center h-[48px] px-10">
      <div class="logo text-xl">
        <nuxt-link :to="getHomeLink()">liny</nuxt-link>
      </div>
      <!-- <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li>
            <nuxt-link to="/">{{ $t('home') }}</nuxt-link>
          </li>
          <li v-if="user">
            <nuxt-link to="/dashboard">{{ $t('dashboard') }}</nuxt-link>
          </li>
        </ul>
      </div> -->
      <div>
        <!-- <div class="flex gap-2">
          <select v-model="currentLocale" class="select">
            <option v-for="(locale, idx) in locales" :key="idx">{{ locale.code }}</option>
          </select>
          <shared-ui-color-toggle />
        </div> -->
        <div v-if="user" class="flex gap-4">
          <n-dropdown trigger="click" :options="options" @select="handleSelect">
            <n-button quaternary type="primary" round>
              {{ user.email }}
            </n-button>
          </n-dropdown>
          <features-select-lang v-if="['dashboard', 'dashboard-id'].includes($route.name as string)" />
        </div>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { LogOut as LogoutIcon } from '@vicons/ionicons5'
import { NDropdown, NButton, NIcon } from 'naive-ui'

import DashboardIcon from 'assets/icons/dashboard.svg'

const { locale, defaultLocale, t } = useI18n()

const user = useSupabaseUser()
const supabase = useSupabaseClient()

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    })
  }
}

// ** Hardcode */
function getHomeLink() {
  if (locale.value !== defaultLocale) {
    return `/${locale.value}`
  }
  return '/'
}

const options = [
  {
    label: t('dashboard'),
    key: 'dashboard',
    icon: renderIcon(DashboardIcon),
  },
  {
    label: t('logout'),
    key: 'logout',
    icon: renderIcon(LogoutIcon),
  },
]

const handleSelect = (val: 'dashboard' | 'logout') => {
  if (val === 'dashboard') {
    return navigateTo('/dashboard')
  }
  logout()
}

const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      navigateTo('/')
    }
  } catch (error) {}
}
</script>
<style scoped>
.logo {
  font-family: 'Fredoka One', cursive;
  letter-spacing: 4px;
}
</style>
