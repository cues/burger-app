import React, { Component } from 'react';
import Aux from '../../hoc/aux';
import cls from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component  {
      state = {
        showSideDrawer: false,
      } 


      sideDrawerCloseHandle = () => {
        this.setState({showSideDrawer : false});
      }

      sideDrawerOpenHandle = () => {
        const width = window.innerWidth;
        width < 769 ? this.setState({showSideDrawer : true}) : this.setState({showSideDrawer : false})
      }

      render(){

        // Object destructing 
        // const {children:child, xyz=1} = this.props;
        const {children:child} = this.props;
        const {showSideDrawer} = this.state;

          return(
              <Aux>
                <Toolbar  clicked={this.sideDrawerOpenHandle}/>
                <SideDrawer showBackDrawer={showSideDrawer}
                            closed = {this.sideDrawerCloseHandle}/>
                <main className={cls.content}>
                  {child}
                </main>
              </Aux>
          )
      }
}


export default Layout;
