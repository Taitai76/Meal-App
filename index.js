document.addEventListener("DOMContentLoaded",function() {
const submitB= document.getElementById('sButton');
const foodL= document.getElementById('foodList');
let ingredient= document.getElementById('searchInput');

submitB.addEventListener('click', recipeL)

function recipeL(){
    console.log(ingredient.value);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient.value}`)
    .then(response => response.json())
    .then(data => {
        
        foodL.innerHTML="";
        data.meals.forEach(rec => renderRCards(rec))});
}

function renderRCards(data){
    console.log(data);
    let card = document.createElement('li')
    card.className='cards'
    card.innerHTML =`
    <img src = "${data.strMealThumb}">
    <h2> ${data.strMeal}</h2>
    `
    foodL.appendChild(card);
}
});