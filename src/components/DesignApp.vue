<template>
  <main class="h-screen overflow-hidden">
    <Navbar
      :activeElement="activeElement"
      :handleImageUpload="handleImageUpload"
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
import { ref, onMounted } from 'vue';
import { fabric } from 'fabric';
import Navbar from './layouts/Navbar.vue';
import LeftSidebar from './layouts/LeftSidebar.vue';
import RightSidebar from './layouts/RightSidebar.vue';
import DesignArea from './DesignArea.vue';
import { defaultNavElement } from '../constants';
import { initializeFabric } from '@design/lib/canvas'

export default {
  name: 'DesignApp',
  components: {
    Navbar,
    LeftSidebar,
    RightSidebar,
    DesignArea,
  },
  setup() {
    const activeElement = ref(defaultNavElement);
    const imageInputRef = ref(null);
    const canvasRef = ref(null);
    const fabricRef = ref(null);

    const handleImageUpload = () => {
      // Example of using fabricRef to add an image
      const imgElement = document.createElement('img');
      imgElement.src = 'path/to/your/image.jpg';
      imgElement.onload = () => {
        const imgInstance = new fabric.Image(imgElement, {
          left: 100,
          top: 100,
          angle: 0,
          opacity: 1,
        });
        fabricRef.value.add(imgInstance);
      };
    };

    const handleActiveElement = () => {
      // Example of using fabricRef to manipulate elements
      const activeObject = fabricRef.value.getActiveObject();
      if (activeObject) {
        activeObject.set('fill', 'red');
        fabricRef.value.renderAll();
      }
    };

    onMounted(() => {
      initializeFabric({
        fabricRef, canvasRef
      })
      // fabricRef.value = new fabric.Canvas(canvasRef.value, {
      //   width: 500,
      //   height: 500,
      //   backgroundColor: 'skyblue',
      // });
      // console.log(fabricRef.value);
    });

    return {
      activeElement,
      imageInputRef,
      canvasRef,
      fabricRef,
      handleImageUpload,
      handleActiveElement,
    };
  },
};
</script>
