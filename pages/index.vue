<template>
  <section>
    <div class="py-28 rounded-[40px] relative overflow-hidden">
      <div>
        <div class="text-center mb-10">
          <h1 class="text-5xl font-bold mb-8">
            Una manera simple
            <br />
            de acortar su enlace
          </h1>
          <p class="text-xl max-w-lg mx-auto text-gray-500">
            Cree enlaces cortos personalizados que son perfectos para compartir en redes sociales, correo electrónico y
            más, y comience a ver resultados hoy mismo
          </p>
        </div>

        <div class="flex justify-center">
          <n-button size="large" round type="primary" @click="routeTo">Empezar</n-button>
        </div>
      </div>
      <div class="bg-card"></div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { NButton } from 'naive-ui'

const user = useSupabaseUser()
const router = useRouter()

const routeTo = () => {
  if (user.value) {
    return router.push({ name: 'dashboard' })
  }
  router.push({ name: 'auth' })
}
</script>
