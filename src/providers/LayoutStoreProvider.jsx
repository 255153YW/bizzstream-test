import React from "react";
import { Provider } from "react-redux";
import LayoutStore from "stores/LayoutStore";

export default class LayoutStoreProvider extends React.Component {
    render() {
      return(
        <Provider store={LayoutStore}>
          {this.props.childComponent}
        </Provider>
      );
    }
  }
  