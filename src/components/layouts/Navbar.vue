<template>
  <nav class="flex select-none items-center justify-between gap-4 bg-primary-black px-5 text-white">
    <ul class="flex flex-row">
      <li
        v-for="item in navElements"
        :key="item.name"
        @click="handleItemClick(item)"
        :class="[
          'group flex items-center justify-center px-2.5 py-5',
          { 'bg-primary-green': isActive(item.value), 'hover:bg-primary-grey-200': !isActive(item.value) }
        ]"
      >
        <ShapesMenu
          v-if="Array.isArray(item.value)"
          :item="item"
          :activeElement="activeElement"
          :imageInputRef="imageInputRef"
          :handleActiveElement="handleActiveElement"
          :handleImageUpload="handleImageUpload"
        />
        <Button v-else class="relative h-5 w-5 object-contain">
          <img
            :src="item.icon"
            :alt="item.name"
            fill
            :class="{ invert: isActive(item.value) }"
          />
        </Button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { ref, computed } from 'vue';
import { navElements } from '../../constants';
import { Button } from '../ui/button';
import ShapesMenu from '../ShapesMenu.vue';

export default {
  name: 'Navbar',
  components: {
    ShapesMenu,
    Button,
    Image
  },
  props: {
    activeElement: Object,
    imageInputRef: Object,
    handleImageUpload: Function,
    handleActiveElement: Function
  },
  setup(props) {
    const isActive = (value) => {
      return (
        (props.activeElement && props.activeElement.value === value) ||
        (Array.isArray(value) && value.some((val) => val?.value === props.activeElement?.value))
      );
    };

    const handleItemClick = (item) => {
      if (!Array.isArray(item.value)) {
        props.handleActiveElement(item);
      }
    };

    return {
      isActive,
      handleItemClick,
      navElements
    };
  }
};
</script>

<style scoped>
/* Add your styles here if necessary */
</style>
