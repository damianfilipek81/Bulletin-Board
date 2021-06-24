import React from 'react';
import { shallow } from 'enzyme';
import { SearchResultsComponent } from './SearchResults';

describe('Component SearchResults', () => {
  it('should render without crashing', () => {
    const component = shallow(<SearchResultsComponent />);
    expect(component).toBeTruthy();
  });
});
