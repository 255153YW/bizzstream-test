import React from 'react';
import RenderStatus from './RenderStatus';

export default class ShowStatusSupplier extends React.Component {
    
    renderStatus(){
        let statusData = this.props.statusData;
        let confirmationRequests = statusData.confirmationRequests;
        let confirmationRequestsLength = confirmationRequests.length;
        let isConfirmed;
        let noTracking = statusData.trackingStatus === "NOT_TRACKING";
        let pickUpTimePassed = statusData.pickUpTimePassed;

        if(confirmationRequestsLength > 0 && confirmationRequests[confirmationRequestsLength-1].confirmedAt){
            isConfirmed = true;
        }

        if(isConfirmed && statusData.isCancelled){
            return <RenderStatus type={"cancelled"} text={"Cancelled"}/>;
        }else if(statusData.trackingStatus){
            if(noTracking){
                if(pickUpTimePassed && statusData.isClosed){
                    return <RenderStatus type={"completed"} text={"Completed (not tracking based)"}/>;
                }
                else{
                    return <RenderStatus type={"active"} text={"Active (not tracking based)"}/>;
                }
            }
            else{
                if(statusData.trackingStatus === "PASSENGER_DROPPED_OFF" && statusData.isClosed){
                    return <RenderStatus type={"completed"} text={"Completed"}/>;
                }else{
                    return <RenderStatus type={"active"} text={`${statusData.trackingStatus}`}/>;
                }
            }
        }
        else{
            return <RenderStatus type={"completed"} text={"Booked"}/>;
        }
        
    }

    render() {
        return (
            <div>
                {this.renderStatus()}
            </div>
        );
    }
}