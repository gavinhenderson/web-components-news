const getNews = async (apiKey) => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=gb&apiKey=${apiKey}`,
  );

  const { articles } = await response.json();

  return articles;
};

export default getNews;
