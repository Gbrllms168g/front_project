<template>

  <nav aria-label="...">
    <ul class="pagination">
      <li class="page-item" ref="start" @click="getPreviousPage()"> <a class="page-link" href="#" tabindex="-1" aria-disabled="true" >Previous</a> </li>
      <li v-for="pagina in total_pages" class="page-item" @click="getPageData(pagina)"><a class="page-link" href="#" >{{pagina}}</a></li>
      <li class="page-item" @click="getNextPage()"> <a class="page-link" href="#">Next</a></li>
    </ul>
  </nav>

</template>

<script>
export default {
  name: "Pagination",
  props:['total_pages', 'page_elements'],
  data() {
    return {
      actualPage: 1
    }
  },
  mounted() {
    this.$refs.start.click();
  },
  methods: {
    getPageData(nPage){
      this.actualPage = nPage
      let start = (nPage * this.page_elements) - this.page_elements
      let end = (nPage * this.page_elements)
      this.$emit('accion', [start, end])
    },
    getPreviousPage(){
      if (this.actualPage > 1 ) {
        this.actualPage--
      }
      this.getPageData(this.actualPage)
    },
    getNextPage(){
      if (this.actualPage < this.total_pages ) {
        this.actualPage++
      }
      this.getPageData(this.actualPage)
    }
  }

}



</script>

<style scoped>

</style>