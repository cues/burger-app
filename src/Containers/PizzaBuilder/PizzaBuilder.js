import React, {Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/aux';
import Pizza from '../../Components/Pizza/Pizza';
import BuildControls from '../../Components/Pizza/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Pizza/OrderSummary/OrderSummary';
import axios from '../../axiosOrder';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../Store/actions';



class PizzaBuilder extends Component {
  // construct/or(props) {
  //   super(props);
  //   this.state = {
  //
  //   }
  // }
      state = {
          purchasing: false,
          loading:false,
          error:false
      }


      componentDidMount(){
        // console.log(this.props)
        // axios.get('https://burger-app-1707.firebaseio.com/ingredients.json')
        // .then(response => {
        //   this.setState({ingredients : response.data})
        // })
        // .catch(error => {
        //   this.setState({error:true})
        //   // console.log(error)
        // })
      }

  purchasingHandler = () => {
    this.setState({purchasing : true})
  }

  purchaseCancelHandler = () =>{
    this.setState({purchasing : false})
  }

  purchaseContinueHandler = () =>{
    // const queryParams = [];

    // for(let i in this.state.ingredients){
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    // }

    // queryParams.push('price=' + this.state.totalPrice)

    // const queryString = queryParams.join('&');

    // this.props.history.push({
    //   pathname :   '/Checkout',
    //   search : '?' + queryString
    // })

    this.props.history.push('/Checkout');
    
  }



  updatePurchase (ingredients){

    const sum = Object.keys(ingredients)
        .map(igkey => {
          return ingredients[igkey]
        })
        .reduce((sum, el) => {
          return sum + el
        },0)
      return sum > 0;
      // console.log(sum)
  }


  // addIngredientHandler = (type) => {

  //       // update ingredient count
  //       const oldCount = this.state.ingredients[type];
  //       const newCount =  oldCount + 1;
  //       const updateIngredient = {
  //         ...this.state.ingredients
  //       }
  //       updateIngredient[type] = newCount;

  //       // update price
  //       const addPrice = ingredientPrice[type];
  //       const totalPrice = this.state.totalPrice + addPrice;

  //       // update state
  //       this.setState({totalPrice : totalPrice , ingredients : updateIngredient})

  //       this.updatePurchase(updateIngredient)
  // }



  // removeIngredienthandler = (type) => {
  //     const oldCount = this.state.ingredients[type];
  //     const newCount = oldCount - 1;

  //     if(newCount < 0){
  //       return
  //     }

  //           const updateIngredient = {
  //             ...this.state.ingredients
  //           }
  //           updateIngredient[type] = newCount;

  //           const subPrice = ingredientPrice[type];
  //           const totalPrice = this.state.totalPrice - subPrice;

  //           this.setState({totalPrice : totalPrice , ingredients : updateIngredient})

  //           this.updatePurchase(updateIngredient);
  // }






  render(){
      const disableButton = {
        ...this.props.ingredients
      }
      for(let key in disableButton){
        disableButton[key] = disableButton[key] <= 0
      }

      const {purchasing,  loading, error} = this.state;

      const {purchaseCancelHandler, purchaseContinueHandler, purchasingHandler } = this;

      const {ingredients, totalPrice, onIngredientAdded, onIngredientRemoved} = this.props;
         
    const burger = ingredients ?

          <Aux>
              <Pizza ingredients ={ingredients}/>
              <BuildControls
                  addIngredient={onIngredientAdded}
                  subIngredient={onIngredientRemoved}
                  disabled = {disableButton}
                  price = {totalPrice}
                  purchase = {this.updatePurchase (ingredients)}
                  clicked = {purchasingHandler}
              />
          </Aux>
      :
      error ? <p style={{'textAlign':'center'}}>Ingredients can't be loaded</p> : <Spinner/> 
            

    const orderSummary = ingredients ?
            !loading  ?
              <OrderSummary 
                    ingredients = {ingredients} 
                    show={purchasing}
                    clicked_cancel={purchaseCancelHandler}
                    clicked_continue={purchaseContinueHandler}
                    price={totalPrice}
                />   
            :
                  <Spinner/> 
    : null


      return (
        <Aux>
            <Modal show={purchasing} 
                   modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
            </Modal>
            {burger}
        </Aux>
      )
    }

}


const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice:state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onIngredientAdded: (name) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName:name}),
    onIngredientRemoved: (name) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName:name})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(PizzaBuilder, axios));
