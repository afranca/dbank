import {dbank} from "../../declarations/dbank";


window.addEventListener("load", async function(){
  //console.log('loading');
  const currentAmount = await dbank.checkBalance();
  document.getElementById('value').innerHTML = currentAmount.toFixed(2); // Match.round(currentAmount * 100) / 100
});

document.querySelector("form").addEventListener("submit", async function(event){  
  // Prevent double submit
  const submitButton = event.target.querySelector("#submit-btn");
  submitButton.setAttribute("disabled", true);
  
  // Retrieving answer input
  event.preventDefault();  
  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);
  
  // Interacting with BE
  await dbank.topUp(inputAmount);
  
  // Updating value on screen
  const currentAmount = await dbank.checkBalance();
  document.getElementById('value').innerHTML = currentAmount.toFixed(2);

  // Enabling submit button back again
  submitButton.removeAttribute("disabled");
    
})

