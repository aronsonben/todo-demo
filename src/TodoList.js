import React, { Component } from 'react';
import TodoItems from "./TodoItems";
import InfoBox from "./InfoBox";
import "./TodoList.css";

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            showInfo: false
        };

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.clearAll = this.clearAll.bind(this);
    }

    addItem(e) {
        if(this.inputElement.value !== "") {
            var newItem = {
                text: this.inputElement.value,
                key: Date.now()
            };

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });

            this.inputElement.value = "";
        }

        console.log(this.state.items);

        e.preventDefault();
    }

    deleteItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key);
        });

        this.setState({
            items: filteredItems
        });
    }

    clearAll() {
        this.inputElement.value = "";

        this.setState({
            items: []
        });

        console.log(this.state.items);
    }

    toggleDiv() {
        this.setState({
            showInfo : !this.state.showInfo
        });
    }

    render() {
        return (
            <div className="todoListMain">
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <input ref={(a) => this.inputElement = a}
                                placeholder="enter task">
                        </input>
                        <button type="submit">add</button>
                        <button onClick={this.clearAll}>clear</button>
                    </form>
                </div>
                <div id="infoSection">
                    <div class="infoCol" id="listItems">
                        <TodoItems entries={this.state.items}
                                   delete={this.deleteItem}
                                   toggleDiv={this.toggleDiv}
                                   toggleInfo={this.state.showInfo}/>
                    </div>
                    <div class="infoCol" id="itemInfoBox">
                        <InfoBox showBox={this.state.showInfo}/>
                    </div>
                </div>

            </div>
        );
    }
}

export default TodoList;