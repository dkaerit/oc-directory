<template>
 <box>
   <!-- BLOG INFO -->
   <row>
     <gcol class="xs-12 blog-info inner-miniboxes">
       <div>Kaerit OC's</div>
       <div class="dice"></div>
       <div>Directory</div>
     </gcol>
   </row>
   <!-- CUADRADOS DE -->
   <row>
     <gcol class="xs-12">
       <div class="flex-wrap style-wrap center-x">
         <Avatar v-for="id in range(0,31)" :key="id" :oc="ocs[id]" :value="id"/>
       </div>
     </gcol>
   </row>
 </box>
</template>

<script>
import Avatar from "@/components/Avatar.vue";
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
    Avatar
  }
}
</script>

<style lang="scss">
  .dice {
    width: 35px; height: 35px;
    margin: 10px;
    background: url("~@/assets/dice.png");
    background-size: cover;

    -webkit-animation: rotating 6s linear infinite;
    -moz-animation: rotating 6s linear infinite;
    -ms-animation: rotating 6s linear infinite;
    -o-animation: rotating 6s linear infinite;
    animation: rotating 6s linear infinite;
  }

  .inner-miniboxes {
    display: flex!important;
    justify-content: center;
    flex-direction: row;
    align-items: center;
  }

  .blog-info {
    color: #dedede;
    background: #020202; 
    font-family: 'Hind Madurai', sans-serif;
    font-size: 13.5px;
    font-weight: 700;
    letter-spacing: 3px;
    line-height: 80px;
    margin: -10px -15px 0px 0px;
    text-transform: uppercase;
  }

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

  // keyframes
  @-webkit-keyframes rotating /* Safari and Chrome */ {
    from {
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes rotating {
    from {
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

</style>
