import React, {Component} from 'react';

import Aux from '../../hoc/aux';
import Pizza from '../../Components/Pizza/Pizza';
import BuildControls from '../../Components/Pizza/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Pizza/OrderSummary/OrderSummary';

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
          ingredients : {
                            salad : 0,
                            bacon : 0,
                            cheese : 0,
                            meat : 0
                        },
          totalPrice : 4,
          purchase : false,
          purchasing: false
      }


  purchasingHandler = () => {
    this.setState({purchasing : true})
  }

  purchaseCancelHandler = () =>{
    this.setState({purchasing : false})
  }

  purchaseSuccessHandler = () =>{
    alert('contine')
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
      console.log(sum)
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
      return (
        <Aux>
            <Modal show={this.state.purchasing} 
                   modalClosed={this.purchaseCancelHandler}>
                      <OrderSummary 
                              ingredients = {this.state.ingredients} 
                              show={this.state.purchasing}
                              clicked_cancel={this.purchaseCancelHandler}
                              clicked_success={this.purchaseSuccessHandler}
                      />
            </Modal>
            <Pizza ingredients ={this.state.ingredients}/>
            <BuildControls
                addIngredient={this.addIngredientHandler}
                subIngredient={this.removeIngredienthandler}
                disabled = {disableButton}
                price = {this.state.totalPrice}
                purchase = {this.state.purchase}
                clicked = {this.purchasingHandler}
            />
        </Aux>
      )
    }

}


export default PizzaBuilder;
