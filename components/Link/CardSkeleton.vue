<template>
  <div class="p-4 grid gap-4 transition-all shadow hover:shadow-md rounded-xl bg-white">
    <div class="flex justify-between gap-6 w-full">
      <div class="flex items-center gap-4 w-full">
        <div role="status" class="animate-pulse">
          <div class="bg-gray-300 dark:bg-gray-700 rounded-full w-10 h-10"></div>
        </div>
        <div role="status" class="space-y-2.5 animate-pulse w-2/3">
          <div class="w-full space-y-2">
            <div class="h-2 rounded-full bg-gray-300 dark:bg-gray-700 w-full"></div>
            <div class="h-2 rounded-full bg-gray-300 dark:bg-gray-700 w-full"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between">
      <div role="status" class="animate-pulse">
        <div class="bg-gray-300 dark:bg-gray-700 rounded-full w-20 h-2"></div>
      </div>
      <div class="flex gap-2">
        <div role="status" class="animate-pulse">
          <div class="bg-gray-300 dark:bg-gray-700 rounded-md w-10 h-5"></div>
        </div>
        <div role="status" class="animate-pulse">
          <div class="bg-gray-300 dark:bg-gray-700 rounded-md w-5 h-5"></div>
        </div>
      </div>
    </div>
  </div>
</template>
