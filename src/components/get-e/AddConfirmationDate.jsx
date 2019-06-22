import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default class AddConfirmationDate extends React.Component {
    constructor(props){
        super(props);
    
        this.state={
            requestDate:undefined,
            confirmDate:undefined
        }
    }

    handleInputChangeAction(stateName, date){
        this.setState({
            [stateName]:date
        });
    }

    componentWillUnmount(){
        this.setState({
            requestDate:undefined,
            confirmDate:undefined
        });
    }

    handleSubmitAction(){
        this.props.addConfirmationRequest(this.state.requestDate, this.state.confirmDate);
    }

    render() {
        return (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={this.props.closeModal}>&times;</span>
                    
                    <div>
                        <br/>
                        <label htmlFor="requestDate">Start Date:</label>
                        <DatePicker selected={this.state.requestDate} onChange={this.handleInputChangeAction.bind(this,"requestDate")}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeCaption="time"/>

                        <br/>
                        <label htmlFor="confirmDate">End Date:</label>
                        <DatePicker selected={this.state.confirmDate} onChange={this.handleInputChangeAction.bind(this,"confirmDate")}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeCaption="time"/>

                        <br/>
                        <input type="button" value="submit" onClick={this.handleSubmitAction.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }
}