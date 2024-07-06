const appId = '1092275864059479217';
const baseUrl = 'https://app.rakuten.co.jp/services/api/Recipe/';

async function fetchCategories() {
  const response = await fetch(`${baseUrl}CategoryList/20170426?applicationId=${appId}`);
  const data = await response.json();
  return data.result.large;
}

async function fetchRecipes(categoryId) {
  const response = await fetch(`${baseUrl}CategoryRanking/20170426?applicationId=${appId}&categoryId=${categoryId}`);
  const data = await response.json();
  return data.result;
}

function displayCategories(categories) {
    const container = document.getElementById('categories');
    categories.forEach(category => {
      const elem = document.createElement('div');
      elem.className = 'category';
      elem.textContent = category.categoryName;
      elem.addEventListener('click', () => fetchAndDisplayRecipes(category.categoryId));
      elem.addEventListener('touchstart', (e) => {
        e.preventDefault();
        fetchAndDisplayRecipes(category.categoryId);
      });
      container.appendChild(elem);
    }, { passive: false });
  }

function displayRecipes(recipes) {
  const container = document.getElementById('recipes');
  container.innerHTML = '';
  recipes.forEach(recipe => {
    const elem = document.createElement('div');
    elem.className = 'recipe';
    elem.innerHTML = `
      <h3>${recipe.recipeTitle}</h3>
      <img src="${recipe.foodImageUrl}" alt="${recipe.recipeTitle}">
      <p>${recipe.recipeDescription}</p>
      <a href="${recipe.recipeUrl}" target="_blank">詳細を見る</a>
    `;
    container.appendChild(elem);
  });
}

async function fetchAndDisplayRecipes(categoryId) {
  const recipes = await fetchRecipes(categoryId);
  displayRecipes(recipes);
}

async function init() {
  const categories = await fetchCategories();
  displayCategories(categories);
}

init();