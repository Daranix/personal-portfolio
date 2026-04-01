<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose
} from '@/components/ui/drawer';
import { Globe, Check } from 'lucide-vue-next';

interface LangOption {
  code: string;
  label: string;
  url: string;
}

const props = defineProps<{
  languages: LangOption[];
  currentLang: string;
}>();

const isDesktop = ref(true);
const isOpen = ref(false);

const updateMedia = () => {
  isDesktop.value = window.matchMedia('(min-width: 768px)').matches;
};

onMounted(() => {
  updateMedia();
  window.addEventListener('resize', updateMedia);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateMedia);
});
</script>

<template>
  <div>
    <!-- Desktop: DropdownMenu -->
    <DropdownMenu v-if="isDesktop" v-model:open="isOpen">
      <DropdownMenuTrigger as-child>
        <button 
          title="Change language" 
          class="flex items-center justify-center w-12 h-12 text-xl rounded-full hover:bg-slate-200 dark:hover:bg-gray-800 hover:bg-opacity-30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Globe class="w-6 h-6" />
          <span class="sr-only">Toggle language menu</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" class="w-40 z-50 p-2 font-semibold">
        <DropdownMenuItem
          v-for="lang in languages"
          :key="lang.code"
          as-child
        >
          <a :href="lang.url" class="flex w-full cursor-pointer hover:opacity-50 p-2 items-center justify-between rounded-md outline-none focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50">
            {{ lang.label }}
            <Check v-if="currentLang === lang.code" class="w-4 h-4 ml-2 opacity-80 text-primary" />
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <!-- Mobile: Drawer -->
    <Drawer v-else v-model:open="isOpen">
      <DrawerTrigger as-child>
        <button 
          title="Change language" 
          class="flex items-center justify-center w-12 h-12 text-xl rounded-full hover:bg-slate-200 dark:hover:bg-gray-800 hover:bg-opacity-30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Globe class="w-6 h-6" />
          <span class="sr-only">Toggle language menu</span>
        </button>
      </DrawerTrigger>
      <DrawerContent class="z-50 border-t border-border bg-background">
        <DrawerHeader class="text-left pb-2">
          <DrawerTitle class="text-lg font-bold">Select Language</DrawerTitle>
        </DrawerHeader>
        <div class="p-4 flex flex-col gap-2">
          <a 
            v-for="lang in languages" 
            :key="lang.code" 
            :href="lang.url"
            class="flex items-center justify-between p-4 rounded-xl text-lg font-semibold transition-colors duration-200"
            :class="currentLang === lang.code ? 'bg-primary/10 text-primary dark:text-white' : 'bg-secondary hover:opacity-80 text-foreground'"
          >
            {{ lang.label }}
            <Check v-if="currentLang === lang.code" class="w-5 h-5 text-primary" />
          </a>
        </div>
        <DrawerFooter class="pt-2">
          <DrawerClose as-child>
            <Button variant="outline" class="w-full font-bold h-12 rounded-xl">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </div>
</template>


