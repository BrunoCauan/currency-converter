import React from "react";
import "./styles.css";

import CurrencySelector from "../CurrencySelector";
import api from "../../api";

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currencyList: [],
            fromCurrency: "BRL",
            toCurrency: "USD",
            ammount: "",
            result: 0,
        };
    }

    componentDidMount() {
        this.getCurrencyList();
    }

    getCurrencyList() {
        fetch(`${api.baseUrl}/currencies?${api.key}`)
            .then((data) => data.json())
            .then((data) => {
                var tempCurrencyList = [];

                for (const [currency] of Object.entries(data.results)) {
                    tempCurrencyList.push(currency);
                }

                this.setState({
                    currencyList: tempCurrencyList.sort((a, b) =>
                        a.localeCompare(b)
                    ),
                });
            });
    }

    handleCurrencyChange(wichCurrency, currencyValue) {
        this.setState({ [wichCurrency]: currencyValue, result: 0 });
    }

    handleConvertion(e) {
        e.preventDefault();

        const { fromCurrency, toCurrency, ammount } = this.state,
            query = `${fromCurrency}_${toCurrency}`;

        fetch(`${api.baseUrl}/convert?q=${query}&compact=ultra&${api.key}`)
            .then((data) => data.json())
            .then((data) => {
                var total = ammount * data[query];

                this.setState({ result: total });
            });
    }

    convertToCurrency() {
        const { result, toCurrency } = this.state;

        return result.toLocaleString("en-US", {
            style: "currency",
            currency: toCurrency,
        });
    }

    render() {
        const { currencyList, fromCurrency, toCurrency, ammount } = this.state;

        return (
            <div className="container">
                <div className="content">
                    <h1>Currency Converter</h1>
                    <p>Please, select your currencies:</p>

                    <form
                        onSubmit={(e) => {
                            this.handleConvertion(e);
                        }}
                    >
                        <div className="currency-selector-section">
                            <CurrencySelector
                                currencyList={currencyList}
                                value={fromCurrency}
                                updateCurrency={(value) =>
                                    this.handleCurrencyChange(
                                        "fromCurrency",
                                        value
                                    )
                                }
                            />

                            <span className="to"> to </span>

                            <CurrencySelector
                                currencyList={currencyList}
                                value={toCurrency}
                                updateCurrency={(value) =>
                                    this.handleCurrencyChange(
                                        "toCurrency",
                                        value
                                    )
                                }
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="value">Value:</label>
                            <input
                                id="value"
                                type="number"
                                value={ammount}
                                onChange={(e) => {
                                    this.setState({ ammount: e.target.value });
                                }}
                            />
                        </div>

                        <button className="cta" type="submit">
                            Convert
                        </button>

                        <div className="result">{this.convertToCurrency()}</div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Main;
