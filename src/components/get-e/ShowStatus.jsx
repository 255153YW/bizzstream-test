import React from 'react';
import ShowStatusBackOffice from './ShowStatusBackOffice';
import ShowStatusSupplier from './ShowStatusSupplier';
import ShowStatusCustomer from './ShowStatusCustomer';

export default class ShowStatus extends React.Component {
    
    renderStatusByUserType(){
        let statusData = this.props.statusData;
        switch(statusData && statusData.userType){
            case 'BACK_OFFICE':
                return <ShowStatusBackOffice statusData={statusData}/>;
            case 'SUPPLIER':
                return <ShowStatusSupplier statusData={statusData}/>;
            case 'CUSTOMER':
                return <ShowStatusCustomer statusData={statusData}/>;
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