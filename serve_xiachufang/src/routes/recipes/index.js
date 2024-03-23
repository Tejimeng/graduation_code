const Router = require('koa-router');
const index = new Router();
const { all_recipes, recipes_by_page } = require('../../constant/routes');
const {
    getAllRecipes,
    getRecipesByPage,
    addRecipe,
    deleteRecipe,
    updateRecipe
} = require('../../routes_handler/recipes');
index.get(all_recipes, getAllRecipes);
index.get(recipes_by_page, getRecipesByPage);
module.exports = index;
