
function doThingsOneAtATime () {
  let value = 5 * 3
  value ++
  console.log(value)
} // This is simple synchronous code
// It involves blocking

function waitForResponseBeforeDoingAnythingElse () {
  let response = makeRequest('request') //suppose synchronous & returns 'response'
  let value = 5 * 3
  value ++
  console.log(value)
  console.log(response)
}
// Synchronous operations that take time to execute can cause unnecessary blocking
// This can be a problem when loading priority DOM elements
// or when server requests are involved


// Asynchronous operations are non blocking

function fireRequestAndMeanwhileProceed () {
  let response = makeRequest('request') // suppose asynchronous & returns 'response'
  let value = 5 * 3
  console.log(value, response)
}
// Not accounting for the asynchronous nature of such operations
// can cause undesired behavior
