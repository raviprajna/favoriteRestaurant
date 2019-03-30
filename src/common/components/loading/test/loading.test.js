import React from 'react';
import Loading from '../';
import {getComponentTree, getWrapper } from '../../../util/testUtil.js';

describe('<Loading /> Component Test', () => {
  it('renders <Loading /> components', () => {

  const wrapper = getWrapper(<Loading />);

  // Print Html to console
  console.log(wrapper.debug());

  // Assert if loading contains particular react element.
  expect(wrapper.contains(<div> Loading... </div>)).toEqual(true);

  // Assert with snapshot
  expect(getComponentTree(<Loading />)).toMatchSnapshot();


  });

});