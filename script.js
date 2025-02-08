function searchRecipes() {
    const searchInput = document.getElementById('searchInput').value;
    const recipesDiv = document.getElementById('recipes');
    const notfoundDiv = document.getElementById('notfound');

    // Resetting the notfoundDiv
    notfoundDiv.style.display = 'none';
    notfoundDiv.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            recipesDiv.innerHTML = ''; // Clear previous results
            if (!data.meals) {
                notfoundDiv.innerHTML = 'Recipe not found, please try another search!';
                notfoundDiv.style.display = 'block';
            } else {
                data.meals.forEach(meal => {
                    const card = document.createElement('div');
                    card.classList.add('recipe-card');
                    card.innerHTML = `
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <h3>${meal.strMeal}</h3>
                        <button>View Recipe</button>
                    `;
                    card.querySelector('button').addEventListener('click', () => viewRecipes(meal.idMeal));
                    recipesDiv.appendChild(card);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function viewRecipes(mealId) {
    const popupCard = document.getElementById('popupCard');
    const recipeTitle = document.querySelector('.recipeTitle');
    const recipeDetails = document.querySelector('.recipeDetails');

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            recipeTitle.innerText = meal.strMeal;
            recipeDetails.innerText = meal.strInstructions;
            popupCard.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching recipe details:', error);
        });
}

function closeRecipes() {
    const popupCard = document.getElementById('popupCard');
    popupCard.style.display = 'none';
    document.querySelector('.recipeTitle').innerText = '';
    document.querySelector('.recipeDetails').innerText = '';
}
