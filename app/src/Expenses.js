import React, { Component } from 'react';
import AppNavigation from './AppNavigation';
import DatePicker from 'react-datepicker';
import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import { Container,Form,FormGroup,Button,Input, Table } from 'reactstrap';
import {Link} from 'react-router-dom';
import Moment from 'react-moment'

class Expenses extends Component {
   

     emptyItem = {
         expenseId :104 ,
         expenseDate: new Date (),
         expenseDescript :'',
         location:'',
         category : {categoryId: 1, categoryName: 'Travel'}
     }
constructor(props){
    super(props);
    this.state = { 
        date : new Date (),
        isloading : true,
        expenses :[],
        categories :[],
        exepenses : [],
        item : this.emptyItem
     }
     this.handleSubmit =this.handleSubmit.bind(this);
    this.handleChange =this.handleChange.bind(this);
     this.handleDateChange =this.handleDateChange.bind(this);
}

async handleSubmit (event){
   
 
    const item = this.state.item;
    await fetch ('/api/expenses' , {
        method :'POST',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' :'application/json'
        },
        body : JSON.stringify(item), //convert js to JSON

    });
    event.preventDefault();
    console.log(this.state);
    this.props.history.push('/expenses'); //refresh expenses afetr adding 
}

handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
    console.log(this.state);
}
handleDateChange(date){
 
    let item = {...this.state.item};
    item.expenseDate = date;
    this.setState(item);

}

    async remove(expenseId){
        await fetch (`/api/expenses/${expenseId}`,{
            method : 'DELETE',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' :'application/json'
            }
        }).then(() => {
            let updatedExpenses = [...this.state.expenses].filter(i => i.expenseId !== expenseId);
            this.setState({expenses : updatedExpenses});
        });
    }
     
     async componentDidMount(){
         const  response  = await fetch ('/api/categories');
         const body = await response.json();
         this.setState({categories : body , isloading : false});

         const  responseexpense  = await fetch ('/api/expenses');
         const bodyExp = await responseexpense.json();
         this.setState({expenses : bodyExp , isloading : false});

     }
    render() { 
       
        const title = <h3>Add Expense        </h3>    
        const {categories}  =    this.state;
        const {expenses,isloading}  =    this.state;
        if (isloading)
            return(<div>loading...</div>)
        
        let optionList =
            categories.map(category =>
               <option id ={category.categoryId} key = {category.categoryId}> 
               {category.categoryName}
               </option>
               )
        let rows =
        expenses.map (expense =>
            <tr key ={expense.expenseId}>
                <td>{expense.expenseDescript}</td>
                <td>{expense.location}</td>
                <td><Moment date = {expense.expenseDate} format= "YYYY/MM/DD" /></td>
                <td>{expense.category.categoryName}</td>
                <td><Button size ="sm" color ="danger" onClick={() =>this.remove(expense.expenseId)} >Delete</Button></td>
            </tr>
            )
        return (
        <div>
            
             <AppNavigation/>
             {title}
              <Container>
                 <Form onSubmit = {this.handleSubmit} >
                     <FormGroup>
                         <label for ="expenseDescript">Title</label>
                         <Input type ="text" name ="expenseDescript" id ="expenseDescript" onChange ={this.handleChange} autoComplete="name"/>
                     </FormGroup>
                     <FormGroup>
                         <label for ="category">Category</label>
                         <select>
                             {optionList}
                         </select>
                       
                     </FormGroup>
                     <FormGroup>
                         <label for ="city">Date</label>
                         
                         <DatePicker selected = {this.state.expenseDate} onChange ={this.handleDateChange}/>
                     </FormGroup>
                     <FormGroup className ="col-md-4 mb-3"> 
                         <div className ="row">
                         <label for ="location">Location</label>
                         <Input type ="text" name ="location" id ="location" onChange ={this.handleChange} />
                         </div>
                     </FormGroup>
                     <FormGroup>
                         <Button color ="primary" type ="submit">Save </Button>{' '}
                        <Button color ="secondary" tag={Link} to ="/categories" >Cancel</Button>                    </FormGroup>

                 </Form>
             </Container>
             {''}
             <Container>
                 <h3> Expense List</h3>
                 <Table className = "mt-4">
                     <thead>
                         <tr>
                             <th width ="30%">Description</th>
                             <th width ="10%">Location</th>
                             <th width ="10%">Date</th>
                             <th>Category</th>
                             <th width ="10%">Action</th>
                         </tr>
                     </thead>
                     <tbody>
                         {rows}
                     </tbody>
                 </Table>
             </Container>
        
      
        
        </div>);
    }
}
 
export default Expenses;