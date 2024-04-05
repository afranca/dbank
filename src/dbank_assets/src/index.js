import {dbank} from "../../declarations/dbank";


window.addEventListener("load", async function(){
  //console.log('loading');
  const currentAmount = await dbank.checkBalance();
  document.getElementById('value').innerHTML = currentAmount;
})