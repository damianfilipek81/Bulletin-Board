import React from 'react';
import { shallow } from 'enzyme';
import { SearchBarComponent } from './SearchBar';

describe('Component SearchBar', () => {
  it('should render without crashing', () => {
    const component = shallow(<SearchBarComponent />);
    expect(component).toBeTruthy();
  });
});
