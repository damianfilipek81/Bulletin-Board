import React from 'react';
import { shallow } from 'enzyme';
import { PostCardComponent } from './PostCard';

describe('Component PostCard', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostCardComponent />);
    expect(component).toBeTruthy();
  });
});
