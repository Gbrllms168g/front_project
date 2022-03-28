<template>

<NavBar msg="Usuarios activos"/>

  <p v-if="paginated_info.length === 0" class="text-center">
  <div class="d-inline p-2 bg-danger text-white text-center">Actualmente no hay usuarios Activos</div>
  </p>

  <div style="background-color: rgba(195, 191, 191, 0.4) " class="container mt-5">

    <div>
      <div class="row d-flex justify-content-center">
        <table style="width: 40%" class="table table-striped">
          <thead>
          <td style="width: 5%"><strong>#</strong></td>
          <td style="width: 10%"><strong>Nombre</strong></td>
          <td style="width: 20%"><strong>Apellidos</strong></td>
          <td style="width: 15%"><strong>Fecha de alta</strong></td>
          </thead>
          <tbody>
          <tr  v-for="(user, i) in paginated_info" :key="user.id_cliente" @click="selectRow(user.id_cliente)" :class="{'highlight': (user.id_cliente == selectedUser)}">
            <td><strong>{{i + 1}}</strong></td>
            <td>{{user.nombre}}</td>
            <td>{{user.apellido_paterno }} {{user.apellido_materno }}</td>
            <td>{{user.fecha_alta }}</td>
          </tr>
          </tbody>
        </table>

        <div class="d-flex justify-content-center">
          <Pagination v-if="isMounted" :page_elements="page_elements" :total_pages="total_pages()" @accion="get_index_pages" />
        </div>

      </div>
    </div>

  </div>

</template>

<script>
import NavBar from "@/components/NavBar";
import Pagination from "@/components/Pagination";
import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_SERVICE_SERVER
// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/albums'


export default {
  name: "UsersList",
  components: {Pagination, NavBar},
  // Se exporta la informacion de los usuarios por pagina, cuantos elementos por pagina
  //y banderas para el control de componentes
  data() {
    return {
      activeUserList: [],
      page_elements: 4,
      paginated_info: [],
      isMounted: false, //El componente hijo espera a que el componente padre este cargado para asi inicializarse
      selectedUser: null
    }
  },
  methods: {
    //Obtiene la lista de usuarios activos
    async getList(){
      await axios.get(`/`)
      .then(response => {
        this.activeUserList = response.data.data.active[0]
        this.isMounted =  true
      })
      .catch((error) => console.log(error))

    },
    //Obtiene el total de paginas en base a la lista de usuarios activos
    total_pages(){
      return Math.ceil(this.activeUserList.length / this.page_elements)
    },
    //Va obteniendo el indice de paginas
    get_index_pages(e){
      let start = e[0]
      let end = e[1]
      this.paginated_info = []
      end = end < this.activeUserList.length ? end : this.activeUserList.length -1
      for (let i = start; i < end ; i++) {
        this.paginated_info.push(this.activeUserList[i])
      }
    },
    //Cambiar de ruta al hacer click sobre alguna fila
    selectRow(user){
      this.selectedUser = user;
      this.$router.push(`/user/${this.selectedUser}`)
    }
  },
  //al cargar el componente se ejecuta la funcion para obtener la lista
  created() {
    this.getList()
  }
}
</script>

<style scoped>

tr {
  cursor:pointer;
}
tr:hover{
  background-color: rgba(57, 56, 56, 0.62);;
}
* {
  font-size: 1.3rem;
}

</style>