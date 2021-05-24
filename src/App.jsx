import React, { Component } from "react";
import Search from "./components/Search";
import List from "./components/List";

export default class App extends Component {
    //! 通过Pubsub消息订阅与发布实现兄弟组件间的数据传递
    render() {
        return (
            <div className="container">
                <Search />
                <List />
            </div>
        );
    }
    //! 传统方式(LAC)实现兄弟组件间的数据传递
    // state = {
    //     users: [],
    //     isFirst: true,
    //     isLoading: false,
    //     err: "",
    // };
    // updateAppState = (stateObj) => {
    //     this.setState(stateObj);
    // };
    // render() {
    //     return (
    //         <div className="container">
    //             <Search updateAppState={this.updateAppState} />
    //             <List {...this.state} />
    //         </div>
    //     );
    // }
}
