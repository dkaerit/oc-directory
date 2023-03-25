<template>
<div>
    <center><div class="close-relato" @click="this.closeRelato"><i class="fa-regular fa-circle-xmark"></i></div></center>
    <div class="relato-field">
          <!--<center><div class="close-relato" @click="this.closeRelato"><i class="fa-regular fa-circle-xmark"></i></div></center>-->
        <div class="relato-contenido" v-html="parse()">
        </div>
        <img ref="img" src="@/assets/paper.png" @load="updateContenidoWidth"/>
    </div>
</div>
</template>

<script>
import { marked } from "marked";
export default {
  name: 'RelatoComponent',
  props: {
    render: {
      required: true,
    },
    fichero: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      contenidoWidth: 0,
      contenidoHeight: 0,
    };
  },
  mounted() {
    
  },
  beforeUnmount() {
  },
  methods: {
    closeRelato() {
      this.$emit("close-relato");
    },
    parse() {
        return this.fichero? 
            marked.parse(this.fichero):
            "";
    }
  },
};
</script>

<style lang="scss">


.relato-field {
  position: relative;
  width: 100%;
  height: auto;

    img {
        width: 100%;
        height: auto;
    }

    .relato-contenido {
        overflow: auto;
        position: absolute;
        top: 0;
        left: 0;
        width: 79%;
        padding-right: 3%;
        padding-top: 9%;
        padding-bottom: 9%;
        height: 71%;
        overflow-y: auto;
        color: #000;
        margin: 10% 1px -4px 11%;
        mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), black 10%, black 90%, rgba(0, 0, 0, 0));
        filter: blur(0.5px);
    }

    ::-webkit-scrollbar { // fondo
        background: #ebebeb;
        border: 3px solid #e6e6e6;
        width: 5px;
    }
    ::-webkit-scrollbar-button { // botones arriba y abajo
        color: white;
        border-radius: 5px;
        background: #8b8b8b;
        border: 0px solid #868686;
        display: none;
    }
    ::-webkit-scrollbar-thumb { // dragger
        background: #808080;
        border: 1px solid #7c7c7c;
    }

    // close


}
.close-relato:hover {
    //font-size: 32px;
    transform: scale(1.5);
    transition: transform 0.3s ease;
    //margin-bottom: -5px;
}

.fa-regular.fa-circle-xmark {
  display: block;
  font-size: 16px;
  transition: transform 0.3s ease; /* Añade una transición suave al hacer hover en el icono */
}

.close-relato {
  transition: transform 0.3s ease;
  color: #383838;
  cursor: pointer;
    /*margin-bottom: 0px;
    font-size: 27px;
    color: #383838;
    position: relative;
    filter: blur(0.5px);
    z-index: 2;
    transform: translate(-50%, 16px);
    left: 50%;
    transition: 0.2s;*/
}

// estilos de los markdown
titulo, antetitulo, capitulo, antecapitulo, numbercap {
    display: block;
    text-align: center;
}

@font-face {
  font-family: 'Mr Eaves Small Caps';
  src: url('@/assets/fonts/MrEavesSmallCaps.otf');
}

@font-face {
  font-family: 'Scala Sans';
  src: url('@/assets/fonts/ScalaSans(Light).otf');
}

@font-face {
  font-family: 'Georgia Pro Black';
  src: url('@/assets/fonts/GeorgiaPro(CondSemiBold).otf');
}

@font-face {
  font-family: 'Chuello Jambully';
  src: url('@/assets/fonts/ChuelloJambully(Regular).otf');
}

@font-face {
  font-family: 'Georgia Pro Light';
  src: url('@/assets/fonts/GeorgiaPro(CondLight).otf');
}


.handwrite { 
  font-family: 'Chuello Jambully', sans-serif; 
  font-size: 25px;
}

antetitulo {
    font-family: "Mr Eaves Small Caps", sans-serif;
    font-size: 19px;
    letter-spacing: -0.5px;
    line-height: 5px;
    font-weight: 900;
    padding-top: 15px;
}

titulo {
  font-family: "Mr Eaves Small Caps", sans-serif;
  font-size: 27px;
  letter-spacing: -0.5px;
  font-weight: 900;
}

.relato-contenido {
  font-family: 'Scala Sans', sans-serif;
  p {
    font-family: 'Scala Sans', sans-serif;
    text-indent: 20px;
  }
}

capitulo, numbercap {
  font-family: 'Georgia Pro Black', sans-serif;
  font-size: 18px;
  font-weight: 900;
}

antecapitulo {
    font-family: "Georgia Pro Light", sans-serif;
    font-size: 13px;
    font-weight: 600;
    line-height: 6px;
    padding-top: 14px;
}

p.wmargin {
  margin: 0px;
}
    
</style>