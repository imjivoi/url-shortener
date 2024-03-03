<template>
  <div class="relative">
    <div class="bg-gradient w-full h-full max-w-[90%] max-h-[320px]"></div>
    <section>
      <div class="py-28 rounded-[40px] relative overflow-hidden">
        <div>
          <div class="text-center mb-10">
            <h1 class="text-5xl font-bold mb-8">Simple way to short your link</h1>
            <p class="text-md max-w-lg mx-auto text-gray-500">
              Create custom short links that are perfect for sharing on social media, email, and more - and start seeing
              results today
            </p>
          </div>

          <div class="flex justify-center">
            <u-button
              :ui="{
                padding: {
                  xl: 'px-10',
                },
              }"
              to="/dashboard"
              size="xl"
              class="rounded-full"
            >
              Get started
            </u-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
const router = useRouter()
</script>
<style lang="scss" scoped>
.bg-gradient {
  &::before {
    content: '';
    @apply bg-gradient-to-t from-primary-500 via-primary-600 to-primary-700;
    border-radius: 50%;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, 0);

  filter: blur(150px);
  opacity: 0.5;
}
</style>
