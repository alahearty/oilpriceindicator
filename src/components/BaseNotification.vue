<template>
  <div>
      <!-- Side Navigation -->
      <div class="w3-sidebar w3-bar-block w3-collapse w3-white w3-animate-left w3-card mt-2" style="z-index:3;width:320px;" id="mySidebar">
      <embed src="success.wav" autostart="false" width="0" height="0" id="sound1" enablejavascript="true">
      <small class="w3-bar-item w3-button w3-dark-grey w3-button w3-hover-black w3-left-align" >Latest Oil Price Indicators</small>
        <a id="myBtn" @click="myFunc()" class="w3-bar-item w3-button w3-show"><i class="fa fa-inbox w3-margin-right"></i>Notifications <div class="notification"><i class="fa fa-bell" style="color:gray"></i><span class="badge">{{GetNotificationCount}}</span></div></a>
        
        <a href="#" class="w3-bar-item w3-button" onclick="document.getElementById('id01').style.display='block'"><i class="fa fa-paper-plane w3-margin-right"></i>Send Email</a>
        <div class="priceChange">
            <p>Price Change Value for Email Notification</p>$
            <VueNumberInput 
            v-model="priceChange"
		        :min="0"
			      :max="100"
            ></VueNumberInput>
             <!-- <input type="text" v-model="priceChange" v-on:keyup.enter="SetPriceChange"> -->
            <button v-on:click="SetPriceChange">Set</button>
        </div>
        </div>
      <!-- Modal that pops up when you click on "New Message" -->
      <div>
        <NewEmail/>
      </div>
  </div>
</template>

<script>
import VueNumberInput from '@smartweb/vue-number-input';
import NewEmail from '@/components/BaseNewEmail.vue'; // @ is an alias to /src
import {mapGetters} from 'vuex'
export default {
  components: {
    NewEmail,
    VueNumberInput
  },
  data() {
    return {
      foo: 'bar',
      priceChange: 0,
      counter : 0
    }
  },
  computed: {
    ...mapGetters([
      'GetCurrentPrice',
      'GetCurrentDate',
      'GetLastMessage',
      'GetAllMessages',
      'GetPriceChange'
    ]),
    GetNotificationCount(){
      return this.$store.getters.GetAllMessages.length
    }
  },
   
  methods:{
    SetPriceChange(){
      this.$store.dispatch('SetPriceChange', this.priceChange)
    },
    // PlaySound() {
    //   var sound = document.getElementById(sound1);
    //   sound.Play();
    // }
  },

  // watch:{
  //   GetNotificationCount(){
  //    this.PlaySound("sound1");
  //    console.log("Play Sound Watcher");
  //   }
  // },

  mounted(){
    this.priceChange = this.$store.getters.GetPriceChange
    this.$store.dispatch('RealTimeData')
    setInterval(() => {
       this.$store.dispatch('RealTimeData')
    }, 10000)
  },
}
</script>

<style scoped>

    .notification {
      text-decoration: none;
      position: relative;
      display: inline-block;
      border-radius: 2px;
    }
    .notification:hover{
      border: violet;
      border-color: gray;
      border-radius: 40%;
    }
    .notification .badge {
      position: absolute;
      top: -6px;
      right: -10px;
      padding: 3px 6px;
      border-radius: 40%;
      background: transparent;
      color: rgb(148, 11, 11);
    }
    .priceChange{
      position: absolute;
      bottom: 40px;
      left: 20px;
    }
</style>