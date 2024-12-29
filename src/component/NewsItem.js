// class based component
// import React, { Component } from "react";

// export class NewsItem extends Component {
//   render() {
//     let {title,description,url,newsUrl,author,publish} = this.props;
//     return (
//       <div className="my-3 mx-3">
//         <div className="card">
//           <img src={!url?"https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2177494543.jpg?c=16x9&q=w_800,c_fill":url} className="card-img-top" alt="..."/>
//           <div className="card-body">
//             <h5 className="card-title">{title}...</h5>
//             <p className="card-text">
//               {description}...
//             </p>
//             <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
//               Read More...
//             </a>
//            <small className="text-muted mx-2">By {author?author:"Unknown"} on {publish}</small>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default NewsItem;

// refactoring to function based component

import React from "react";

const  NewsItem = (props)=> {
    let {title,description,url,newsUrl,author,publish} = props;
    return (
      <div className="my-3 mx-3">
        <div className="card">
          <img src={!url?"https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2177494543.jpg?c=16x9&q=w_800,c_fill":url} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {description}...
            </p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
              Read More...
            </a>
           <small className="text-muted mx-2">By {author?author:"Unknown"} on {publish}</small>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
