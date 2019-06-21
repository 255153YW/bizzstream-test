import React from 'react';

export default class Home extends React.Component {
    constructor(props){
        super(props);
    
        this.state={
            showModal:false,
        }
    }
    render() {
        return (
            <div>
                <h2>Welcome to my test project app</h2>
                <div><a href="/maxedy">Click Here</a> for Maxedy</div>
                <div><a href="/get-e">Click Here</a> for Get-E</div>
            </div>
            
        );
    }
}