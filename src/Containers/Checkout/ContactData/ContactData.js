import React , {Component} from 'react';
import Button from '../../../Components/UI/Button/Button';
import cls from './ContactData.css';
import classes from '../../../index.css';
import axios from '../../../axiosOrder';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';

class ContactData extends Component{
    state = {
        orderForm:{
            name : {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Enter your name'
                },
                value:''
            },
            street : {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Enter your address'
                },
                value:''
            },
            zipCode : {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Enter your Pin code'
                },
                value:''
            },
            Country : {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Enter your country'
                },
                value:''
            },
            email : {
                elementType: 'input',
                elementConfig: {
                    type:'email',
                    placeholder:'Enter your email'
                },
                value:''
            },
            phone : {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Enter your phone no'
                },
                value:''
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    options : [
                        {value:'fastest', dislayValue:'Fastest'},
                        {value:'cheapest', dislayValue:'Cheapest'},
                    ]
                },
                value:''
            }
        },
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

    inputChangedHandler = (event, Identifier) => {
        const updateOrderForm = {
            ...this.state.orderForm
        }
        const updateFormElement = {
            ...updateOrderForm[Identifier]
        }
        updateFormElement.value = event.target.value;
        updateOrderForm[Identifier] = updateFormElement;
        this.setState({orderForm:updateOrderForm});

    }

    render(){
        const {loading, orderForm} = this.state;

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
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
               ))}
               
                <Button buttonType='Success' clicked={this.orderHandler}>ORDER</Button>
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

export default ContactData;