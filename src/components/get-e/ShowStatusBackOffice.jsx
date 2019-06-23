import React from 'react';
import RenderStatus from './RenderStatus';
import RenderStatusWithAction from './RenderStatusWithAction';

export default class ShowStatusBackOffice extends React.Component {

    renderStatusByUserType(){
        let statusData = this.props.statusData;
        let confirmationRequests = statusData.confirmationRequests;
        let confirmationRequestsLength = confirmationRequests.length;
        let isConfirmed;
        let noTracking = statusData.trackingStatus === "NOT_TRACKING";
        let pickUpTimePassed = statusData.pickUpTimePassed;

        let confirmRequestAction = this.props.confirmRequestAction;

        if(confirmationRequestsLength > 0 && confirmationRequests[confirmationRequestsLength-1].confirmedAt){
            isConfirmed = true;
        }

        if(isConfirmed){
            if(isConfirmed && statusData.isCancelled){
                return <RenderStatus type={"cancelled"} text={"Cancelled"}/>;
            }else if(statusData.trackingStatus){
                if(noTracking){
                    if(pickUpTimePassed && statusData.isClosed){
                        return <RenderStatus type={"completed"} text={"Completed (not tracking based)"}/>;
                    }
                    else if(pickUpTimePassed){
                        return <RenderStatus type={"active"} text={"Active (not tracking based)"}/>;
                    }else{
                        return <RenderStatus type={"completed"} text={"Confirmed"}/>;
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
                return <RenderStatus type={"completed"} text={"Confirmed"}/>;
            }
        }
        else if(!isConfirmed){
            if(statusData.isCancelled){
                return <RenderStatusWithAction 
                status={<RenderStatus type={"action-required"} text={"To confirm cancel"}/>}
                statusAction={confirmRequestAction}
                statusActionText={"Confirm cancel"}
                />;
            }
            else if(statusData.isClosed){
                if(noTracking){
                    return  <RenderStatus type={"action-required"} text={"To Close (not tracking based)"}/>;
                }else{
                    return <RenderStatus type={"action-required"} text={"To Close"}/>;
                }
            }
            else if(confirmationRequestsLength > 1){
                return <RenderStatus type={"action-required"} text={"To confirm change"}/>;
            }else if(confirmationRequestsLength === 1){
                return <RenderStatus type={"action-required"} text={"To confirm"}/>;
            }else{
                return <div>invalid confirmationRequests</div>
            }
        }
        else{
            return <div>invalid confirmationRequests</div>
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