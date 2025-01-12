
const [form] = document.forms
const [box, input] = document.getElementsByTagName('input')
const button = document.getElementsByTagName('button')[2]
const output = document.getElementById('result')
let kurs

fetch('/getKurs').then(response => response.text()).then(text => kurs = +text)

update()

form.onclick = update

input.onfocus = removeSign

function update() {
  input.placeholder = !box.checked ? "€" : "$";
  output.value = box.checked ? "€" : "$";
  removeSign()
  if (input.value) {
    const convert = box.checked ? convertUsdEur : convertEurUsd
    output.value += convert(input.value, kurs).toFixed(2)
    if (!input.matches(":focus")) {
      input.value = input.placeholder + input.value
    }
  }
}

function removeSign() {
  input.value = input.value.replace(/[\$€]/,'')
}


function convertUsdEur(inputValue, kurs) {
  return inputValue * kurs
}

function convertEurUsd(inputValue, kurs) {
  return inputValue / kurs
}
