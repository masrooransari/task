import React from 'react';
import App from './App';

export default class MyComponet extends React.Component { 
    constructor(props){
        super(props);
        this.state = {
            name : 'Frontend'
        }
    }

    componentDidMount(){
        
    }

    handleClick(){
        this.setState({name : 'Masroor'});
        console.log(this.state);
    }

    render() {
        return(
            <>
            <App name={this.state.name}  />
            <button onClick={this.handleClick.bind(this)}>Click Me</button>
            </>
        );
    }
}