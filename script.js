function calculateLifePath(dob) {
  const digits = dob.replaceAll("-", "").split("").map(Number);

  let sum = digits.reduce((a, b) => a + b, 0);

  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split("").reduce((a, b) => a + Number(b), 0);
  }

  return sum;
}
function generateReport() {
  const dob = document.querySelector("input[type='date']").value;

  const lifePath = calculateLifePath(dob);

  alert("Your Life Path Number is: " + lifePath);
}
<button onclick="generateReport()">Generate My Full Bloom Report 🌸</button>
function getSunSign(date) {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;

  if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
  // add others later
}
