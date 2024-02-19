<template>
  <u-select :value="locale" value-field="code" label-field="name" :options="locales" @update:value="onChangeLocale" />
</template>
<script lang="ts" setup>

const { locale, locales, setLocale } = useI18n()

const onChangeLocale = (val) => {
  setLocale(val)
}
</script>
