import React from 'react';
import { shallow } from 'enzyme';
import { NoPermissionComponent } from './NoPermission';

describe('Component NoPermission', () => {
  it('should render without crashing', () => {
    const component = shallow(<NoPermissionComponent />);
    expect(component).toBeTruthy();
  });
});
