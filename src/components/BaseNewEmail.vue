<template>
  <!-- Modal that pops up when you click on "New Message" -->
  <div id="id01" class="w3-modal">
    <div class="w3-modal-content newModal">
      <header class="w3-container w3-teal w3-dark-grey"> 
        <span onclick="document.getElementById('id01').style.display='none'" 
        class="w3-button w3-display-topright">&times;</span>
        <h2>Send Email</h2>
      </header>
      <div class="w3-container">
        <form class="contact-form newForm" @submit.prevent="sendEmail" id="form1">
            <label>To</label>
            <input class="w3-input w3-border w3-margin-bottom" v-model="email" type="text" name="to_email">
            <label>From</label>
            <input class="w3-input w3-border w3-margin-bottom" v-model="from" type="text" name="from_name">
            <label>Subject</label>
            <input class="w3-input w3-border w3-margin-bottom" v-model="subject" type="text" name="from_subject">
            <input class="w3-input w3-border w3-margin-bottom" v-model="message" style="height:150px" name="message" placeholder="What's on your mind?">
            <div class="w3-section">
              <a class="w3-button w3-red cancel w3-dark-grey" onclick="document.getElementById('id01').style.display='none'">Cancel &nbsp;<i class="fa fa-remove"></i></a>
              <input type="submit" value="Send" class="w3-button w3-light-grey w3-right send"/>
            </div>    
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import emailjs from 'emailjs-com'
export default {
  name: 'BaseEmail',
  props: {
    msg: String
  },
  data(){
    return{
      email: ['alapherwori8g5@gmail.com', 'adamsabdulazeez57@gmail.com', 'affiongudokisai@gmail.com'],
      from: 'CypherCrescent',
      subject: 'Current Oil Price',
      Notification: 0
    }
  },
  methods: {
    sendEmail: (e) => {
      emailjs.sendForm('service_8kmg04s', 'template_st7wlej', e, 'user_5rS9g9QndHSafeZI9LT4G')
        .then((result) => {
            console.log('SUCCESS!', result.status, result.text);
        }, (error) => {
            console.log('FAILED...', error);
        });
    }
  },
  computed:{
    message(){
      return this.$store.getters.GetLastMessage
    },
    getAllMessage(){
      return this.$store.getters.GetAllMessages.length
    }
  },
  // watch:{
  //   getAllMessage(){
  //     let forma = document.getElementById("form1");
  //     console.log()
  //     this.sendEmail(forma);
  //   }
  // }
}
</script>

<style>
label {
  float: left;
}
.cancel{
  float: left;
  margin-bottom: 20px;
}
.send{
  background: rgb(41, 41, 44)!important;
  color: #fff!important;
}
.newForm {
  margin-top: 20px;
}
.newModal{
  width: 590px;
}
</style>