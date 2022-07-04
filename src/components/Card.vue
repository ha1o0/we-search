<template>
  <div class="card">
    <button @click="isRotate = !isRotate">fan</button>
    <div class="row" v-for="(items, i) in surnameList" :key="i">
      <div class="item" v-for="(item, j) in items" :key="j">
        <div :class="['container', isRotate ? 'rotate' : '']">
          <div :class="['back']">{{ itemContent(nextSurnameList[i][j])[0] }}</div>
          <div :class="['front']">{{ itemContent(item)[0] }}</div>
        </div>
        <!-- <div>{{ itemContent(item)[1] }}</div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
  import { watch, defineProps, ref } from 'vue'

  const props = defineProps({
    surnames: {
      type: Array,
      default: [],
    },
    nextSurnames: {
      type: Array,
      default: [],
    },
    rows: {
      type: Number,
      default: 9,
    },
  })

  let isRotate = ref(false)

  let surnameList = []
  let nextSurnameList = []

  watch(
    () => props.surnames,
    (newValue, oldValue) => {
        update()
    }
  )

  const itemContent = (item) => {
    return item.split('.')
  }

  const update = () => {
    for (let i = 0; i < props.surnames.length; i++) {
      const row = parseInt(i / props.rows)
      const column = i % props.rows
      if (!surnameList[row]) {
        surnameList[row] = []
        nextSurnameList[row] = []
      }
      surnameList[row][column] = props.surnames[i]
      nextSurnameList[row][column] = props.nextSurnames[i]
    }
    // isRotate = !isRotate
    // setTimeout(() => {
    //   isRotate = !isRotate
    // }, 100);
  }

  update()

  // console.log(surnameList)

</script>

<style lang="less" scoped>
.card {
  margin-bottom: 0.5rem;
  padding: 10px;
  .row {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5rem;
    .item {
      position: relative;
      color: black;
      // background: orange;
      margin-right: 0.5rem;
      // padding: 0.2rem;
      width: 1.8rem;
      height: 2.8rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      user-select: none;
      .container {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transform-style: preserve-3d;
        -webkit-perspective: 1000;
        -moz-perspective: 1000;
        -ms-perspective: 1000;
        perspective: 1000;
        transition: 0.8s;
        > div {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .front {
          background: rgba(orange, 1);
          position: absolute;
          backface-visibility: hidden; // 关键属性
        }
        .back {
          background: #FF6666;
          transform: rotateY(180deg);
        }
      }
      .rotate {
        transform: rotateY(180deg);
      }
    }
  }
}
</style>