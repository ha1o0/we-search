<template>
  <div>
    <canvas class="canvas" id="pag"></canvas>
    <button @click="play">play</button>
    <button @click="pause">pause</button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { onMounted } from "@vue/runtime-core"

  defineProps({
    msg: String
  })

  onMounted(() => {
    console.log('mounted')
    window.onload = async () => {
      // Initialize pag webassembly module.
      const PAG = await window.libpag.PAGInit();
      // Fetch pag file data.
      const buffer = await fetch('http://static.nimi.eu.org/assets/like.pag').then((response) => response.arrayBuffer());
      // Load the PAGFile from data.
      const pagFile = await PAG.PAGFile.load(buffer);
      // Set canvas size from the PAGFile size.
      const canvas = document.getElementById('pag');
      canvas.width = pagFile.width();
      canvas.height = pagFile.height();
      // Create PAGView.
      pagView = await PAG.PAGView.init(pagFile, canvas);
      // Play PAGView.
    };
  })

  let pagView = null

  const play = () => {
    pagView.play();
  }

  const pause = () => {
    pagView.pause();
  }




</script>