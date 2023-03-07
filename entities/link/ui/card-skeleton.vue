<template>
  <div class="w-full shadow-sm overflow-hidden bg-gray-100 rounded-xl">
    <div class="py-2 px-4 sm:py-5 flex flex-row gap-4 justify-between items-center">
      <div>
        <div>
          <h2 class="flex justify-between">
            <div role="status" class="max-w-sm animate-pulse">
              <div class="h-2.5 bg-gray-300 rounded-full w-48 mb-4"></div>
            </div>
          </h2>
          <div class="flex">
            <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
              <div class="flex items-center w-full space-x-2">
                <div class="h-2.5 bg-gray-300 rounded-full w-32"></div>
                <div class="h-2.5 bg-gray-300 rounded-full w-24"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row items-center gap-4 sm:gap-10">
        <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
          <div class="flex items-center w-full space-x-2">
            <div class="h-2.5 bg-gray-300 rounded-full w-10 h-10"></div>
            <div class="h-2.5 bg-gray-300 rounded-full w-10 h-10"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
