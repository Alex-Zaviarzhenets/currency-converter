
const [form] = document.forms
const [box, input] = document.getElementsByTagName('input')
const button = document.getElementsByTagName('button')[2]
const output = document.getElementById('result')
const select1 = document.getElementById('select1')
const select2 = document.getElementById('select2')
let kurs

fetch('/getKurs').then(response => response.text()).then(text => kurs = +text)

update()

select1.addEventListener('change', update);
select2.addEventListener('change', update);
input.addEventListener('input', update)



input.addEventListener('input', () => {
  timeoutId = setTimeout(update, 500);
});

input.onfocus = removeSign

function update() {
  input.placeholder = !box.checked ? "€" : "$";
  output.value = box.checked ? "€" : "$";
  removeSign()
  const fromCurrency = select1.value
  const toCurrency = select2.value

  let convert
  if(fromCurrency === 'eur' && toCurrency === 'usd') {
    convert = convertUsdEur
  } else if (fromCurrency === 'usd' && toCurrency === 'eur') {
    convert = convertEurUsd
  } else if (fromCurrency === toCurrency) {
    input.placeholder = toCurrency === 'eur' ? '€' : '$'
    output.value = input.placeholder
  }
  if (input.value) {
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
