import React from 'react';
import Aux from '../../hoc/aux';
import cls from './Layout.css';

const layout = (props) => (
  <Aux>
    <div className={cls.header}>header, sidedrawer, backdrop</div>
    <main className={cls.content}>
      {props.children}
    </main>
  </Aux>
)

export default layout;
