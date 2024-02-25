<template>
  <div class="flex flex-col sm:flex-row gap-5">
    <div class="rounded-2xl p-5 basis-1/2 flex flex-col gap-7 relative">
      <div role="status" class="max-w-sm animate-pulse">
        <div class="h-[24px] bg-gray-300 dark:bg-gray-800 rounded-full w-full"></div>
      </div>
      <div class="flex flex-col gap-3">
        <div role="status" class="max-w-sm animate-pulse">
          <div class="h-[52px] bg-gray-300 dark:bg-gray-800 rounded-full w-full mb-4"></div>
          <div class="h-[52px] bg-gray-300 dark:bg-gray-800 rounded-full w-full"></div>
        </div>
      </div>
    </div>
    <div class="rounded-2xl p-5 basis-1/2 relative">
      <div class="flex items-center justify-center h-full">
        <div role="status" class="max-w-sm animate-pulse">
          <div class="h-[60px] bg-gray-300 dark:bg-gray-800 rounded-full w-[60px] mb-4"></div>
        </div>
      </div>
    </div>
  </div>
</template>
