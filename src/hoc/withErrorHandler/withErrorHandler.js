import React, {Component} from 'react';
import Modal from '../../Components/UI/Modal/Modal';
import Aux from '../aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
                error : null
        }

        componentWillMount() {
            this.requestInterceptors = axios.interceptors.request.use(req => {
                this.setState({error : null});
                return req
            })
            this.responseIntercptors = axios.interceptors.response.use(res => res,  error => {
                this.setState({error : error})
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptors);
            axios.interceptors.response.eject(this.responsetInterceptors);
        }

        errorConfirmedHandler = () => {
            this.setState({error:null});
        }

        render(){
            return (
                <Aux>
                    <Modal show={this.state.error} 
                        modalClosed ={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
                
            )
        }
}
}

export default withErrorHandler
