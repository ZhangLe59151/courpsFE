import React, {Component} from 'react';
import {Spin} from 'antd';
import './index.less';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    isUnMounted = false;

    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const {default: component} = await importComponent();

      if (this.isUnMounted) {
        return;
      }

      this.setState({
        component
      });
    }

    render() {
      const C = this.state.component;
      return C ? (
        <C {...this.props} />
      ) : (
        <Spin spinning className='async-spin' />
      );
    }

    componentWillUnmount() {
      this.isUnMounted = true;
    }
  }

  return AsyncComponent;
}
