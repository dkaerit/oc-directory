// @ is an alias to /src
<template>
  <router-view/>
</template>

<style lang="scss">
  // fonts
  @import url('https://fonts.googleapis.com/css2?family=Hind+Madurai:wght@300;700&display=swap');

  // external styles
  @import "@/styles/grid-default.scss";
  @import "@/styles/grid-xs.scss";
  @import "@/styles/grid-sm.scss";
  @import "@/styles/grid-md.scss";
  @import "@/styles/grid-lg.scss";

  body {
    background: #030303 url("~@/assets/bg.png");
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

  a {
    text-decoration: none;
  }

  [c-title] {
    transition: 0.55s;
    opacity: 0;
    &:hover {
      transition: 0.55s;
      opacity: 1;
      &::after {
        position: relative;
        top: -30px;
        left: 5px;
        content: attr(c-title);
        color: rgb(201, 201, 201);
        background: #000;
        padding: 5px;
        border: 1px solid #080808;
        z-index: 10;
        font-size: 11px;
        border-radius: 2px;
      }
    }
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
