<template>
 <box>
  <!-- Banner -->
  <Banner/>

  <!-- audio -->
  <center>
    <br/>
    <Player :src="audioSource"/>

  <!-- panel -->
  </center>
  <br>
  <row>
    <gcol class="xs-12">
      <box class="panel center-x content-center">
        <row class="content-center">
          <!-- biografía -->
          <gcol class="xs-12 sm-4 md-3 bio margined">
            <div class="photo" :style="{ backgroundImage: this.pic }"/>
            <div class="info">
              <div class="tab" v-for="parametro in Object.keys(oc.bio)" :key="parametro">
                <div class="tag key">{{parametro}}</div> 
                <div class="tag value">{{oc.bio[parametro]}}</div>
              </div>
            </div>
          </gcol>

          <!-- contenido -->
          <gcol class="xs-12 sm-4 md-5 contenido">
            <ContentBody v-if="this.seccion === 'personalidad'" :render="parse(this.personalidad)"/>
            <ContentBody v-if="this.seccion === 'historia'" :render="parse(this.historia)"/>
            <ContentBody v-if="this.seccion === 'otros'" :render="parse(this.otros)"/>
            <RelatosBody v-if="this.seccion === 'relatos'" :relatos="this.relatos" :id="this.id"/>
          </gcol>

          <!-- botones -->
          <gcol class="xs-12 sm-1 md-1 botones fa-color">
            <div v-on:click="select($event)"><i class="bo fas fa-brain"/></div>
            <div v-on:click="select($event)"><i class="bo fas fa-book-open"/></div>
            <div v-on:click="select($event)"><i class="bo fab fa-jira"/></div>
            <div v-on:click="select($event)"><i class="bo fa-solid fa-feather-pointed"/></div>
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
import ContentBody from "@/components/ContentBody.vue";
import RelatosBody from "@/components/RelatosBody.vue";
import Player from "@/components/Player.vue";
import * as json from "@/bdd/ocs.json";
import { marked } from "marked";

