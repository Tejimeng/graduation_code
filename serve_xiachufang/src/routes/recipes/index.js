const Router = require('koa-router');
const index = new Router();
const { all_recipes, recipes_by_page, app_recommended_recipes } = require('../../constant/routes');
const {
    getAllRecipes,
    getRecipesByPage,
    getAppRecommendedRecipes,
    addRecipe,
    deleteRecipe,
    updateRecipe
} = require('../../routes_handler/recipes');
index.get(all_recipes, getAllRecipes);
index.get(recipes_by_page, getRecipesByPage);
index.get(app_recommended_recipes, getAppRecommendedRecipes);
module.exports = index;
