<template>
  <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{title}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <div v-if="type === 1">

            <div class="container text-center">
              <div class="text">
                <h5>Estas seguro que deseas eliminar el usuario?</h5>
              </div>

              <div class="buttons">
                <button class="btn btn-danger">Si, quiero eliminar mi perfil</button>
                <button class="btn btn-success">No, quiero conservar mi perfil</button>
              </div>
            </div>

          </div>

          <div v-if="type === 2">

          </div>


        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props:['type', 'title'],
  mounted() {
    console.log(this.type)
  }
}
</script>

<style scoped>

</style>