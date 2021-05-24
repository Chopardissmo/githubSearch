import React, { Component } from "react";
import Axios from "axios";
import Pubsub from "pubsub-js";

export default class Search extends Component {
    //! 通过Pubsub消息订阅与发布实现兄弟组件间的数据传递
    //! Search-发布
    search = () => {
        //获取用户输入
        const { value } = this.keywordElement;
        //开始发送请求，通知List更新状态
        Pubsub.publish("message", { isFirst: false, isLoading: true });
        //发送AJAX请求
        //url 可以简写`/api/search/users?q=${value}`
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
                //请求成功，通知List更新状态
                Pubsub.publish("message", {
                    isLoading: false,
                    users: users,
                    err: null,
                });
            },
            (error) => {
                //请求失败，通知List更新状态
                Pubsub.publish("message", {
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

    //! 传统方式(LAC)实现兄弟组件间的数据传递
    // search = () => {
    //     const { updateAppState } = this.props;
    //     //获取用户输入
    //     const { value } = this.keywordElement;

    //     updateAppState({ isFirst: false, isLoading: true });

    //     //发送AJAX请求
    //     // url 可以简写`/api/search/users?q=${value}`
    //     Axios.get(`http://localhost:3000/api/search/users?q=${value}`).then(
    //         (response) => {
    //             console.log("success", response.data);
    //             const users = response.data.items.map((item) => {
    //                 const user = {};
    //                 user.id = item.id;
    //                 user.login = item.login;
    //                 user.avatar_url = item.avatar_url;
    //                 user.html_url = item.html_url;
    //                 return user;
    //             });
    //             updateAppState({
    //                 isLoading: false,
    //                 users: users,
    //                 err: null,
    //             });
    //         },
    //         (error) => {
    //             updateAppState({
    //                 isLoading: false,
    //                 err: `Request Err: ${error}`,
    //             });
    //         }
    //     );
    // };
    // render() {
    //     return (
    //         <section className="jumbotron">
    //             <h3 className="jumbotron-heading">Search Github Users</h3>
    //             <div>
    //                 <input
    //                     ref={(c) => {
    //                         this.keywordElement = c;
    //                     }}
    //                     type="text"
    //                     placeholder="Enter UserName"
    //                 />
    //                 &nbsp;
    //                 <button onClick={this.search}>Search</button>
    //             </div>
    //         </section>
    //     );
    // }
}
