import {dbank} from "../../declarations/dbank";


window.addEventListener("load", async function(){
  //console.log('loading');
  const currentAmount = await dbank.checkBalance();
  document.getElementById('value').innerHTML = currentAmount.toFixed(2); // Match.round(currentAmount * 100) / 100
});

document.querySelector("form").addEventListener("submit", async function(event){  
  // Prevent empty field submit
  if (document.getElementById("input-amount").value == "" && document.getElementById("withdrawal-amount").value == ""){
    console.log("Err: Empty fields");
    return;
  }

  // Prevent double submit
  const submitButton = event.target.querySelector("#submit-btn");
  submitButton.setAttribute("disabled", true);
  
  // Retrieving answer input
  event.preventDefault();  
  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);
  
  // Interacting with BE
  if (document.getElementById("input-amount").value.length != 0){    
    await dbank.topUp(inputAmount);   
  }
  if (document.getElementById("withdrawal-amount").value.length != 0){    
    await dbank.withdrawl(outputAmount);
  }
  await dbank.compound();
  
  // Updating value on screen
  const currentAmount = await dbank.checkBalance();
  document.getElementById('value').innerHTML = currentAmount.toFixed(2);

  // Re-setting form fields and Enabling submit button
  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";
  submitButton.removeAttribute("disabled");
    
})

