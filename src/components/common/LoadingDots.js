import React, { PropTypes } from 'react';

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
  }

  render() {
    let text = '';
    this.setupDots(text);
    return <span {...this.props}>{text}&nbsp;</span>;
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