var test = Date.now();
function formatDate(date) {
  var newDate = new Date(date);
  return `${newDate.getMonth() + 1}/${newDate.getDate()}`;
}
console.log(formatDate(test));
