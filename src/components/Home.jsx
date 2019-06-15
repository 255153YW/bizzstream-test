import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { header: state.header };
};

const Home = class Home extends React.Component {
    constructor(props){
        super(props);
    
        this.state={
            sending:false,
        }
    }

    render() {
        console.log(this.props.header);
        return (
            <h2>Home</h2>
        );
    }
}

export default connect(mapStateToProps)(Home);;