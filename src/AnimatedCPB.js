import React from "react";
import { Animate } from "react-move";

class AnimatedCPB extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        isAnimated: false,
      }
  }
  componentDidMount() {
      this.setState({
        isAnimated: !this.state.isAnimated
      });
  }
  componentDidUpdate() {
    console.log("update");
    if(this.state.isAnimated === false) {
        this.state.isAnimated = true;
    }
    this.render();
  }

  static defaultProps = {
    valueStart: 0
  };

  render() {
    if (this.props.reset === true) {
      this.state.isAnimated = false; 
      return (
        <Animate
          start={() => ({
            value: this.props.valueStart,
            seconds: this.props.duration
          })}
          update={() => ({
            value: [
              this.props.valueStart
            ],
            seconds: [
              this.props.duration 
            ],
            timing: {
              duration: 0
            }
          })}
        >
          {({value, seconds}) => this.props.children(value, seconds)}
        </Animate>
      );

    }
    return (
      <Animate
        start={() => ({
          value: this.props.valueStart,
          seconds: this.props.duration,
        })}
        update={() => {
          return {
          value: [
            this.state.isAnimated ? this.props.valueEnd : this.props.valueStart
          ],
          seconds: [
            this.state.isAnimated ? 0: this.props.duration 
          ],
          timing: {
            duration: this.props.duration * 1000,
          }
        }
        }}
      >
        {({value, seconds}) => this.props.children(value, seconds)}
      </Animate>
    );
  }
}

export default AnimatedCPB;
