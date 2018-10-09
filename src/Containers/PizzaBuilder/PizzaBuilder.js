import React, {Component} from 'react';

import Aux from '../../hoc/aux';
import Pizza from '../../Components/Pizza/Pizza';
import BuildControls from '../../Components/Pizza/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Pizza/OrderSummary/OrderSummary';
import axios from '../../axiosOrder';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const ingredientPrice = {
    salad : .5,
    bacon : .8,
    cheese :.6,
    meat : 1.3
}

class PizzaBuilder extends Component {
  // construct/or(props) {
  //   super(props);
  //   this.state = {
  //
  //   }
  // }
      state = {
          ingredients :null,
          totalPrice : 4,
          purchase : false,
          purchasing: false,
          loading:false,
          error:false
      }


      componentDidMount(){
        console.log(this.props)
        axios.get('https://burger-app-1707.firebaseio.com/ingredients.json')
        .then(response => {
          this.setState({ingredients : response.data})
        })
        .catch(error => {
          this.setState({error:true})
          // console.log(error)
        })
      }

  purchasingHandler = () => {
    this.setState({purchasing : true})
  }

  purchaseCancelHandler = () =>{
    this.setState({purchasing : false})
  }

  purchaseContinueHandler = () =>{
    const queryParams = [];

    for(let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }

    queryParams.push('price=' + this.state.totalPrice)

    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname :   '/Checkout',
      search : '?' + queryString
    })
    
  }



  updatePurchase (ingredients){

    const sum = Object.keys(ingredients)
        .map(igkey => {
          return ingredients[igkey]
        })
        .reduce((sum, el) => {
          return sum + el
        },0)
      this.setState({purchase : sum > 0})
      // console.log(sum)
  }


  addIngredientHandler = (type) => {

        // update ingredient count
        const oldCount = this.state.ingredients[type];
        const newCount =  oldCount + 1;
        const updateIngredient = {
          ...this.state.ingredients
        }
        updateIngredient[type] = newCount;

        // update price
        const addPrice = ingredientPrice[type];
        const totalPrice = this.state.totalPrice + addPrice;

        // update state
        this.setState({totalPrice : totalPrice , ingredients : updateIngredient})

        this.updatePurchase(updateIngredient)
  }



  removeIngredienthandler = (type) => {
      const oldCount = this.state.ingredients[type];
      const newCount = oldCount - 1;

      if(newCount < 0){
        return
      }

            const updateIngredient = {
              ...this.state.ingredients
            }
            updateIngredient[type] = newCount;

            const subPrice = ingredientPrice[type];
            const totalPrice = this.state.totalPrice - subPrice;

            this.setState({totalPrice : totalPrice , ingredients : updateIngredient})

            this.updatePurchase(updateIngredient);
  }






  render(){
      const disableButton = {
        ...this.state.ingredients
      }
      for(let key in disableButton){
        disableButton[key] = disableButton[key] <= 0
      }

      const {purchasing, ingredients, totalPrice, purchase, loading, error} = this.state;

      const {addIngredientHandler, removeIngredienthandler, purchaseCancelHandler, purchaseContinueHandler, purchasingHandler } = this;


         
    const burger = ingredients ?

          <Aux>
              <Pizza ingredients ={ingredients}/>
              <BuildControls
                  addIngredient={addIngredientHandler}
                  subIngredient={removeIngredienthandler}
                  disabled = {disableButton}
                  price = {totalPrice}
                  purchase = {purchase}
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


export default withErrorHandler(PizzaBuilder, axios);
