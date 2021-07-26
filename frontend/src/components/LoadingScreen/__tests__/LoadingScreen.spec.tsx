import React from 'react';
import { shallow } from 'enzyme';

import LoadingScrene from '../LoadingScreen';

describe('LoadingScreen', () => {
  it('should render correctly', () => {
    const component = shallow(<LoadingScrene />);
    expect(component).toMatchSnapshot();
  });
});
