
const [form] = document.forms
const [input] = document.getElementsByTagName('input')
const button = document.getElementsByTagName('button')[2]
const output = document.getElementById('result')
const select1 = document.getElementById('select1')
const select2 = document.getElementById('select2')
let rates

fetch('/rates')
  .then(response => response.json())
  .then(data => rates = data)
  .then(fillSelects)

update()

select1.addEventListener('change', update);
select2.addEventListener('change', update);
input.addEventListener('input', update)

function update() {
  const rate1 = select1.value
  const rate2 = select1.selectedIndex === select2.selectedIndex
    ? select1.value : select2.value

  if (input.value) {
    output.value = Number(convert(input.value, rate1, rate2).toFixed(2)).toLocaleString('en-US')
  }
}

function convert(amount, rate1, rate2) {
  return amount / rate1 * rate2
}

function fillSelects(rates) {
  for (const key in rates) {
      const rate = rates[key];
      select1.append(new Option(key, rate))
      select2.append(new Option(key, rate * 0.99))
  }
}
