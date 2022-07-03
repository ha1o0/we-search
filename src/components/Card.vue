<template>
  <div class="card">
    <div class="row" v-for="(items, i) in surnameList" :key="i">
      <div class="item" v-for="(item, j) in items" :key="j">
        <div>{{ itemNumber(item)[0] }}</div>
        <!-- <div>{{ itemNumber(item)[1] }}</div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
  import { watch, defineProps } from 'vue'

  const props = defineProps({
    surnames: {
      type: Array,
      default: [],
    },
    rows: {
      type: Number,
      default: 9,
    },
  })

  let surnameList = []

  watch(
    () => props.surnames,
    (newValue, oldValue) => {
        update()
    }
  )

  const itemNumber = (item) => {
    return item.split('.')
  }

  const update = () => {
    for (let i = 0; i < props.surnames.length; i++) {
      const row = parseInt(i / props.rows)
      const column = i % props.rows
      if (!surnameList[row]) {
        surnameList[row] = []
      }
      surnameList[row][column] = props.surnames[i]
    }
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
      color: black;
      background: orange;
      margin-right: 0.5rem;
      padding: 0.2rem;
      width: 1.6rem;
      height: 2.6rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      user-select: none;
    }
  }
}
</style>