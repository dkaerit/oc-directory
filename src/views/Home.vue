<template>
 <box>
   <!-- BLOG INFO -->
   <Banner/>
   <!-- CUADRADOS DE -->
   <row>
     <gcol class="xs-12 center-x">
       <div class="flex-wrap style-wrap">
         <Avatar v-for="id in range(0,31)" :key="id" :oc="ocs[id]" :value="id"/>
       </div>
     </gcol>
   </row>
 </box>
</template>

<script>
/* eslint-disable */
import Avatar from "@/components/Avatar.vue";
import Banner from "@/components/Banner.vue";
import * as json from "@/bdd/ocs.json";

export default {
  name: 'Home',
  data() {
    return{
      ocs: json.default.ocs
    }
  },
  methods: {
    range: (a,b) => {
      if(b === undefined) { b = a; a = 1; }
      return [...Array(b-a+1).keys()].map(x => x+a);
    }
  },
  components: {
    Avatar, Banner
  }
}
</script>

<style scoped lang="scss">
  .flex-wrap {
    display: flex;
    flex-wrap: wrap;
  }

  .style-wrap {
    background: rgba(6, 6, 6, 0.65);
    //background: #fff;
    backdrop-filter: blur(6px);
    margin: 10px;
    padding-bottom: 5px;
    width: 280px;
  }

  // media
  @media (min-width: 768px) {
    .style-wrap {
      width: 554px;
    }
  }

  @media (min-width: 992px) {
    .style-wrap {
      width: 828px;
    }
  }

  @media (min-width: 1200px) {
    .style-wrap {
      width: 1101px;
    }
  }

</style>
