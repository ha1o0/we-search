<template>
  <div>
    <div><canvas class="canvas" id="pag"></canvas>
    <button @click="play">play</button>
    <button @click="pause">pause</button></div>
    <div><div ref="astro" style="width: 200px; height: 200px;"></div>
    <button @click="playLottie">play-lottie</button>
    <button @click="pauseLottie">pause-lottie</button></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount } from "@vue/runtime-core"
  import lottie from 'lottie-web'

  defineProps({
    msg: String
  })

  let pagView = null
  let lottieView = null
  const astro = ref(null)

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
      console.log(pagView)
      // Play PAGView.
    };

    lottieView = lottie.loadAnimation({
      container: astro.value, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'http://static.nimi.eu.org/assets/loader.json' // the path to the animation json
    });
    console.log(lottie, astro, lottieView)
  })

  onBeforeUnmount(() => {
    lottieView.destroy()
    pagView.destroy()
  })

  const play = () => {
    pagView.play();
  }

  const pause = () => {
    pagView.pause();
  }

  const playLottie = () => {
    lottieView.play();
  }

  const pauseLottie = () => {
    lottieView.pause();
  }

</script>