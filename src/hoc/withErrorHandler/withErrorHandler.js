
import React, {Component} from 'react'

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../../hoc/Aux'

const withErrorHandler = (WrappedComponent, axios) => {

    class ErrorComponent extends Component {

        state = {
            error : null,
        }

        componentDidMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                //console.log("Clearing error");
                this.setState({error: null})
                return req;
            })

            this.resInterceptor = axios.interceptors.response.use(req => req, error => {
                //console.log("Received error" , error);
                
                this.setState((prevState, currentProps) => {
                    return {error : error}
                });
                
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
            //console.log("Component will unmount")
        }

        errorConfirmedHandler = () => {
            //console.log("Clearing error");
            this.setState({error : null})
        }
        
        render () {
            //console.log("Rendering, has state ", this.state);
            return (
                <Aux>
                    <Modal show={this.state.error}
                            modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}

                    </Modal>
    
                    <WrappedComponent {...this.props}/>
    
                </Aux>
    
    
            );

        }
        

    }

    return ErrorComponent;


}
export default withErrorHandler;