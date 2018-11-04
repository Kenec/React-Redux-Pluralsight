import React from 'react';
import PropTypes from 'prop-types';

class LoadingDots extends React.Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = { frame: 1};
    this.setupDots = this.setupDots.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ //eslint-disable-line
        frame: this.state.frame + 1
      });
    }, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setupDots(text) {
    let dots = this.state.frame % (this.props.dots + 1);
    while (dots > 0) {
      text += '.';
      dots--;
    }
    return text;
  }

  render() {
    let text = '';
    let dots = this.setupDots(text);
    return <span {...this.props}>{dots}&nbsp;</span>;
  }
}

LoadingDots.defaultProps = {
  interval: 300, 
  dots: 30
};

LoadingDots.propTypes = {
  interval: PropTypes.number,
  dots: PropTypes.number
};

export default LoadingDots;