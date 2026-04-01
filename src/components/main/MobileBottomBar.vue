<script setup lang="ts">
import { Home, BookOpen } from 'lucide-vue-next';

const props = defineProps<{
  homeUrl: string;
  blogUrl: string;
  homeLabel: string;
  blogLabel: string;
  currentPath: string;
}>();

const isPathActive = (path: string) => {
  if (path === '/' && props.currentPath === '/') return true;
  if (path !== '/' && props.currentPath.startsWith(path)) return true;
  return false;
};
</script>

<template>
  <nav class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 md:hidden flex items-center justify-around px-2 shadow-lg">
    <a 
      :href="homeUrl" 
      class="flex flex-col items-center justify-center w-full h-full space-y-1 rounded-xl transition-all duration-300"
      :class="isPathActive(homeUrl) ? 'text-primary font-bold' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'"
    >
      <Home class="w-6 h-6" :class="isPathActive(homeUrl) ? 'fill-current opacity-20' : ''" />
      <span class="text-xs">{{ homeLabel }}</span>
    </a>

    <a 
      :href="blogUrl" 
      class="flex flex-col items-center justify-center w-full h-full space-y-1 rounded-xl transition-all duration-300"
      :class="isPathActive(blogUrl) ? 'text-primary font-bold' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'"
    >
      <BookOpen class="w-6 h-6" :class="isPathActive(blogUrl) ? 'fill-current opacity-20' : ''" />
      <span class="text-xs">{{ blogLabel }}</span>
    </a>
  </nav>
</template>
