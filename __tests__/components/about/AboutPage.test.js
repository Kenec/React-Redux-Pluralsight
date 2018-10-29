import React from 'react';
import { shallow } from 'enzyme';
import AboutPage from '../../../src/components/about/AboutPage';

describe('<AboutPage />', () => {
  const AboutPageComponent = shallow(<AboutPage />);
  it('should render correctly', () => {
    console.log(AboutPageComponent);
  });
});