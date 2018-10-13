import React , {Component} from 'react';
import Button from '../../../Components/UI/Button/Button';
import cls from './ContactData.css';
import classes from '../../../index.css';
import axios from '../../../axiosOrder';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';
import { connect } from 'react-redux';

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
        formIsValid:false,
        loading:false
    }
    

    orderHandler = (event) => {
        event.preventDefault();
        // console.log(this.props.ingredients);

        // alert('contine')
    this.setState({loading : true});
    const order = {
      ingredients : this.props.ingredients,
      price : this.props.totalPrice,
      customer : {
          name : 'Erroll',
          address : {
                       street : 'my street',
                       zipCode : 'cr0 2gf',
                       city : 'croydon',
                    },
          email : 'cues1707@gmail.com',
          phone : '2432453245',
      },
      delivery: 'fast',
    }
    axios.post('/orders.json', order)
    .then(response => {
    //   console.log(response)
    this.setState({loading : false});
    this.props.history.push('/')
    })
    .catch(error => {
    //   console.log(error)
    this.setState({loading : false});
    })
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
        const {loading, orderForm, formIsValid} = this.state;

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
        ingredients : state.ingredients,
        totalPrice : state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);