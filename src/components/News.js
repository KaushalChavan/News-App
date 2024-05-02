import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) =>{ 
    
    const [articles,setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page,setPage] = useState(1)
    const [totalResults,setTotalResults] = useState(0)

    const capitalize = (word) =>{
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      }  


    const updateNews = async()=>{
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }  

    useEffect(() => {
        document.title = `${capitalize(props.category)} - News`
        updateNews();
    },[])


    const fetchMoreData = async() => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=65026e74e43c4561a073f107669535dd&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
      };


    return (
      <>
        <div className="container" style={{marginTop:"90px"}}>
        <h3>News - Top <span className='categories'>{capitalize(props.category)}</span> Headlines :</h3>
        </div>

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<h4 className='text-center my-2'>Loading...</h4>}>

        <div className='container'>
            <div className="row">
                {articles.map((element)=>{
                    return  <div className="col-md-3" key={element.url}> 
                                <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,60):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt}/>
                            </div>
                })}
            </div>
        </div>
        </InfiniteScroll>
     
       </>
    )
  }

News.defaultProps = {
    country: "in",
    pageSize: 12,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
