import React from 'react';
import ShowStatus from './ShowStatus';
import AddConfirmationDate from './AddConfirmationDate';

var moment = require('moment');

export default class GetEHome extends React.Component {
    constructor(props){
        super(props);
    
        this.state={
            userTypes:['BACK_OFFICE','SUPPLIER','CUSTOMER'],
            trackingStatus:['NOT_TRACKING','DRIVER_ON_THE_WAY','DRIVER_AT_PICKUP','PASSENGER_ON_BOARD','PASSENGER_DROPPED_OFF'],
            selectedUserType:"",
            confirmationRequests:[],
            selectedTrackingStatus:"",
            isCancelled:false,
            isClosed:false,
            submittedStatus:undefined,
            showModal:false
        }
    }

    toggleModal(condition){
        this.setState({
            showModal:condition
        });
    }

    addConfirmationRequest(requestDate, confirmDate){
        this.toggleModal(false);
        if(requestDate){
            requestDate = moment(requestDate).format();
        }else{
            requestDate = null
        }

        if(confirmDate){
            confirmDate = moment(confirmDate).format()
        }else{
            confirmDate = null;
        }
        let confirmationRequest = {
            requestedAt:requestDate,
            confirmedAt:confirmDate
        }

        let copyState = this.state.confirmationRequests.slice();
        copyState.push(confirmationRequest);

        this.setState({
            confirmationRequests:copyState
        });
    }

    removeConfirmationRequest(index){
        let copyState = this.state.confirmationRequests.slice();
        copyState.splice(index,1);

        this.setState({
            confirmationRequests:copyState
        });
    }

    handleInputChangeAction(stateName, event){
        let newValue = event.target.value;

        if(newValue === "true"){
            newValue = true;
        }else if(newValue === "false"){
            newValue = false;
        }else if(newValue === ""){
            newValue = undefined;
        }
        this.setState({
            [stateName]:newValue
        });
    }

    handleSubmitAction(){
        let mockData = {
            userType: this.state.selectedUserType,
            confirmationRequests:this.state.confirmationRequests,
            trackingStatus: this.state.selectedTrackingStatus,
            isCancelled: this.state.isCancelled,
            isClosed: this.state.isClosed
        }

        this.setState({
            submittedStatus:mockData
        });
    }

    renderDropdownOptions(stateName){
        let optionList = this.state[stateName];
        if(Array.isArray(optionList)){
            return optionList.map((option,index)=>{
                return(
                    <option value={option} key={`${stateName}-${index}`}>{option}</option>
                );
            });
        }else{
            return false;
        }

    }

    renderConfirmationRequests(){
        return this.state.confirmationRequests.map((cRequest,index)=>{
            let requestedAt = cRequest.requestedAt;
            let confirmedAt = cRequest.confirmedAt;

            if(!requestedAt){
                requestedAt = "null";
            }

            if(!confirmedAt){
                confirmedAt = "null";
            }


            return(
                <div key={`confirmation-req-${index}`}>
                    requested at: {requestedAt}
                    <br/>
                    confirmed at: {confirmedAt}
                    <br/>
                    <input type="button" value="remove" onClick={this.removeConfirmationRequest.bind(this, index)}/>
                    <br/>
                    <br/>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <h2>fake data generator</h2>
                <label htmlFor="selectedUserType">user Type:</label>
                <select name="selectedUserType" 
                value={this.state.selectedUserType} onChange={this.handleInputChangeAction.bind(this,"selectedUserType")}>
                    <option value={""}></option>
                    {this.renderDropdownOptions("userTypes")}
                </select>

                <br/>
                <label htmlFor="selectedTrackingStatus">Input Type:</label>
                <select name="selectedTrackingStatus" 
                value={this.state.type} onChange={this.handleInputChangeAction.bind(this,"selectedTrackingStatus")}>
                    <option value={""}></option>
                    {this.renderDropdownOptions("trackingStatus")}
                </select>

                <br/>
                <label>Confirmation request:</label>
                {this.renderConfirmationRequests()}
                <input type="button" value="add confirmation request" onClick={this.toggleModal.bind(this, true)}/>

                <br/>
                <label htmlFor="isCancelled">is cancelled:</label>
                <select name="isCancelled" 
                value={this.state.isCancelled} onChange={this.handleInputChangeAction.bind(this,"isCancelled")}>
                    <option value={false}>false</option>
                    <option value={true}>true</option>
                </select>

                <br/>
                <label htmlFor="isClosed">is closed:</label>
                <select name="isClosed" 
                value={this.state.isClosed} onChange={this.handleInputChangeAction.bind(this,"isClosed")}>
                    <option value={false}>false</option>
                    <option value={true}>true</option>
                </select>

                <br/>
                <input type="button" value="submit" onClick={this.handleSubmitAction.bind(this)}/>


                <br/>
                <br/>
                <br/>
                <h2>MyStatus</h2>
                {this.state.submittedStatus &&
                    <ShowStatus statusData={this.state.submittedStatus}/>
                }
                {this.state.showModal &&
                    <AddConfirmationDate 
                    closeModal={this.toggleModal.bind(this, false)}
                    addConfirmationRequest={this.addConfirmationRequest.bind(this)}/>
                }
            </div>
            
        );
    }
}