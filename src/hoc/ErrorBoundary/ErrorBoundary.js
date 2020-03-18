import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Aux'
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error,info) {
    this.setState({ hasError: true });
  }
  render() {
    return this.state.hasError?
        <Aux>
            <Modal show={true}>Something went wrong</Modal>
            {this.props.children}
        </Aux>:
        this.props.children; 
  }
}
export default ErrorBoundary;