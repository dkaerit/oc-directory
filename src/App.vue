// @ is an alias to /src
<template>
  <router-view/>
</template>

<style lang="scss">
  @import "@/styles/grid-default.scss";
  @import "@/styles/grid-xs.scss";
  @import "@/styles/grid-sm.scss";
  @import "@/styles/grid-md.scss";
  @import "@/styles/grid-lg.scss";

  body {
    background: #030303 url("~@/assets/bg.gif");
    background-position-x: center;
    background-size: cover;
    min-height: 97.77617926577vh;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  ::-webkit-scrollbar { // fondo
    background: #010101;
    border: 3px solid #010101;
  }
  ::-webkit-scrollbar-button { // botones arriba y abajo
    color: white;
    border-radius: 5px;
    background: #0c0c0c;
    border: 3px solid #010101;
  }
  ::-webkit-scrollbar-thumb { // dragger
    background: #0c0c0c;
    border: 3px solid #010101;
  }


  // ESTILOS TESTING
  .bgteal { background: teal; }
  .bgviol { background: blueviolet; }
  .bgyell { background: #E5bf5d; }
  .bgdark { background: #0a0a0a; color: white }
  .bglight { background: gainsboro; }

  .box-high {
    display: block;
    height: 100px;
    padding: 10px;
  }
  
</style>
