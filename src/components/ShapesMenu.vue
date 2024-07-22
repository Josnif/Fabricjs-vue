<template>
    <DropdownMenu>
      <DropdownMenuTrigger as-child class="no-ring">
        <Button class="relative h-5 w-5 object-contain" @click="handleActiveElement(item)">
          <img
            :src="isDropdownElem ? activeElement.icon : item.icon"
            :alt="item.name"
            fill
            :class="{ invert: isDropdownElem }"
          />
        </Button>
      </DropdownMenuTrigger>
  
      <DropdownMenuContent class="mt-5 flex flex-col gap-y-1 border-none bg-primary-black py-4 text-white">
        <Button
          v-for="elem in item.value"
          :key="elem.name"
          @click="handleActiveElement(elem)"
          :class="[
            'flex h-fit justify-between gap-10 rounded-none px-5 py-3 focus:border-none',
            { 'bg-primary-green': activeElement.value === elem.value, 'hover:bg-primary-grey-200': activeElement.value !== elem.value }
          ]"
        >
          <div class="group flex items-center gap-2">
            <img
              :src="elem.icon"
              :alt="elem.name"
              width="20"
              height="20"
              :class="{ invert: activeElement.value === elem.value }"
            />
            <p :class="{ 'text-sm': true, 'text-primary-black': activeElement.value === elem.value, 'text-white': activeElement.value !== elem.value }">
              {{ elem.name }}
            </p>
          </div>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  
    <input
      type="file"
      class="hidden"
      ref="imageInputRef"
      accept="image/*"
      @change="handleImageUpload"
    />
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';
  import { Button } from './ui/button';
  
  export default {
    name: 'ShapesMenu',
    components: {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuTrigger,
      Button,
    },
    props: {
      item: Object,
      activeElement: Object,
      handleActiveElement: Function,
      handleImageUpload: Function,
      imageInputRef: Object
    },
    setup(props) {
      const isDropdownElem = computed(() => {
        return props.item.value.some(elem => elem?.value === props.activeElement.value);
      });
  
      return {
        isDropdownElem
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here if necessary */
  </style>
  