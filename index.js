document.addEventListener("DOMContentLoaded",function() {
const submitB= document.getElementById('sButton');
let ingredient= document.getElementById('searchInput');

submitB.addEventListener('click', recipe(ingredient.value))

function recipe(ing){
    console.log(ing);
fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
  .then(response => response.json())
  .then(data => console.log(data));
}

});