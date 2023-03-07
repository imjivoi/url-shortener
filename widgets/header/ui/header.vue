<template>
  <header>
    <div class="container mx-auto flex justify-between items-center h-[48px] px-10">
      <div class="">logo</div>
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
          <it-dropdown clickable>
            <it-button size="small" round variant="text">
              <template #icon>
                <it-avatar size="30px" />
              </template>
              <span class="text-blue-600 font-medium">{{ user.email }}</span>
            </it-button>
            <template #menu>
              <it-dropdown-menu class="w-full">
                <it-dropdown-item @click="$router.push('/dashboard')">
                  <template #icon>
                    <Icon name="material-symbols:space-dashboard-outline-rounded" />
                  </template>
                  Dashboard
                </it-dropdown-item>
                <it-dropdown-item>
                  <template #icon>
                    <Icon name="material-symbols:logout-rounded" />
                  </template>
                  Logout
                </it-dropdown-item>
              </it-dropdown-menu>
            </template>
          </it-dropdown>
        </div>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
const localePath = useLocalePath()

const user = useSupabaseUser()
const supabase = useSupabaseClient()

const { locale: currentLocale, locales } = useI18n()

const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      navigateTo('/')
    }
  } catch (error) {}
}
</script>
