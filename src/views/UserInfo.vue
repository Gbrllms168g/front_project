<template>
  <NavBar msg="Perfil de usuario"/>

  <div class="container">

    <p v-if="errors.length">
      <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
    <ul>
      <li class="d-inline p-2 bg-danger text-white" v-for="error in errors">{{ error }}</li>
    </ul>
    </p>

    <p v-if="status">
    <div class="d-inline p-2 bg-success text-white">{{status}}</div>
    </p>

    <div class="info d-flex justify-content-center">

      <div class="cards d-flex">

        <div class="card" style="width: 18rem; margin: 10px">
          <div class="card-body">
            <p class="card-title">Hola: </p>
            <h6 class="card-title text-center">{{ userInfo.nombre }} {{userInfo.apellido_paterno}} {{userInfo.apellido_materno}}</h6>

            <hr>

                  <div class="d-flex justify-content-center mt-2" style="width: 100%;">
                    <span>
                      <img src="@/assets/user.png" class="card-img-top" alt="...">
                    </span>
                  </div>

            <div class="d-flex justify-content-center mt-3">
              <div class="update flex-fill text-center">
                <span>

                  <!-- Button trigger modal -->
                  <button type="button shadow-none" class="btn" data-bs-toggle="modal" data-bs-target="#delete">
                        <img src="@/assets/basura.png">
                  </button>


                </span>
              </div>
              <div class="delete flex-fill text-center">
                <span>
                  <button type="button shadow-none" class="btn" data-bs-toggle="modal" data-bs-target="#update">
                        <img src="@/assets/update.png">
                  </button>
                </span>
              </div>

              <div class="info flex-fill text-center">
                <span>
                  <button type="button shadow-none" class="btn" data-bs-toggle="modal" data-bs-target="#show">
                        <img src="@/assets/lista.png">
                  </button>
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>

    <div class="cards d-flex">

      <div class="card" v-show="show_cards" style="width: 18rem; margin: 10px" v-for="user in formated_data">
        <!--      <img src="..." class="card-img-top" alt="...">-->
        <div class="card-body">
          <p class="card-title">Tipo de cuenta: </p>
          <h4 class="card-title text-center">{{ user.nombre_cuenta }}</h4>
          <hr>
          <p class="card-text">Fecha de contratacion:</p>
          <h5 class="card-text text-center"> {{ user.fecha_contratacion }}</h5>

          <p class="card-text">Saldo:</p>
          <h5 class="card-text text-center" style="font-size: 2rem; margin-top: -30px;"> {{ user.saldo_actual }} MXN</h5>

        </div>
      </div>

    </div>

  </div>


  <!-- Modal for delete -->
  <div class="modal fade" id="delete" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="deleteModalLabel">Eliminar usuario</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-footer">
          <button @click="delete_user" type="button" class="btn btn-primary">Eliminar</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal for update -->
  <div class="modal fade" id="update" ref="modalInfo" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="updateModalLabel">Actualizar informacion del usuario</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <form @submit.prevent="update_submit_form">
            <input type="hidden" name="id" :value="userInfo.id_cliente">
            <div class="form-group">
              <label for="name">Nombre:</label>
              <input type="text" class="form-control" id="name" name="name" :value="userInfo.nombre">
            </div>
            <div class="form-group">
              <label for="a_p">Apellido paterno:</label>
              <input type="text" class="form-control" id="a_p" name="a_p" :value="userInfo.apellido_paterno">
            </div>
            <div class="form-group">
              <label for="a_m">Apellido materno:</label>
              <input type="text" class="form-control" id="a_m" name="a_m" :value="userInfo.apellido_materno">
            </div>
            <div class="form-group">
              <label for="rfc">RFC:</label>
              <input type="text" class="form-control" id="rfc" name="rfc" :value="userInfo.rfc">
            </div>
            <div class="form-group">
              <label for="curp">Curp:</label>
              <input type="text" class="form-control" id="curp" name="curp" :value="userInfo.curp">
            </div>
            <hr>
            <div class="cancel text-center" style="width: 50%">
              <button type="submit" class="btn btn-warning">Cancelar</button>
            </div>

            <div class="d-flex justify-content-center">
              <div class="save text-center" style="width: 50%">
                <button  class="btn btn-success">Guardar</button>
              </div>

            </div>
          </form>

        </div>

      </div>
    </div>
  </div>

  <!-- Modal for show -->
  <div class="modal fade" id="show" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="showModalLabel">Mostrar información del usuario</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-footer">

          <button type="button" @click="select_option" class="btn btn-primary">Si, quiero ver mi
            información
          </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import NavBar from "@/components/NavBar";
