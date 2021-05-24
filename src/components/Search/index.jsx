import React, { Component } from "react";
import Axios from "axios";

export default class Search extends Component {
    search = () => {
        const { updateAppState } = this.props;
        //获取用户输入
        const { value } = this.keywordElement;

        updateAppState({ isFirst: false, isLoading: true });

        //发送AJAX请求
        // url 可以简写`/api/search/users?q=${value}`
        Axios.get(`http://localhost:3000/api/search/users?q=${value}`).then(
            (response) => {
                console.log("success", response.data);
                const users = response.data.items.map((item) => {
                    const user = {};
                    user.id = item.id;
                    user.login = item.login;
                    user.avatar_url = item.avatar_url;
                    user.html_url = item.html_url;
                    return user;
                });
                updateAppState({
                    isLoading: false,
                    users: users,
                    err: null,
                });
            },
            (error) => {
                updateAppState({
                    isLoading: false,
                    err: `Request Err: ${error}`,
                });
            }
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
