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
      <canvas id="demo"></canvas>
      <RightSidebar />
    </div>
  </main>
</template>

<script>
// import fabric from "fabric";
import Navbar from "./layouts/Navbar.vue";
import LeftSidebar from "./layouts/LeftSidebar.vue";
import RightSidebar from "./layouts/RightSidebar.vue";
import { defaultNavElement } from "../constants";

export default {
  name: "DesignApp",
  components: {
    LeftSidebar,
    RightSidebar,
    Navbar,
  },
  data() {
    return {
      activeElement: defaultNavElement,
      imageInputRef: {},
    };
  },
  methods: {
    handleImageUpload() {},
    handleActiveElement() {},
  },
  mounted() {
    // const canvas = new fabric.Canvas("demo", {
    //   width: 500,
    //   height: 500,
    //   backgroundColor: "skyblue",
    // });
    // console.log(canvas);
  },
};
</script>