export default {
  name: 'Sheet',
  data() {
    return{
      id: this.$route.query.oc,
      oc: json.default.ocs[this.$route.query.oc], // oc.id -> 0
      relatos: json.default.ocs[this.$route.query.oc].relatos,
      
      // secciones triada
      seccion: 'personalidad',
      personalidad: import(`@/bdd/ocs-mds/${json.default.ocs[this.$route.query.oc].id}/personalidad.md`).then(val => val.default),
      historia: import(`@/bdd/ocs-mds/${json.default.ocs[this.$route.query.oc].id}/historia.md`).then(val => val.default),
      otros: import(`@/bdd/ocs-mds/${json.default.ocs[this.$route.query.oc].id}/otros.md`).then(val => val.default),
      pic: '',

      // Audio player youtube
      apiKey: "AIzaSyDo3jIJPu7aTIRtKYXfZOW526f4RwHtT7A",
      videoId: json.default.ocs[this.$route.query.oc].audio,
      audioSource: null,
    }
  },
  methods: {
    path: async pic => await import(`@/assets/${pic}`).then(path => path.default),
    async loadAudio() {
      const audio = await import(`@/assets/musics/${json.default.ocs[this.id].audio}`);
      this.audioSource = audio.default;
    },


    parse: async markdown => {
      return await marked.parse(await markdown);
    },



    aimCursor: function(event) {
      if(event.target.tagName == 'path' || event.target.tagName == 'svg' || event.target.tagName == 'i') {
        if(event.target.tagName == 'path') event = event.target.parentElement;
        else event = event.target;
      } else event = event.target;
      return event;
    },


    select: function(event) { 
      var clicked;
      if(event instanceof PointerEvent) {
        clicked = this.aimCursor(event); // evitar bug svg o path
        Array.from(document.querySelectorAll('.selected')).forEach(boton => {
          if(boton != clicked) boton.classList.remove("selected");
        });
      } else clicked = event;

      clicked.classList.add('selected'); 
      this.setInfo(clicked);
    },



    setInfo: async function(element) {
      if(element.classList.contains("fa-brain")) this.seccion = 'personalidad'  
      if(element.classList.contains("fa-book-open")) this.seccion = 'historia'
      if(element.classList.contains("fa-jira")) this.seccion = 'otros'
      if(element.classList.contains("fa-feather-pointed"))  this.seccion = 'relatos'
    },

  renderRelatos: function() {
      var relatosBody = "";
      if(this.relatos) {
        Object.values(this.relatos).map((relato,i) => {
          if(i%2==0) relatosBody += "<row>";
          
          let resumeMAX = 124, titleMAX = 35;
          let title = (relato.title.length > titleMAX)? relato.title.slice(0,titleMAX)+"...":relato.title;
          let resume = (relato.resume.length > resumeMAX)? relato.resume.slice(0,resumeMAX)+"...":relato.resume;
          relatosBody += `
          <gcol class="el-relato xs-12 sm-6 md-6"><div class="block-relato ">
          <img src="${relato.image}"/>
            <div class="content-relato">
            <div class="titulillo">${title}</div>
            <div class="miniresume">${resume}</div>
            </div>
          </div></gcol>`;
          if(i%2==1) relatosBody += "</row>";
        });
      }

      return `<div><h1 id="relatos">Relatos</h1></div> <box><row>${relatosBody}</row></box>`;
  }

  },
  created() {
    this.loadAudio();
  },
  async mounted() {
    var photo = document.querySelector(".photo");
    photo.style.height = `${Math.round(photo.offsetWidth*1.33+1.5)}px`;  
    this.select(document.querySelector(".fa-brain"));  
    this.pic = `url('${await this.path(this.oc.photo)}')`;  
  },
  components: {
    Banner, Player, ContentBody, RelatosBody
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
      font-size: 14px;
  }

  .contenido {
    background: #040404;
    //width: 450px;
    width: 100%;
    margin: 0px 10px 100px 10px;
    color: #fff;
    padding: 36px;
    font-size: 14px;
    text-align: justify;
  }
  

  // BOTONES
  .botones {
    z-index: 99;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    flex-direction: row;
    width: 100px;
    background: #040404;
    color: white;
    margin: 0px 0px 10px 0px;
    /*position: absolute;*/
    padding-top: 20px;
    bottom: -10px;

    position: absolute;
    bottom: -10px;

    .bo {
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

  .contenido {
    display: block;
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

  @media (max-width: 767px) {
    .botones {
      justify-content: center;
      position: fixed;
      padding-top: 0px;
    }

    .center-x {
      position: relative;
      left: auto;
      transform: none;
    }
  }

.tab {
    display: flex;
    .tag {
        
        margin: 3px;
        padding: 5px;
        border-radius: 3px;
        text-align: center;
        padding-top: 7px;
    }
    .value {
      background: #080808;
      
      width: 67%;
    }
    .key {
      background: #121212;
      width: 33%;
    }
}


dt.spoiler_title {
  cursor: pointer;
  padding: 10px;
  border: 1px solid #121212;
  border-radius: 3px;
  margin: 0px;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  position: relative;
}

.spoiler_title:hover + dd .spoiler_content,
.spoiler_title:focus + dd .spoiler_content {
  display: block;
}

dd.hidden {
  visibility: hidden;
  max-height: 0;
  opacity: 0;
  transition: 0.25s;
  padding: 0px 7px;
}


dd {
  visibility: visible;
  max-height: 99500px; /* cualquier altura máxima que se adapte a su contenido */
  margin-inline-start: 0px;
  opacity: 1;
  transition: 0.5s;
  padding: 15px 7px;
}

.spoiler_title.opened .fa-solid:before {
  content: "\f068";
}

.fa-solid.minusplus {
  float: right;
  position: relative;
  top: 2px;
}

.fa-solid.minusplus:before {
  content: "\f067";

}

gcol {
  h2, ul, p {
     margin-top: 0px;
  }
}

.contenido {
  table {
    margin: 10px 0px;
    width: 100%;
  }

  th, td{
    text-align: center;
    .tab { 
      border-radius: 5px;
      padding: 7px;
      display: flex;
      justify-content: center;
    }
  }

  th {
    .tab {
      background: #1a1a1a73;
    }
  }

  td {
    .tab {
      border: 1px solid #1a1a1a73;
      margin-top: 2px;
      font-variant: normal;
    }
  }
}

.botones {
  & {
    cursor: pointer;
  }
  
}



</style>
