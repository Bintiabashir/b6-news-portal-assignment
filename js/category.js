const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
}


const displayCategories = categories => {
    const newsCategories = document.getElementById('news-categories');
    categories.forEach(category => {
        const categoriesLi = document.createElement('li');
        categoriesLi.innerText = `${category.category_name}`
        newsCategories.appendChild(categoriesLi)
    });

}

loadCategories();