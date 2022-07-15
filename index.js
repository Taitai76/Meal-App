//DOM contentloaded EV1
document.addEventListener("DOMContentLoaded",function() {
const submitB= document.getElementById('sButton');
const foodL= document.getElementById('foodList');
let ingredient= document.getElementById('searchInput');
const recpInfo=document.getElementById('mealRecipe')

//Submit button EV2
submitB.addEventListener('click', recipeL)
// Mouseover for recipe EV3
foodL.addEventListener('mouseover', getRecpie)

//GET Data From Meal DB
function recipeL(){
    console.log(ingredient.value);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient.value}`)
    .then(response => response.json())
    .then(data => {
        foodL.innerHTML="";
        if (data.meals){
        data.meals.forEach(rec => renderRCards(rec))
    }else{
        foodL.innerHTML="ingredient did not match a recipe in out database";
    }
});
}

//Renders data into list
function renderRCards(data){
    console.log(data);
    let card = document.createElement('li')
    card.className='cards'
    card.innerHTML =`
    <div id=${data.idMeal}>
    <img src = "${data.strMealThumb}">
    <h2> ${data.strMeal}</h2>
    <a href = "#" class = "recipe-btn">Get Recipe</a>
    </div>
    `
    foodL.appendChild(card);
}


function getRecpie(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let recp = e.target.parentElement;
        console.log(recp)
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recp.id}`)
        .then(response=>response.json())
        .then(data=>{recipeInformation(data)})

    }

}
function recipeInformation(data){
    recpInfo.innerHTML=""
    recpObj=data.meals[0];
    console.log(recpObj.strMeal)
    let recipeCard =`
    <h3>${recpObj.strMeal}</h3>
    <img src = "${recpObj.strMealThumb}">
    <div>
        <h4>Instructions</h4>
        <p> ${recpObj.strInstructions}</p>
    </div>
    `
    recpInfo.innerHTML=recipeCard;
}

});
