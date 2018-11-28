function delayedResponse (value, time) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      if (value) {
        resolve('response' + value.slice(7))
      } else {
        reject()
      }
    }, time*1000)
  })
}

exports.makeRequest = async function (value, callbackFunction) {
  let error = null
  let response = await delayedResponse(value, 1).catch(err => error = 'error')
  if (error) {
    response = undefined
  }
  callbackFunction(error, response)
}
