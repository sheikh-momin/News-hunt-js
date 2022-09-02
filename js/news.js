
  const newsHunt = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url)
    const data = await res.json()
    showCategory(data.data.news_category)
  }

  const showCategory =(newses)=>{
    console.log(newses)
    const newsCategory = document.getElementById('news_category')
    
    newses.forEach(news => {
      const div = document.createElement('div')
      div.classList.add('col','pb-3')
      div.innerHTML = `<a onclick="showNews()">${news.category_name}</a>`
      newsCategory.appendChild(div)
    });
  }
const showNews = (newsId)=>{
    fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
    .then(res =>res.json())
      .then(data => categoriesNews(data.data[0]._id))
  }
  const categoriesNews = (newsId) => {
    const newsList =document.getElementById('news-list')
    const div =document.createElement('div')
    div.classList.add('card', 'mb-3')
  }
    newsHunt()

