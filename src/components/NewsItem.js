import React from 'react'

const NewsItem=(props)=>{

    let {title, description, imageUrl, newsUrl, author, publishedAt} = props;
    return (
      <div>
            <div className="card mt-4">
                <img src={imageUrl?imageUrl:"https://tse4.mm.bing.net/th?id=OIP.uKIFFxOB2CzXpyL9570wJAHaEL&pid=Api&P=0&h=180"} className="card-img-top" style={{height:"10rem"}} alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title?title:"Lorem ipsum dolor sit amet consectetur."}</h5>
                    <p className="card-text">{description?description:"Lorem ipsum dolor sit amet consectetur adipisicing elit."}</p>
                    <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} at {new Date(publishedAt).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl?newsUrl:"https://www.mlb.com/news/juan-soto-yankees-trade"} target="_blank" className="btn btn-sm btn-success border">Read More...</a>
                </div>
            </div>
      </div>
    )
}
export default NewsItem