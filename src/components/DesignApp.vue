<template>
  <main class="h-screen overflow-hidden">
    <Navbar
      :activeElement="activeElement"
      :handleImageUpload="handleImageUploadClick"
      :handleActiveElement="handleActiveElement"
      :imageInputRef="imageInputRef"
    />
    <div class="flex h-full flex-row">
      <!-- <LeftSidebar /> -->
      <section 
        class="relative flex h-full w-full flex-1 items-center justify-center"
        id="canvas"
      >
        <canvas ref="canvasRef"></canvas>
      </section>
      <RightSidebar />
    </div>
  </main>
</template>

<script>
import { ref, onMounted, onUnmounted, provide } from 'vue';
import Navbar from './layouts/Navbar.vue';
import LeftSidebar from './layouts/LeftSidebar.vue';
import RightSidebar from './layouts/RightSidebar.vue';
import DesignArea from './DesignArea.vue';
import { initializeFabric } from '@design/lib/canvas';
import { useElements, useFabricEvents } from '@design/hooks';
import { handleImageUpload } from '@design/lib/shapes'

export default {
  name: 'DesignApp',
  components: {
    Navbar,
    LeftSidebar,
    RightSidebar,
    DesignArea,
  },
  setup() {
    const canvasRef = ref(null);
    const fabricRef = ref(null);
    provide('canvasRef', canvasRef);
    provide('fabricRef', fabricRef);

    const { 
      activeElement, 
      imageInputRef, 
      selectedShapeRef,
      isDrawing,
      shapeRef,

      activeObjectRef,
      setActiveElement,
      isEditingRef,
      setElementAttributes,
      undo,
      redo,
      
      syncShapeInStorage,
      deleteShapeFromStorage,

      handleActiveElement, 
    } = useElements();

    const handleImageUploadClick  = (e) => {
      e.stopPropagation();

      handleImageUpload({
        file: e.target.files[0],
        canvas: fabricRef,
        shapeRef,
        syncShapeInStorage,
      });
    }

    onMounted(() => {
      const canvas = initializeFabric({
        fabricRef, canvasRef
      });
      const dispose = useFabricEvents({
        canvas,
        fabricRef,
        selectedShapeRef,
        isDrawing,
        shapeRef,
        activeObjectRef,
        setActiveElement,
        isEditingRef,
        setElementAttributes,
        undo,
        redo,
        syncShapeInStorage,
        deleteShapeFromStorage,
      });

      onUnmounted(dispose);
    });

    return {
      activeElement,
      imageInputRef,
      canvasRef,
      fabricRef,
      handleImageUploadClick,
      handleActiveElement,
    };
  },
};
</script>
