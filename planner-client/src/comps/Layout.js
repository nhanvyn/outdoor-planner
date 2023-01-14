import "./Layout.css"
import { Children } from "react";


const Layout = ({children}) => {

  const arrayChildren = Children.toArray(children);


  return (
    <div className="container">
      <div className="row">
        {
          Children.map(arrayChildren, (child, index)=>{
            return (
              <div className="col">
                {child}
              </div>
            )
          })
        }
      </div>
    </div>
  )
};

export default Layout;