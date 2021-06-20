import React from 'react';
import { shallow } from 'enzyme';
import { SideMenuComponent } from './SideMenu';

describe('Component SideMenu', () => {
  it('should render without crashing', () => {
    const component = shallow(<SideMenuComponent />);
    expect(component).toBeTruthy();
  });
});
