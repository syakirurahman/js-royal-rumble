const inputs = require('./input.json');
const royalNameComparison = [];

// Write Javascript code!
function stringToNumber(romanString){
  switch (romanString){
    case 'I': return 1;
    case 'V': return 5;
    case 'X': return 10;
    case 'L': return 50;
    case 'C': return 100;
    case 'D': return 500;
    case 'M': return 1000;
    default: return -1;
  }
}

function romanToNumber(romanString) {
  if(romanString == null) return -1;
  
  var num = stringToNumber(romanString.charAt(0));
  var pre, curr;

  for(var i = 1; i < romanString.length; i++){
    curr = stringToNumber(romanString.charAt(i));
    pre = stringToNumber(romanString.charAt(i-1));
    if(curr <= pre){
      // for roman format example "XI"
      num += curr;
    } else {
      // for roman format example "IX"
      num = num - pre*2 + curr;
    }
  }
  return num;
}

function romanRoyalNameToOrdinalRoyalName() {
  inputs.forEach((romanRoyalName) => {
    const splitedName = romanRoyalName.split(" ");
    const romanNumber = splitedName[splitedName.length-1];
    splitedName.pop();
    const royalNameWithoutNumber = splitedName.join(" ");
    const ordinalNumber = romanToNumber(romanNumber);
    
    const ordinalRoyalName = royalNameWithoutNumber+' '+ordinalNumber;
    
    const royalName = {
      romanRoyalName: romanRoyalName,
      ordinalRoyalName: ordinalRoyalName
    }
    royalNameComparison.push(royalName);
  });
}

function getSortedList(royalNameComparison) {
  return royalNameComparison.sort(function(a,b) {
    if(a.ordinalRoyalName < b.ordinalRoyalName) {
      return -1;
    } else {
      return 1;
    }
  })
}

romanRoyalNameToOrdinalRoyalName();
const sortedRoyalNamesObj = getSortedList(royalNameComparison);
let sortedRoyalNamesStr = '<ul>';
sortedRoyalNamesObj.forEach(function(royalNameObj) {
  sortedRoyalNamesStr += '<li>'+royalNameObj.romanRoyalName+'</li>';
});
sortedRoyalNamesStr += '</ul>'


const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>Output</h1>
<h2>String Version</h2><pre>${sortedRoyalNamesStr}
<h2>Object Version</h2><pre>${JSON.stringify(sortedRoyalNamesObj,null,2)}</pre>`;