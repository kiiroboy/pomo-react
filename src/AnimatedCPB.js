import React from "react";
import { Animate } from "react-move";

class AnimatedCPB extends React.Component {
  interval = undefined;

  state = {
    isAnimated: this.props.playing
  };

  static defaultProps = {
    valueStart: 0
  };

  componentDidMount() {
      if (!this.state.isAnimated) {
        this.setState({isAnimated: true})
      } else {
        this.setState({isAnimated: false})
      }
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <Animate
        start={() => ({
          value: this.props.valueStart
        })}r
        update={() => ({
          value: [
            this.state.isAnimated ? this.props.valueEnd : this.props.valueStart
          ],
          timing: {
            duration: this.props.duration * 1000,
            ease: this.props.easingFunction
          }
        })}
      >
        {({ value }) => this.props.children(value)}
      </Animate>
    );
  }
}

export default AnimatedCPB;
