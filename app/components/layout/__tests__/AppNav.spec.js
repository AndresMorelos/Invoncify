// Libs
import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';

// Component
import AppNav  from '../AppNav';

// Mocks
const changeTab = jest.fn();

describe('Renders correctly to the DOM', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<AppNav activeTab="form" changeTab={changeTab} />);
  });

  it('renders 5 tabs', () => {
    expect(wrapper.find('a')).toHaveLength(5);
  });

  it('has correct porps', () => {
    // expect(wrapper.prop('activeTab')).toEqual('form');
    // expect(wrapper.prop('activeTab')).not.toEqual('settings');
  });

  it('contains active indicator', () => {
  //   const sideBar = shallow(<ActiveIndicator/>);
  //   expect(wrapper.contains(sideBar)).toEqual(true);
  });
  test.todo('shows active indicator at the correct position');
});
