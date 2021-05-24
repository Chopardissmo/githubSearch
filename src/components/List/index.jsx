import React, { Component } from "react";
import Pubsub from "pubsub-js";
import "./index.css";

export default class List extends Component {
    //! 通过Pubsub消息订阅与发布实现兄弟组件间的数据传递
    //! List-订阅
    state = {
        users: [],
        isFirst: true,
        isLoading: false,
        err: "",
    };

    componentDidMount() {
        Pubsub.subscribe("message", (msg, stateObj) => {
            this.setState(stateObj);
        });
    }

    render() {
        const { users, isFirst, isLoading, err } = this.state;
        return (
            <div className="row">
                {isFirst ? (
                    <h1>Enter UserName to Search</h1>
                ) : isLoading ? (
                    <h2>Loading........</h2>
                ) : err ? (
                    <h2>{err}</h2>
                ) : (
                    users.map((user) => {
                        return (
                            <div className="card" key={user.id}>
                                <a
                                    rel="noreferrer"
                                    href={user.html_url}
                                    target="_blank"
                                >
                                    <img
                                        alt="avatar"
                                        src={user.avatar_url}
                                        style={{ width: "100px" }}
                                    />
                                </a>
                                <p className="card-text">{user.login}</p>
                            </div>
                        );
                    })
                )}
            </div>
        );
    }

    //! 传统方式(LAC)实现兄弟组件间的数据传递
    // render() {
    //     const { users, isFirst, isLoading, err } = this.props;
    //     return (
    //         <div className="row">
    //             {isFirst ? (
    //                 <h1>Enter UserName to Search</h1>
    //             ) : isLoading ? (
    //                 <h2>Loading........</h2>
    //             ) : err ? (
    //                 <h2>{err}</h2>
    //             ) : (
    //                 users.map((user) => {
    //                     return (
    //                         <div className="card" key={user.id}>
    //                             <a
    //                                 rel="noreferrer"
    //                                 href={user.html_url}
    //                                 target="_blank"
    //                             >
    //                                 <img
    //                                     alt="avatar"
    //                                     src={user.avatar_url}
    //                                     style={{ width: "100px" }}
    //                                 />
    //                             </a>
    //                             <p className="card-text">{user.login}</p>
    //                         </div>
    //                     );
    //                 })
    //             )}
    //         </div>
    //     );
    // }
}
