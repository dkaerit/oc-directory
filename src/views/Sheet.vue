<template>
 <box>
  <!-- Banner -->
  <Banner/>

  <!-- panel -->
  <row>
    <gcol class="xs-12 center-x">
      <div class="panel">
        <div class="bio">
          <div class="photo" :style="{'backgroundImage': url(oc.photo)}"/>
          <div class="info">
            <div v-for="parametro in Object.keys(oc.bio)" :key="parametro">{{parametro}}: {{oc.bio[parametro]}}</div>

          </div>
        </div>
        <div class="contenido">

        </div>
        <div class="botones">
          <div v-on:click="select($event)"><i class="fas fa-brain"/></div>
          <div v-on:click="select($event)"><i class="fas fa-book-open"/></div>
          <div v-on:click="select($event)"><i class="fab fa-jira"/></div>
        </div>
      </div>
    </gcol>
  </row>
 </box>
</template>

<script>
import Banner from "@/components/Banner.vue";
import * as json from "@/bdd/ocs.json";

export default {
  name: 'Sheet',
  data() {
    return{
      id: this.$route.query.oc,
      oc: json.default.ocs[this.$route.query.oc]
    }
  },
  methods: {
    url: pic => `url('${require('@/assets/'+pic)}')`,
    select: event => { 
      if(event.target.tagName == 'path' || event.target.tagName == 'svg') {
        if(event.target.tagName == 'path') event = event.target.parentElement;
        else event = event.target;

        document.getElementsByClassName('selected').forEach(elemento => {
          elemento.classList.remove("selected");
        });
        event.classList.add('selected'); 
      }
    }
  },
  components: {
    Banner
  }
}
</script>

<style lang="scss">
  .panel {
    display: flex;
    margin: 10px 0px 0px 0px;
    align-items: stretch;
  }

  .photo {
      background: #040404;
      border: 15px solid #000;
      height: 320px;
      width: 230px;
  }

  .info {
      background: #040404;
      color: white;
      padding: 15px;
      width: calc(100%-15px);
      height: 100px;
      margin: 10px 0px 10px 0px;
  }

  .contenido {
    background: #040404;
    width: 450px;
    margin: 0px 0px 10px 10px;
  }

  
  .botones {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100px;
    background: #040404;
    color: white;
    margin: 0px 0px 10px 10px;

    .svg-inline--fa {
      padding: 20px;
      margin: 15px 0px;
      font-size: 19px;
      border-radius: 2px;
      transition: 0.5s;
    }

    .svg-inline--fa:hover {
      background: #101010;
      color: white;
      border-radius: 4px;
      transition: 0.5s;
    }

    .selected {
      background: white;
      color: #101010;
    }
  }


</style>
