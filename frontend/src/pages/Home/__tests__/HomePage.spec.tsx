import React from 'react';
import HomePage from '../HomePage';
import { shallow } from 'enzyme';
// import { useSelector, useDispatch } from 'react-redux';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

describe('HomePage', () => {
  const component = shallow(<HomePage />);

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
