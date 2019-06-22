import React from 'react';

export default class ShowStatus extends React.Component {

    renderStatusSignCancelled(text){
        return (
            <div className="status-cancelled">{text}</div>
        )
    }

    renderStatusSignActionRequired(text){
        return (
            <div className="status-warning">{text}</div>
        )
    }

    renderStatusSignCompleted(text){
        return (
            <div className="status-completed">{text}</div>
        )
    }


    renderStatusSignActive(text){
        return (
            <div className="status-active">{text}</div>
        )
    }

    renderStatusBackOffice(statusData){
        let confirmationRequests = statusData.confirmationRequests;
        let confirmationRequestsLength = confirmationRequests.length;
        let isConfirmed;
        let noTracking = statusData.trackingStatus === "NOT_TRACKING";
        let pickUpTimePassed = false;
        let dropOffTimePassed = false;

        if(confirmationRequestsLength > 0 && confirmationRequests[confirmationRequestsLength-1].confirmedAt){
            isConfirmed = true;
        }

        if(isConfirmed){
            if(isConfirmed && statusData.isCancelled){
                return this.renderStatusSignCancelled("cancelled");
            }else if(statusData.trackingStatus){
                if(noTracking){
                    if(pickUpTimePassed){
                        return this.renderStatusSignActive("active");
                    }else if(pickUpTimePassed && dropOffTimePassed){
                        if(statusData.isClosed){
                            return this.renderStatusSignCompleted("Completed (not tracking based)");
                        }else{
                            return this.renderStatusSignActionRequired("To Close (not tracking based)");
                        }
                    }else{
                        return this.renderStatusSignCompleted("confirmed");
                    }
                }
                else{
                    if(statusData.trackingStatus === "PASSENGER_DROPPED_OFF"){
                        if(statusData.isClosed){
                            return this.renderStatusSignCompleted("Completed");
                        }else{
                            return this.renderStatusSignActionRequired("To Close");
                        }
                    }else{
                        return this.renderStatusSignActive(statusData.trackingStatus);
                    }
                }
            }
            else{
                return this.renderStatusSignCompleted("Confirmed")
            }
        }else if(((!isConfirmed && confirmationRequestsLength > 1) || confirmationRequestsLength === 1)){
            return this.renderStatusSignActionRequired("To confirm change");
        }else{
            return <div>invalid confirmationRequests</div>
        }
    }

    renderStatusSupplier(statusData){
        return(
            <h1>"SUPPLIER"</h1>
        )
    }

    renderStatusCustomer(statusData){
        return(
            <h1>"Customer"</h1>
        )
    }


    renderStatusByUserType(){
        let statusData = this.props.statusData;
        switch(statusData && statusData.userType){
            case 'BACK_OFFICE':
                return this.renderStatusBackOffice(statusData);
            case 'SUPPLIER':
                return this.renderStatusSupplier(statusData);
            case 'Customer':
                return this.renderStatusCustomer(statusData);
            default:
                return(
                    <div>
                        unknown user type
                    </div>
                );
        }
    }

    render() {
        return (
            <div>
                {this.renderStatusByUserType()}
            </div>
        );
    }
}