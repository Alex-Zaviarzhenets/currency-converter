
const [input] = document.getElementsByTagName('input')
const [button] = document.getElementsByTagName('button')
const [div] = document.getElementsByTagName('div')
const inputValue = input.value

button.onclick = async (e) => {
  e.preventDefault()
  const kurs = await fetch('/getKurs').then(response => response.json())
  const inputValue = Number(input.value)
  const convertedKurs = convertUsdEur(inputValue, kurs)
  div.innerHTML = `${convertedKurs}€`
}

function convertUsdEur(inputValue, kurs){
  return inputValue * kurs
}
