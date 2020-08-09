import React, { Component } from 'react';
import AppNavigation from './AppNavigation'
class Category extends Component {
    state = { 
        isloading : true,
        categories :[]
     }
     async componentDidMount(){
    
         const response = await fetch ('api/categories');
        // alert ('asdasd');
         const body  =await  response.json();
        // alert (body);
         this.setState({categories :body , isloading :false});
     
     }
    render() { 
        const {categories , isloading}  = this.state;
        if(isloading)
            return (<div> loading .....</div>);
        
        return (  
            <div>
                 <AppNavigation/>
                <h2>Categories</h2>
               
                {
                    categories.map(category =>
                    
                            <div id = {category.categoryId}>
                                {category.categoryName}
                                </div>
                    )
                }
            </div>
        );
    }
}
 
export default Category;