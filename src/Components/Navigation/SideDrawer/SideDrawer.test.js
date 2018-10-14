import React from 'react';
import { configure , shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SideDrawer from './SideDrawer';
import Backdrop from '../../UI/Backdrop/Backdrop'
import NavigationItems from '../NavigationItems/NavigationItems';

    configure({adapter : new Adapter()});

describe('sidedrawer', () => {
    it('check if side drawer have children' , () => {
        const wrapper = shallow(<SideDrawer showBackDrawer/>);
        expect(wrapper.find(Backdrop)).toHaveLength(1);
    })
})