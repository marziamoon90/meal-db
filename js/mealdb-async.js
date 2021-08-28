const errorMsg = document.getElementById('error-message');
errorMsg.style.display = 'none';
// get input value 
const searchFood = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

    // error msg 
    if (searchText == '') {
        errorMsg.style.display = 'none';
    }
    else {
        // get api url 
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        // console.log(url)

        try {
            // fetch url 
            const res = await fetch(url);
            const data = await res.json();
            displayGetMeals(data.meals);
        }
        catch (error) {
            displayError(error);
        }

    }
}
const displayError = error => {
    errorMsg.style.display = 'block';
}

// create a arrow function to display meals 
const displayGetMeals = meals => {
    console.log(meals);
    const colContainer = document.getElementById('col-container');

    // option 2. to clear previous result 
    colContainer.textContent = '';

    // forEach meals
    meals.forEach(meal => {
        // console.log(meal);

        // create an element 
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('col');
        containerDiv.innerHTML = `
        <div onclick="getMealId(${meal.idMeal})" class="card h-100 ">
            <img src="${meal.strMealThumb}" class="card-img" alt="...">
            <div class="card-body">
                <h4 class="card-title text-danger fw-bolder ">${meal.strMeal}</h4>
                <p class="card-text">${meal.strInstructions.slice(1, 200)}</p>
            </div>
        </div>
            `;
        // append crated element 
        colContainer.appendChild(containerDiv);
    })
}


// get meal id and create dynamic url 
const getMealId = async mealId => {
    console.log(mealId);
    const idUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    try {
        // fetch url 
        const res = await fetch(idUrl);
        const data = await res.json();
        displayMealDetail(data.meals[0]);
    }
    catch (error) {
        console.log(error);
    }

    /* fetch(idUrl)
        .then(res => res.json())
        .then(data => displayMealDetail(data.meals[0])) */
}

// get meal details 
const displayMealDetail = meal => {
    const mealDetailDiv = document.getElementById('meal-details');
    mealDetailDiv.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card my-3" style="width: 40rem;">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
    <h4 class="card-title text-danger fw-bolder ">${meal.strMeal}</h4>
    <p class="card-text">${meal.strInstructions.slice(1, 100)}</p>
      <a href="${meal.strYoutube}" class="btn btn-warning">Go somewhere</a>
    </div>
  </div>
    `;
    mealDetailDiv.appendChild(div);
}