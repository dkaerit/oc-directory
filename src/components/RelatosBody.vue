<template>
  <div>
    <h1 id="relatos">Relatos</h1>
    <!-- LISTA DE RELATOS -->
    <box v-show="showBox">
      <template v-for="(relato, i) in relatos" :key="i">
      <template v-if="i%2 == 0">
      <row>
        <gcol v-if="relatos[i]" class="el-relato xs-12 sm-6 md-6">
          <div class="block-relato" @click="hideRelato(id+'/relatos/'+relatos[i].fichero)">
            <div class="image">
                <div class="tags">
                    <div class="tag" v-for="tag in relatos[i].tags" :key="tag">{{tag}}</div>
                </div>
                <img :src="relatos[i].image" />
            </div>
            <div class="content-relato">
              <div class="titulillo">{{ truncate(relatos[i].title, maxTitleLength) }}</div>
              <div class="miniresume">{{ truncate(relatos[i].resume, maxResumeLength) }}</div>
            </div>
          </div>
        </gcol>
        <gcol v-if="relatos[Number(i)+1]" class="el-relato xs-12 sm-6 md-6">
          <div class="block-relato" @click="hideRelato(id+'/relatos/'+relatos[Number(i)+1].fichero)">
            <div class="image">
                <div v-for="tag in relatos[i].tags" :key="tag">
                    <div class="tag">{{tag}}</div>
                </div>
                <img :src="relatos[i].image" />
            </div>
            <div class="content-relato">
              <div class="titulillo">{{ truncate(relatos[Number(i)+1].title, maxTitleLength) }}</div>
              <div class="miniresume">{{ truncate(relatos[Number(i)+1].resume, maxResumeLength) }}</div>
            </div>
          </div>
        </gcol>
      </row>
      </template>
      </template>
    </box>

    <!-- FIELD RELATO -->
    <Relato v-show="showRelato" :fichero="relatoFichero" @close-relato="hideRelato"/>

  </div>
</template>

<script>
import Relato from "@/components/Relato.vue";
//import { marked } from "marked";

export default {
  name: "RelatosBody",
  data() {
    return {
        showBox: true,
        showRelato: false,
        relatoFichero: null,
    };
    },
  props: {
    relatos: {
      type: Array,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    maxResumeLength: {
      type: Number,
      default: 155,
    },
    maxTitleLength: {
      type: Number,
      default: 35,
    },
  },
  methods: {
    truncate(text, maxLength) {
      return (text.length > maxLength)? 
      text.slice(0, maxLength) + "...":
      text;
    },
    async hideRelato(fichero = null) {
        
        this.relatoFichero = fichero? 
          await import(`@/bdd/ocs-mds/${fichero}`).then(val => val.default): 
          null;

        this.showBox = !this.showBox;
        this.showRelato = !this.showRelato;
    }
  },
  components: {
    Relato
  }
};
</script>

<style lang="scss">
.el-relato {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.block-relato {
  display: flex;
  border: 1px solid #141414;
  overflow: hidden;
  margin: 5px;
  border-radius: 7px;
  background: #080808ad;
  height: 144px;
  .image {
    width: 415px;
    img {
        width: 100%;
        margin-bottom: -5px;
        height: 100%;
        object-fit: cover;
    }

  }

  .titulillo {
    font-weight: 900;
    text-align: initial;
    text-overflow: ellipsis;
    height: 37px;
    overflow: hidden;
  }

  .content-relato {
      padding: 16px;
  }

  .miniresume {
    font-size: 0.75em;
    padding-top: 10px;
    max-height: 62px;
    overflow: hidden;
    word-wrap: break-word; /* permitir que las palabras se dividan en varias líneas */
    position: relative; /* establecer la posición como relativa para permitir la posición absoluta de los puntos suspensivos */
  }


  .tags {
    height: 124px;
    position: absolute;
    z-index: 2;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    width: 70px;
    align-content: flex-end;
    align-items: flex-end;
    overflow: hidden;

    .tag {
        background: #1a1a1a61;
        padding: 5px 10px;
        border: 1px solid #48484854;
        height: fit-content;
        border-radius: 10px;
        font-size: 11px;
        margin: 2px;
        backdrop-filter: blur(8px);
    }
  }
}
</style>
