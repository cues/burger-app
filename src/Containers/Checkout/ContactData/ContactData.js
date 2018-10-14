import React , {Component} from 'react';
import Button from '../../../Components/UI/Button/Button';
import cls from './ContactData.css';
import classes from '../../../index.css';
import axios from '../../../axiosOrder';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actionCreators from '../../../Store/actions/index';

class ContactData extends Component{
    state = {
        orderForm:{
            name : {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Enter your name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
            },
            street : {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Enter your address'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,

            },
            zipCode : {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Enter your Pin code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false,

               
            },
            Country : {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Enter your country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,

            },
            email : {
                elementType: 'input',
                elementConfig: {
                    type:'email',
                    placeholder:'Enter your email'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,

            },
            phone : {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Enter your phone no'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    options : [
                        {value:'fastest', dislayValue:'Fastest'},
                        {value:'cheapest', dislayValue:'Cheapest'},
                    ]
                },
                validation:{},
                value:'fastest',
                valid:true
            }
        },
        formIsValid:false
    }
    

    orderHandler = (event) => {
        event.preventDefault();
        // console.log(this.props.ingredients);

        // alert('contine')
    this.setState({loading : true});

        const formData = {};
        for(let formElementidentifier in this.state.orderForm){
            formData[formElementidentifier] = this.state.orderForm[formElementidentifier];
        }

        const order = {
        ingredients : this.props.ingredients,
        price : this.props.totalPrice,
        orderData: formData
        }

        this.props.onOrderburger(order);
  
    }


    checkValidity(value,rules){
        let isValid = true;
        if(!rules){
            return true
        }
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, Identifier) => {

        const updateOrderForm = {
            ...this.state.orderForm
        }
        const updateFormElement = {
            ...updateOrderForm[Identifier]
        }
        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
        updateFormElement.touched = true;
        updateOrderForm[Identifier] = updateFormElement;
        // console.log(updateOrderForm[Identifier]);
        let formIsValid = true;
        for(let inputIdentifier in updateOrderForm){
            formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm:updateOrderForm, formIsValid:formIsValid});

    }




    render(){
        const { orderForm, formIsValid} = this.state;
        const {loading} = this.props;

        const formElementArray = [];
        for (let key in orderForm){
            formElementArray.push({
                id:key,
                config:orderForm[key],
            })
        }


        const form = !loading ? 
            <form>

               { formElementArray.map(formElement => (
                   <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid ={!formElement.config.valid}
                        shouldValidate ={formElement.config.validation}
                        touched ={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
               ))}
               
                <Button buttonType='Success' clicked={this.orderHandler} disabled={!formIsValid}>ORDER</Button>
            </form>
        : <Spinner/>

    
       
        return(
            <div  className={[cls.ContactData , classes.display_flex].join(' ')}>
                <h4>Enter your contact data</h4>
                    {form}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        ingredients : state.pizzaBuilder.ingredients,
        totalPrice : state.pizzaBuilder.totalPrice,
        loading : state.order.loading
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onOrderburger : (orderData) => dispatch(actionCreators.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData,axios));