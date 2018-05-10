import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import { connect } from "react-redux";
// import { is, fromJS } from 'immutable';
// import PropTypes from 'prop-types';
// import API from '@/api/api';
// import envconfig from '@/envconfig/envconfig';
import { getData } from '@/store/home/action';
// import { clearSelected } from '@/store/production/action';
import axios from 'axios';
import "./home.less";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          key: 1,
          title: "当月"
        },
        {
          key: 2,
          title: "季度"
        },
        {
          key: 3,
          title: "半年"
        },
        {
          key: 4,
          title: "一年"
        }
      ],
      activeKey: 1
    };
  }

  componentDidMount () {
    // axios.get('https://staging.qodstar.cn/api/v0.1/accounts/authentication/')
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }

  handleClick = key => {
    this.setState({
      activeKey: key
    });
    console.log("查看this.props", this);
  };

  render() {
    let tabs = this.state.tabs.map((item, index) => {
      return (
        <button
          type="button"
          className={
            this.state.activeKey === item.key
              ? "btn btn-secondary active"
              : "btn btn-secondary"
          }
          key={item.key}
          onClick={this.handleClick.bind(this, item.key)}
        >
          {item.title}
        </button>
      );
    });
    return (
      <div className="home">
        <header className="header">
          <h1>码星产品数据面板</h1>
        </header>
        <div className="container">
          <div className="btn-group" role="group" aria-label="Basic example">
            {tabs}
          </div>
          <div className="content">
              <div className="row align-items-center">
                <div className="col">
                  <div className="title">
                    <span>主页浏览量</span>
                    <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
                      18万
                    </h1>
                    <h6 style={{ fontSize: "0.6rem" }}>上季度: 20万</h6>
                  </div>
                </div>
                <div className="col">
                  <div className="title">
                    <span>新增企业用户</span>
                    <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>80</h1>
                    <h6 style={{ fontSize: "0.6rem" }}>上季度: 30</h6>
                  </div>
                </div>
                <div className="col">
                  <div className="title">
                    <span>创建职位</span>
                    <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
                      488
                    </h1>
                    <h6 style={{ fontSize: "0.6rem" }}>上季度: 55</h6>
                  </div>
                </div>
                <div className="col">
                  <div className="title">
                    <span>邀请发送</span>
                    <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
                      666
                    </h1>
                    <h6 style={{ fontSize: "0.6rem" }}>上季度: 333</h6>
                  </div>
                </div>
                <div className="col">
                  <div className="title">
                    <span>销售额</span>
                    <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
                      100万
                    </h1>
                    <h6 style={{ fontSize: "0.6rem" }}>上季度: 20万</h6>
                  </div>
                </div>
              </div>
              <table className="table table-hover table-dark table-striped">
                <thead>
                  <tr>
                    <th scope="col">阶段</th>
                    <th scope="col" style={{ width: "40rem" }}>
                      漏斗数据
                    </th>
                    <th scope="col">份额(占比)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">访客(公众号,页面)</th>
                    <td>
                      <div className="progress" style={{ marginBottom: "0.2rem" }}>
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          style={{ width: "60%" }}
                          aria-valuenow="0"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          60%
                        </div>
                      </div>
                      <div className="progress">
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          style={{ width: "40%" }}
                          aria-valuenow="0"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          40%
                        </div>
                      </div>
                    </td>
                    <td>5000(100%)</td>
                  </tr>
                  <tr>
                    <th scope="row">潜在用户(报名公测)</th>
                    <td>
                      <div className="progress">
                        <div
                          className="progress-bar bg-warning"
                          style={{ width: "16%" }}
                          role="progressbar"
                          aria-valuenow="0"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          16%
                        </div>
                      </div>
                    </td>
                    <td>1500(16%)</td>
                  </tr>
                  <tr>
                    <th scope="row">新用户(已登录,创建职位)</th>
                    <td>
                      <div className="progress">
                        <div
                          className="progress-bar bg-danger"
                          style={{ width: "16%" }}
                          role="progressbar"
                          aria-valuenow="0"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          16%
                        </div>
                      </div>
                    </td>
                    <td>800(16%)</td>
                  </tr>
                  <tr>
                    <th scope="row">真实用户(发送测试邀请)</th>
                    <td>
                      <div className="progress">
                        <div
                          className="progress-bar bg-success"
                          style={{ width: "10%" }}
                          role="progressbar"
                          aria-valuenow="0"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          10%
                        </div>
                      </div>
                    </td>
                    <td>360(10%)</td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
      getData: state.getData,
  }),
  {
      getData,
  }
)(Home);
