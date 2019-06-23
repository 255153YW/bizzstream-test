import React from 'react';
import ShowStatus from './ShowStatus';

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
            withTracking:undefined,
            pickUpTimePassed:false,
        }
    }

    deepCopy(data){
        if(data === undefined || data === null){
            return data;
        }else{
            return JSON.parse(JSON.stringify(data));
        }
    }

    dropPassengerOff(){
        this.addConfirmationRequest(new Date(),false);

        if(this.state.withTracking === true){
            this.setState({
                selectedTrackingStatus:this.state.trackingStatus[4]
            });
        }else{
            this.setState({
                selectedTrackingStatus:this.state.trackingStatus[0]
            });
        }

        this.setState({
            isClosed:true
        });
    }

    setWithTracking(condition){
        this.setState({
            withTracking:condition
        });
    }

    addConfirmationRequest(requestDate, confirmDate){
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

        let copyState = this.deepCopy(this.state.confirmationRequests);
        copyState.push(confirmationRequest);

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

        if(stateName === "withTracking" && newValue === false){
            this.setState({
                selectedTrackingStatus:this.state.trackingStatus[0]
            });
        }

        this.setState({
            [stateName]:newValue
        });
    }

    handleCancelAction(){
        this.addConfirmationRequest(new Date(),false);
        this.setState({
            isCancelled:true
        },this.handleSubmitAction.bind(this));
    }

    handleSubmitAction(){
        let mockData = {
            userType: this.deepCopy(this.state.selectedUserType),
            confirmationRequests:this.deepCopy(this.state.confirmationRequests),
            trackingStatus: this.deepCopy(this.state.selectedTrackingStatus),
            isCancelled: this.deepCopy(this.state.isCancelled),
            isClosed: this.deepCopy(this.state.isClosed),
            pickUpTimePassed: this.deepCopy(this.state.pickUpTimePassed)
        }

        this.setState({
            submittedStatus:mockData
        });
    }

    handleResetAction(){
        this.setState({
            selectedUserType:"",
            confirmationRequests:[],
            selectedTrackingStatus:"",
            isCancelled:false,
            isClosed:false,
            submittedStatus:undefined,
            withTracking:undefined,
        });
    }

    handleConfirmRequestAction(){
        let confirmationRequestLength = this.state.confirmationRequests.length;
        let lastConfirmation;
        if(confirmationRequestLength > 0){
            lastConfirmation = this.state.confirmationRequests[confirmationRequestLength-1];
        }

        if(lastConfirmation && !lastConfirmation.confirmedAt){
            let copyState = this.deepCopy(this.state.confirmationRequests);
            copyState[confirmationRequestLength-1].confirmedAt = moment(new Date()).format();
            this.setState({
                confirmationRequests:copyState
            },this.handleSubmitAction.bind(this));
        }
        
    }

    renderDropdownOptions(stateName){
        let optionList = this.state[stateName];
        if(Array.isArray(optionList)){
            if(stateName === "trackingStatus"){
                //remove the first element "NOT_TRACKING" from the list
                if(this.state.withTracking === true){
                    optionList = optionList.slice();
                    optionList.splice(0,1);
                }

                //remove the last element "PASSENGER_DROPPED_OFF" from the list
                optionList = optionList.slice();
                optionList.splice(optionList.length-1,1);
            }
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
                    <br/>
                    <br/>
                </div>
            );
        });
    }

    render() {
        let confirmationRequestLength = this.state.confirmationRequests.length;
        let lastConfirmation;
        if(confirmationRequestLength > 0){
            lastConfirmation = this.state.confirmationRequests[confirmationRequestLength-1];
        }
        return (
            <div>
                <h2>booking simulator</h2>
                <label htmlFor="selectedUserType">user Type:</label>
                <select name="selectedUserType" 
                value={this.state.selectedUserType} onChange={this.handleInputChangeAction.bind(this,"selectedUserType")}>
                    <option value={""}></option>
                    {this.renderDropdownOptions("userTypes")}
                </select>

                {this.state.selectedUserType !== "" &&
                    <React.Fragment>
                        <br/>
                        <label>Confirmation request:</label>
                        {this.renderConfirmationRequests()}
                        {(this.state.isCancelled === false && this.state.isClosed === false &&
                            (confirmationRequestLength === 0 || (confirmationRequestLength > 0 && lastConfirmation && lastConfirmation.confirmedAt))
                        )
                            &&
                            <input type="button" value="add another confirmation request" onClick={this.addConfirmationRequest.bind(this, new Date(),false)}/>
                        }

                        {lastConfirmation && lastConfirmation.confirmedAt && this.state.isCancelled === false && this.state.isClosed === false &&
                            <React.Fragment>
                                <br/>
                                <br/>
                                
                                {this.state.withTracking !== undefined 
                                ?
                                    <React.Fragment>
                                        <label htmlFor="selectedTrackingStatus">tracking status:</label>
                                        {this.state.withTracking === true || this.state.isClosed === true
                                        ?
                                        <React.Fragment>
                                            <select name="selectedTrackingStatus" 
                                            value={this.state.selectedTrackingStatus} onChange={this.handleInputChangeAction.bind(this,"selectedTrackingStatus")}>
                                                <option value={""}></option>
                                                {this.renderDropdownOptions("trackingStatus")}
                                            </select>
                                            <br/>
                                            <input type="button" value="drop passenger off" onClick={this.dropPassengerOff.bind(this)}/>
                                        </React.Fragment>     
                                        :
                                        <React.Fragment>
                                            {this.state.selectedTrackingStatus}
                                            <br/>
                                            <input type="checkbox" checked={this.state.pickUpTimePassed} 
                                            onChange={this.handleInputChangeAction.bind(this,"pickUpTimePassed")}/> Pick-up time passed
                                            <br/>
                                            {this.state.pickUpTimePassed &&
                                                <input type="button" value="drop off time passed" onClick={this.dropPassengerOff.bind(this)}/>
                                            }
                                        </React.Fragment>
                                        
                                        }
                                        
                                    </React.Fragment>
                                :
                                    <React.Fragment>
                                        <label htmlFor="withTracking">withTracking</label>
                                        <select name="withTracking" 
                                        value={this.state.withTracking} onChange={this.handleInputChangeAction.bind(this,"withTracking")}>
                                            <option value={undefined}></option>
                                            <option value={false}>false</option>
                                            <option value={true}>true</option>
                                        </select>
                                    </React.Fragment>
                                }
                            
                            <br/>
                            <br/>
                            </React.Fragment>
                        }

                        {this.state.isCancelled === true && 
                            (lastConfirmation && lastConfirmation.confirmedAt 
                                ?
                                "Booking cancelled"
                                :
                                "Booking cancellation triggered, please confirm with user type 'BACK_OFFICE'"
                            )
                        }
                        
                        
                    </React.Fragment>
                }

                <br/>
                {this.state.selectedUserType !== "" && lastConfirmation &&
                    <React.Fragment>
                        <input type="button" value="update MyStatus" onClick={this.handleSubmitAction.bind(this)}/>
                        {this.state.isCancelled === false && this.state.isClosed === false &&
                            <input type="button" value="cancel booking" onClick={this.handleCancelAction.bind(this)}/>
                        }
                        
                        <input type="button" value="start over" onClick={this.handleResetAction.bind(this)}/>
                    </React.Fragment>
                }
                
                <br/>
                <br/>
                <br/>
                {this.state.selectedUserType !== "" && lastConfirmation &&
                    <React.Fragment>
                        <h2>MyStatus</h2>
                        {this.state.submittedStatus &&
                            <ShowStatus statusData={this.state.submittedStatus} confirmRequestAction={this.handleConfirmRequestAction.bind(this)}/>
                        }
                    </React.Fragment>
                }
            </div>
        );
    }
}