<template>
  <nav class="nav navbar-light bg-success">
    <div id="logo">
      <a class="navbar-brand" href="/">
        <img src="../assets/icon.png" alt="">
      </a>
    </div>
  </nav>

  <div class="mt-3" id="message">
    <p style="font-size: 2rem; color: crimson">{{msg}}</p>
  </div>

</template>

<script>
export default {
  name: "NavBar",
  props:{
    msg: String
  }
}
</script>

<style scoped>

#logo {
  width: 100%;
  text-align: center;
  margin-top: 10px;
}

img{
  width: 320px;
  height: 70px;
}

#message {
  width: 100%;
  text-align: center;
  font-size: 25px;
  font-family: Corbel;
  margin-top: 10px;
  font-weight: bold;
}
</style>