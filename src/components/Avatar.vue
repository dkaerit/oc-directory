<template>
    <div class="avatar">
      <router-link v-if="oc" :to="`/sheet?oc=${oc.id}`" :c-title="oc.nombre">
        <div class="mini-pic" :style="{'backgroundImage': url(oc.avatar)}"></div>  
      </router-link>
      <div v-else class="mini-pic"></div>
    </div>
</template>

<script>
export default {
  name: 'MiniAvatar',
  data() {
    return {}
  },
  props: {
      oc: Object,
  },
  methods: {
    url: pic => `url('${require('@/assets/'+pic)}')`,
  },
}
</script>

<style scoped lang="scss">
.avatar {
    background: #000;
    background-size: cover;
    width: 112px;
    height: 112px;
    border: 10px solid #080808;
    margin: 5px 0 0 5px;
    transition: ease-out 0.9s;
    
}
.avatar:hover {
    background: #030303 url("~@/assets/ocs-avatar/default.png") 0.8;
    transform: scale(1.05);
    cursor: pointer;
    transition: ease-out 0.3s;
}

.mini-pic {
    background: #030303 url("~@/assets/ocs-avatar/default.png");
    background-size: cover;
    transform: translateX(-5px) translateY(-5px);
    width: 112px;
    height: 112px;
    margin: 5px 0 0 5px;
    filter: grayscale(100%);
    opacity: 0.9;
    transition: ease-in-out 0.8s;
}
.mini-pic:hover {
    background: #030303 url("~@/assets/ocs-avatar/default.png") 0.8;
    filter: grayscale(0%);
    opacity: 1;
    cursor: pointer;
    transition: ease-in-out 0.3s;
}
</style>