import axios from "axios";
import moment from "moment";
import 'moment/locale/es'

moment.locale('es');
axios.defaults.baseURL = process.env.VUE_APP_SERVICE_SERVER
export default {
  name: "resultInfo",
  components: {NavBar},
  data() {
    return {
      resultInfo: [],
      formated_data: [],
      userInfo: {},
      show_cards: false,
      secret: process.env.VUE_APP_SECRET_PASS,
      errors:[],
      status: null,
      name: null,
      a_p:null,
      a_m:null,
      rfc:null,
      curp:null,
    }
  },
  methods: {
    checkForm(name, a_p, a_m, rfc, curp) {
      this.errors = []
      if (!name){
        this.errors.push("El nombre es requerido")
      } else {
        if (name.length > 20) {
          this.errors.push("El nombre debe ser menor a 20 caracteres")
        }
      }
      if (!a_p){
        this.errors.push("El apellido paterno es requerido")
      } else {
        if (a_p.length > 20) {
          this.errors.push("El apellido paterno debe ser menor a 20 caracteres")
        }
      }
      if (!a_m){
        this.errors.push("El apellido materno es requerido")
      } else {
        if (a_m.length > 20) {
          this.errors.push("El apellido materno debe ser menor a 20 caracteres")
        }
      }
      if (!rfc){
        this.errors.push("El rfc es requerido")
      } else {
        if (rfc.length > 20) {
          this.errors.push("El rfc debe ser menor a 20 caracteres")
        }
        // else if (!this.validate_rfc(rfc)){
        //   this.errors.push("El rfc debe ser coincidir con alguno de los siguientes formatos: \"XXXX000000X00 XXXX00000\"")
        // }
      }
      if (!curp){
        this.errors.push("El curp es requerido")
      } else {
        if (curp.length > 20) {
          this.errors.push("El curp debe ser menor a 20 caracteres")
        }
        // else if (!this.validate_curp(curp)){
        //   this.errors.push("El curp debe ser coincidir con el siguiente formatos: \"XXXX000000XXXXXX00\"")
        // }
      }
    },
    validate_rfc(rfc){
      const rfc_format = /^[a-zA-Z]{3,4}(\d{6})((\D|\d){2,3})?$/;
      return rfc_format.test(rfc)
    },
    validate_curp(curp){
      const curp_format = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/
      return curp_format.test(curp)
    },
    async getresultInfo() {
      await axios.get(`/user/${this.$route.params.id}`)
          .then(response => {
            this.resultInfo = response.data
            this.isMounted = true
            this.userInfo = response.data[0]
            this.format_date()
          })
          .catch((error) => console.log(error))
    },
    format_date() {
      this.formated_data = this.resultInfo.map(data => {
        data.fecha_alta = moment(data.fecha_contratacion).format('LL')
        data.fecha_contratacion = moment(data.fecha_contratacion).format('LL')
        data.fecha_ultimo_movimiento = moment(data.fecha_contratacion).format('LL')
        return data
      })
    },
    select_option() {
      this.show_cards = true
    },
    async update_submit_form(e) {
      const formData = new FormData(e.target)

      const payload = {
        id: this.$route.params.id,
        name: formData.get('name'),
        ap: formData.get('a_p'),
        am: formData.get('a_m'),
        rfc: formData.get('rfc'),
        curp: formData.get('curp')
      }
      this.checkForm(payload.name, payload.ap, payload.am, payload.rfc, payload.curp)
      console.log(this.errors.length)
      if (this.errors.length === 0) {
        const responsePromise = axios.patch(`/user/${this.$route.params.id}`, payload)
        const response = await responsePromise
        const {success, msg} = response.data

        if (success){
          this.status = msg
          this.userInfo = {
            nombre: payload.name,
            apellido_paterno: payload.ap,
            apellido_materno: payload.am,
            rfc: payload.rfc,
            curp: payload.curp
          }

        } else {
          this.errors.push(msg)
        }
      }

    },
    async delete_user() {
      const responsePromise = axios.delete(`/user/${this.$route.params.id}`, payload)
      const response = await responsePromise
      const {success, msg} = response.data

      if (success){
        this.$forceUpdate
        this.status = msg
      } else {
        this.errors.push(msg)
      }

    }
  },
  created() {
    this.getresultInfo()
  }
}
</script>

<style scoped>

.update span, .delete span {
  cursor: pointer;
}

* {
  font-size: 1.3rem;
}

</style>