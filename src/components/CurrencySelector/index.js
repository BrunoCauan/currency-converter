import React from "react";
import "./styles.css";

class CurrencySelector extends React.Component {
    currencyMapping() {
        return this.props.currencyList.map((currentCurrency, index) => (
            <option value={currentCurrency} key={index}>
                {currentCurrency}
            </option>
        ));
    }

    render() {
        return (
            <select
                value={this.props.value}
                onChange={(e) => this.props.updateCurrency(e.target.value)}
            >
                {this.currencyMapping()}
            </select>
        );
    }
}

export default CurrencySelector;
