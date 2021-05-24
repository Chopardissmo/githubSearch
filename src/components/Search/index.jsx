import React, { Component } from "react";
import Axios from "axios";

export default class Search extends Component {
    search = () => {
        //获取用户输入
        const { value } = this.keywordElement;
        console.log(value);
        //发送AJAX请求
        // url 可以简写`/api/search/users?q=${value}`
        Axios.get(`http://localhost:3000/api/search/users?q=${value}`).then(
            (response) => console.log("success", response.data),
            (error) => console.log("fail", error)
        );
    };
    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search Github Users</h3>
                <div>
                    <input
                        ref={(c) => {
                            this.keywordElement = c;
                        }}
                        type="text"
                        placeholder="Enter UserName"
                    />
                    &nbsp;
                    <button onClick={this.search}>Search</button>
                </div>
            </section>
        );
    }
}
