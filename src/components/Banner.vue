<template>
 <row style="width: auto">
     <gcol class="xs-12 blog-info inner-miniboxes">
       <div>Kaerit OC's</div>
       <router-link to="/"><div class="dice"></div></router-link>
       <div>Directory</div>
     </gcol>
   </row>
</template>

<script>
/* eslint-disable */
    export default {
        name: 'Banner',
        data() {
            return { }
        },
    }
</script>

<style scoped lang="scss">
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
