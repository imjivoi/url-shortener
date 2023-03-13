<template>
  <header>
    <div class="container mx-auto flex justify-between items-center h-[48px] px-10">
      <div class="">
        <nuxt-link to="/">Linqi</nuxt-link>
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
        <div v-if="user">
          <n-dropdown trigger="click" :options="options" @select="handleSelect">
            <n-button round>
              {{ user.email }}
            </n-button>
          </n-dropdown>
        </div>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { LogOut as LogoutIcon } from '@vicons/ionicons5'
import { NDropdown, NButton, NIcon } from 'naive-ui'

import DashboardIcon from 'assets/icons/dashboard.svg'

const localePath = useLocalePath()

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()

const { locale: currentLocale, locales } = useI18n()
const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    })
  }
}

const options = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: renderIcon(DashboardIcon),
  },
  {
    label: 'Logout',
    key: 'logout',
    icon: renderIcon(LogoutIcon),
  },
]

const handleSelect = (val: 'dashboard' | 'logout') => {
  if (val === 'dashboard') {
    return router.push('/dashboard')
  }
  logout()
}

const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push('/')
    }
  } catch (error) {}
}
</script>
