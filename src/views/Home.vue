<template>
 <box>
   <!-- BLOG INFO -->
   <Banner/>
   <!-- FILTROS -->
  <div class="filters">
    <select class="dropdown-content" v-model="selectedDim" @change="updateFilters">
      <option value="">Todas las dimensiones</option>
      <option v-for="dim in dimensions" :value="dim" :key="dim">{{ dim }}</option>
    </select>
    <select class="dropdown-content" v-model="selectedCanon" @change="updateFilters">
      <option value="">Todos los cánones</option>
      <option value="no">Original Characters</option>
      <option value="yes">Personajes Canon</option>
      <!--<option v-for="canon in canons" :value="canon" :key="canon">{{ canon }}</option>-->
    </select>
  </div>
   <!-- CUADRADOS DE -->
   <row>
     <gcol class="xs-12 center-x">
       <div class="flex-wrap style-wrap">
         <Avatar v-for="avatar in avatarsToDisplay" :key="avatar.id" :oc="avatar" :value="avatar.id"/>
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
      mode: this.$route.query.mode,
      ocs: json.default.ocs
    }
  },
  methods: {
    range: (a,b) => {
      if(b === undefined) { b = a; a = 1; }
      return [...Array(b-a+1).keys()].map(x => x+a);
    },


    updateFilters() {
      const newDim = this.selectedDim || undefined;
      const newCanon = this.selectedCanon || undefined;

      // Actualizar los parámetros de la ruta.
      this.$router.replace({
        query: {
          dim: newDim,
          canon: newCanon
        }
      });
    }


    
  },
  async mounted() {
    console.log(this.mode);
  },
  computed: {
    dimensions() {
      // Obtener todas las dimensiones de los avatares.
      const avatars = Object.values(this.ocs);
      const dims = new Set(avatars.map(avatar => avatar.dim));
      return Array.from(dims);
    },
    canons() {
      // Obtener todos los cánones de los avatares.
      const avatars = Object.values(this.ocs);
      const canons = new Set(avatars.map(avatar => avatar.canon));
      return Array.from(canons);
    },
    filteredAvatars() {
      const filters = {};
      
      // Recorremos los parámetros de la URL y agregamos los filtros al objeto 'filters'
      for (let param in this.$route.query) {
        filters[param] = this.$route.query[param];
      }

      return Object.values(this.ocs).filter(avatar => {
        return Object.keys(filters).every(key => avatar[key] === filters[key]);
      });
    },
    avatarsToDisplay() {
      const avatars = this.filteredAvatars;
      const avatarsNeeded = 32 - avatars.length;

      // Crea un array de elementos nulos para los avatares faltantes.
      const nullAvatars = Array.from({ length: avatarsNeeded }, () => ({}));

      // Combina los arrays de avatares filtrados y nulos.
      return [...avatars, ...nullAvatars];
    },
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

  .filters {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  // Desplegable
  .dropdown-content {
    background-color: #0e0e0e;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 20%);
    z-index: 1;
    padding: 5px;
    border-radius: 5px;
    color: #fff;
    margin: 11px 12px 0px 0px;
}

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .dropdown-content a {
    color: #f2f2f2;
    padding: 5px 10px;
    text-decoration: none;
    display: block;
  }

  .dropdown-content a:hover {
    background-color: #444444;
  }

</style>
