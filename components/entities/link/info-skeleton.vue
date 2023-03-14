<template>
  <div class="flex flex-col sm:flex-row gap-5">
    <div class="bg-white rounded-2xl p-5 basis-1/2 flex flex-col gap-7">
      <div role="status" class="max-w-sm animate-pulse">
        <div class="h-[24px] bg-gray-300 rounded-full w-full"></div>
      </div>
      <div class="flex flex-col gap-3">
        <div role="status" class="max-w-sm animate-pulse">
          <div class="h-[52px] bg-gray-300 rounded-full w-full mb-4"></div>
          <div class="h-[52px] bg-gray-300 rounded-full w-full"></div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-2xl p-5 basis-1/2">
      <h2 class="font-bold text-2xl">Total clicks</h2>
      <div class="flex items-center justify-center h-full">
        <div role="status" class="max-w-sm animate-pulse">
          <div class="h-[60px] bg-gray-300 rounded-full w-[60px] mb-4"></div>
        </div>
      </div>
    </div>
  </div>
</template>
