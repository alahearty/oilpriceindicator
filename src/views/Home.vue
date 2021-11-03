<template>
<div class="container-fluid text-center mt-3">    
  <div class="row content">
    <div class="col-sm-3 sidenav"><Notification /></div>
    <div class="col-sm-7 mt-5"><ChartArea /></div>
    <div class="col-sm-2 sidenav mt-3" >
      
      <div class="card text-center">
        <div class="card-header w3-bar-item w3-button w3-dark-grey w3-button w3-hover-black w3-left-align">
          Latest Crude Oil Price
        </div>
        <div class="card-body">
            <p class="period">Latest Oil Price</p>
            <p class="val">${{CurrentAmount}}</p> 
            <p class="period">Date Period</p>
            <p class="val">{{CurrentDate}}</p>
        </div>
      </div>
      
    </div>
  </div> 
</div>
</template>

<script>
import ChartArea from '@/components/BaseIndex.vue'; // @ is an alias to /src
import Notification from '@/components/BaseNotification.vue'; // @ is an alias to /src

export default {
  name: 'Home',
  components: {
    ChartArea,Notification
  },
  computed:{
    CurrentAmount(){
      return this.$store.getters.GetCurrentPrice
    },
    CurrentDate(){
      return this.$store.getters.GetCurrentDate
    }
  },
}

</script>
<style scoped>
  .period{
    font-size: 16px;
    font-weight: bold;
  }
  .val{
    color: red;
    font-weight: bold;
  }
</style>
