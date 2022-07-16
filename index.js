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
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient.value}`)
    .then(response => response.json())
    .then(data => {
        foodL.innerHTML="";
        if (data.meals){
        data.meals.forEach(rec => renderRCards(rec))
    }else{
        let tHtml=`<div id="error">ingredient did not match a recipe in our database</div>`
        foodL.innerHTML=tHtml;
    }
});
}

//Renders data into list
function renderRCards(data){
    let card = document.createElement('li')
    card.className='cards'
    card.innerHTML =`
    <div id=${data.idMeal}>
    <img src = "${data.strMealThumb}">
    <h2> ${data.strMeal}</h2>
    <a class = "recipe-btn">Get Recipe</a>
    </div>
    `
    foodL.appendChild(card);
}

//When get recipe is hovered over the rcipie dive at top will update
function getRecpie(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let recp = e.target.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recp.id}`)
        .then(response=>response.json())
        .then(data=>{recipeInformation(data)})

    }

// after the data is recived, a Div will be created in order to show how to make a 
//meal with a video 
}
function recipeInformation(data){
    recpInfo.innerHTML=""
    recpObj=data.meals[0];
    let recipeCard =`
    <div id="topRecpCard">
        <h3>${recpObj.strMeal}</h3>
        <img class="recpImg" src = "${recpObj.strMealThumb}">
        <h4>Instructions</h4>
        <p> ${recpObj.strInstructions}</p>
        <h4>Video</h4>
        <a class = "recipe-btn" href = "${recpObj.strYoutube}">Watch Video</a>
    </div>
    `
    recpInfo.innerHTML=recipeCard;
    scroll(0,10);
}

});
