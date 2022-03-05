<template>
 <box>
  <!-- Banner -->
  <Banner/>

  <!-- panel -->
  <br>
  <row>
    <gcol class="xs-12">
      <box class="panel center-x content-center">
        <row class="content-center">
          <!-- biografía -->
          <gcol class="xs-12 sm-3 md-2 bio margined">
            <div class="photo" :style="{ backgroundImage: this.pic }"/>
            <div class="info">
              <div v-for="parametro in Object.keys(oc.bio)" :key="parametro">{{parametro}}: {{oc.bio[parametro]}}</div>
            </div>
          </gcol>

          <!-- contenido -->
          <gcol class="xs-12 sm-5 md-6 contenido">
          </gcol>

          <!-- botones -->
          <gcol class="xs-12 sm-1 md-1 botones fa-color">
            <div v-on:click="select($event)"><i class="fas fa-brain"/></div>
            <div v-on:click="select($event)"><i class="fas fa-book-open"/></div>
            <div v-on:click="select($event)"><i class="fab fa-jira"/></div>
          </gcol>
        </row>
      </box>
    </gcol>
  </row>
 </box>
</template>

<script>
/* eslint-disable */
import Banner from "@/components/Banner.vue";
import * as json from "@/bdd/ocs.json";

export default {
  name: 'Sheet',
  data() {
    return{
      id: this.$route.query.oc,
      oc: json.default.ocs[this.$route.query.oc],
      pic: ''
    }
  },
  methods: {
    path: async pic => await import(`@/assets/${pic}`).then(path => path.default),
    select: function(event) { 
      var clicked;

      if(event instanceof PointerEvent) { 
        clicked = this.aimCursor(event); // evitar bug svg o path
        document.getElementsByClassName('selected').forEach(boton => {
          if(boton != clicked) boton.classList.remove("selected");
        });
      } else clicked = event;

      clicked.classList.add('selected'); 
      this.setInfo(clicked);
    },
    setInfo: function(element) {
      var contenido = document.querySelector(".contenido");
      if(element.classList.contains("fa-brain")) contenido.innerHTML = this.oc.personalidad;
      if(element.classList.contains("fa-book-open")) contenido.innerHTML = this.oc.historia;
      if(element.classList.contains("fa-jira")) contenido.innerHTML = this.oc.otro;
    },

    aimCursor: function(event) {
      if(event.target.tagName == 'path' || event.target.tagName == 'svg') {
        if(event.target.tagName == 'path') event = event.target.parentElement;
        else event = event.target;
      }
      return event;
    }
  },
  async mounted() {
    var photo = document.querySelector(".photo");
    photo.style.height = `${Math.round(photo.offsetWidth*1.33+1.5)}px`;  
    this.select(document.querySelector(".fa-brain"));  
    this.pic = `url('${await this.path(this.oc.photo)}')`;
  },
  components: {
    Banner
  }
}
</script>

<style lang="scss">
  .bio {
    flex-direction: column;
  }

  .panel {
    display: flex;
    width: 100%;
    margin: 10px 0px 0px 0px;
    align-items: stretch;
  }

  .photo {
      background: #040404;
      border: 15px solid #000;
      background-position: center;
      background-size: cover;
      //height: 320px;
      //width: 230px;
  }
 
  .info {
      background: #040404;
      color: white;
      padding: 15px;
      width: calc(100% - 30px);
      margin: 10px 0px 10px 0px;
  }

  .contenido {
    background: #040404;
    //width: 450px;
    width: 100%;
    margin: 0px 10px 100px 10px;
    color: #fff;
    padding: 36px;
    font-size: 12px;
    text-align: justify;
  }
  

  // BOTONES
  .botones {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 100px;
    background: #040404;
    color: white;
    margin: 0px 0px 10px 0px;

    position: absolute;
    bottom: -10px;

    .svg-inline--fa {
      padding: 20px;
      margin: 7px 0px;
      font-size: 19px;
      border-radius: 2px;
      transition: 0.4s;

      &:hover {
        background: #101010;
        border-radius: 4px;
        transition: 0.4s;
      }
    }

    .fa-color {
      color: white;
      transition: 0s;
    }
    

    path {
      transition: 0s;
    }

    .selected {
      background: #0a0a0a;
    }
  }

  .margined {
    margin: 15px;
  }

  @media (min-width: 768px) {
    .botones {
      flex-direction: column;
      position: relative;
      bottom: auto;

    }

    .contenido {
      margin: 0px 10px 10px 10px;
    }

    .margined {
      margin: 0px;
    }
  }



  


</style>
