import React from 'react';
import { configure , shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PizzaBuilder } from './PizzaBuilder';
import buildControls from '../../Components/Pizza/BuildControls/BuildControls';

    configure({adapter : new Adapter()});

describe ('<PizzaBuider />', () => {
    let  wrapper;
    beforeEach(() => {
        wrapper = shallow(<PizzaBuilder onInitIngreditent = {() => {}}/>);
    })

    it('should render build controls only if ingredients are available',() => {
        wrapper.setProps({ingredients : null});
        expect(wrapper.find(buildControls)).toHaveLength(1);
    })
})