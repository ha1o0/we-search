<template>
  <div>
    <h2>Hello 你姓什么？</h2>
    <h3 v-show="currentPage < cardLength">告诉我以下是否有你的姓</h3>
    <div class="button-group" v-show="currentPage < cardLength">
      <button @click="next(1)">有</button>
      <button @click="next(0)">没有</button>
    </div>
    <h2 v-show="currentPage === cardLength && result > 0">
      你姓 【 {{ surnameList[result - 1] }} 】
    </h2>
    <h2 v-show="currentPage === cardLength && result == 0">
      您的姓氏不在以上所有姓氏中……
    </h2>
    <div class="reset" v-show="currentPage === cardLength">
      <button @click="reset">再猜一次</button>
    </div>
    <div v-show="currentPage < cardLength">
      <Card :surnames="card" :next-surnames="nextCard"></Card>
    </div>
  </div>
</template>

<script setup>
import Card from './Card.vue';
import { ref } from 'vue'
import { onMounted } from "@vue/runtime-core"

  defineProps({
    msg: String
  })

  onMounted(() => {
    // console.log('mounted')
  })

  let result = ref(0)
  let card = ref([])
  let nextCard = ref([])
  let currentPage = ref(0)
  const cards = []
  const cardLength = 7
  const surnames = '赵|钱|孙|李|周|吴|郑|王|冯|陈|楮|卫|蒋|沈|韩|杨|朱|秦|尤|许|何|吕|施|张|孔|曹|严|华|金|魏|陶|姜|戚|谢|邹|喻|柏|水|窦|章|云|苏|潘|葛|奚|范|彭|郎|鲁|韦|昌|马|苗|凤|花|方|俞|任|袁|柳|酆|鲍|史|唐|费|廉|岑|薛|雷|贺|倪|汤|滕|殷|罗|毕|郝|邬|安|常|乐|于|时|傅|皮|卞|齐|康|伍|余|元|卜|顾|孟|平|黄|和|穆|萧|尹|姚|邵|湛|汪|祁|毛|禹|狄|米|贝|明|臧|计|伏|成|戴|谈|宋|茅|庞|熊|纪|舒|屈|项|祝|董|梁|杜|阮|蓝|闽|席|季|麻|强|贾|路|娄|危|江|童|颜|郭|梅|盛|林|刁|锺|徐|丘|骆|高|夏|蔡|田|樊|胡|凌|霍|虞|万|支|柯|昝|管|卢|莫|经|房|裘|缪|干|解|应|宗|丁|宣|贲|邓|郁|单|杭|洪|包|诸|左|石|崔|吉|钮|龚|程|嵇|邢|滑|裴|陆|荣|翁|荀|羊|於|惠|甄|麹|家|封|芮|羿|储|靳|汲|邴|糜|松|井|段|富|巫|乌|焦|巴|弓|牧|隗|山|谷|车|侯|宓|蓬|全|郗|班|仰|秋|仲|伊|宫|宁|仇|栾|暴|甘|斜|厉|戎|祖|武|符|刘|景|詹|束|龙|叶|幸|司|韶|郜|黎|蓟|薄|印|宿|白|怀|蒲|邰|从|鄂|索|咸|籍|赖|卓|蔺|屠|蒙|池|乔|阴|郁|胥|能|苍|双|闻|莘|党|翟|谭|贡|劳|逄|姬|申|扶|堵|冉|宰|郦|雍|郤|璩|桑|桂|濮|牛|寿|通|边|扈|燕|冀|郏|浦|尚|农|温|别|庄|晏|柴|瞿|阎|充|慕|连|茹|习|宦|艾|鱼|容|向|古|易|慎|戈|廖|庾|终|暨|居|衡|步|都|耿|满|弘|匡|国|文|寇|广|禄|阙|东|欧|殳|沃|利|蔚|越|夔|隆|师|巩|厍|聂|晁|勾|敖|融|冷|訾|辛|阚|那|简|饶|空|曾|毋|沙|乜|养|鞠|须|丰|巢|关|蒯|相|查|后|荆|红|游|竺|权|逑|盖|益|桓|公|仉|督|晋|楚|阎|法|汝|鄢|涂|钦|岳|帅|缑|亢|况|后|有|琴|归|海|墨|哈|谯|笪|年|爱|阳|佟|商|牟|佘|佴|伯|赏|万俟|司马|上官|欧阳|夏侯|诸葛|闻人|东方|赫连|皇甫|尉迟|公羊|澹台|公冶|宗政|濮阳|淳于|单于|太叔|申屠|公孙|仲孙|轩辕|令狐|锺离|宇文|长孙|慕容|鲜于|闾丘|司徒|司空|丌官|司寇|子车|微生|颛孙|端木|巫马|公西|漆雕|乐正|壤驷|公良|拓拔|夹谷|宰父|谷梁|段干|百里|东郭|南门|呼延|羊舌|梁丘|左丘|东门|西门|南宫'
  const surnameList = surnames.split('|').slice(0, 127)
  // console.log(surnameList)

  for (let i = 1; i < surnameList.length + 1; i++) {
    let ten2two = i.toString(2)
    while (ten2two.length < 7) {
      ten2two = '0' + ten2two
    }
    for (let j = 0; j < ten2two.length; j++) {
      if (!cards[j]) {
        cards[j] = []
      }
      if (cards[j].length >= 63 || ten2two[ten2two.length - j - 1] === '0') {
        continue
      }
      cards[j].push(surnameList[i - 1] + '.' + i)
    }
  }

  card.value = cards[currentPage.value]
  if (currentPage.value < cardLength - 1) {
    nextCard.value = cards[currentPage.value + 1]
  }

  const next = (value) => {
    result.value += value * Math.pow(2, currentPage.value)
    currentPage.value++
    card.value = cards[currentPage.value]
    if (currentPage.value < cardLength - 1) {
      nextCard.value = cards[currentPage.value + 1]
    }
    if (currentPage.value === cardLength) {
      console.log('你姓【' + surnameList[result.value - 1] + '】')
    }
    // console.log(result.value, currentPage.value)
  }

  const reset = () => {
    result.value = 0
    currentPage.value = 0
    card.value = cards[currentPage.value]
  }
  // console.log(cards)

</script>

<style lang="less" scoped>
 button {
    // box-shadow: 0px 0.3rem 0.4rem -0.25rem #276873;
    // background:linear-gradient(to bottom, #599bb3 5%, #408c99 100%);
    background-color: #FF6666;
    border-radius: 0.3rem;
    display: inline-block;
    width: 7rem;
    height: 2.5rem;
    font-size: 1rem;
    cursor: pointer;
    color:#ffffff;
    border: 0;
    // font-family: Arial;
    font-weight: bold;
    padding: 0.4rem 2rem;
    // text-decoration:none;
    // text-shadow:0px 1px 0px #3d768a;
  }
  .button-group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
    :first-child {
      margin-right: 0.5rem;
    }
    :last-child {
      margin-right: 0.5rem;
      background-color: #99CC66;
    }
  }
  .reset {
    button {
      width: 10rem;
    }
  }
</style>