<template>
<div class="principal">
  <h2>Hola mundo</h2>
  <NavBar msg="Hola Navbar"/>
</div>
</template>

<script>
import NavBar from "./../components/NavBar";

export default {
  name: "Principal",
  components: {
    NavBar
  }

}
</script>

<style scoped>

</style>