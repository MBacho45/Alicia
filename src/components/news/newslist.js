import React,{useState, useEffect} from "react";
import axios from "axios"
import NewsItem from "./newsItem";


const Newslist =() =>{

    const [articles, setArticles] = useState([]);
    const dates = ' ';
    const search = 'nouvelles de la journée';

    

    useEffect(() => {
        const getArticles = async ()  =>{
            const response =await axios.get(`https://newsapi.org/v2/everything?q=${search}&from=${dates}&apiKey=c0ebb1f868f84bb08a1ae3984813b232`)
            console.log(response)
            setArticles(response.data.articles)
        }
        getArticles()
    }, [])


    return (
        <div>
            {articles.map(articles  =>{
                return(
                    <NewsItem
                    title={articles.title}
                    description={articles.description}
                    url={articles.url}
                    urlToImage={articles.urlToImage}
                    />
                )
                } 
            )}
        </div>
    )
}

export default Newslist;