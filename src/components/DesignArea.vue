<template>
  <section 
    class="relative flex h-full w-full flex-1 items-center justify-center"
    id="canvas"
  >
    <canvas ref="localCanvasRef"></canvas>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  props: {
    canvasRef: {
      required: true,
    },
  },
  setup(props) {
    const localCanvasRef = ref(null);

    onMounted(() => {
      props.canvasRef = localCanvasRef.value;
    });

    return {
      localCanvasRef,
    };

  }
  
}
</script>