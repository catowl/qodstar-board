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
          key: 0,
          title: "当月"
        },
        {
          key: 1,
          title: "季度"
        },
        {
          key: 2,
          title: "半年"
        },
        {
          key: 3,
          title: "一年"
        }
      ],
      activeKey: 0
    };
  }

  // 获取面试数据
  fetchApi = (period) => {
    axios({
      method: 'get',
      url: `/date-date_data/?period=${period}`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      // console.log(response);
      if (response.status === 200) {
        this.setState({
          data: response.data.results
        })
      }
    })
    .catch(error => {
      // console.log(error);
    });;
  }

  componentDidMount () {
    // window.addEventListener()
    this.fetchApi(0);
  }

  // 切换period
  handleClick = key => {
    this.setState({
      activeKey: key
    });
    console.log("查看this.props", key);
    this.fetchApi(key);
  };

  render() {
    console.log('this.state', this.state);
    // 面板数据处理
    let { data } = this.state;
    let [
      increased_user_amount,
      jobpost_amount,
      invitation_sent_amount,
      sale_amount,
      wx_page_view,
      pc_page_view,
      potential_user_amount,
      new_user_amount,
      real_user_amount,
      sum
    ] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
    
    if (data) {
      increased_user_amount = data[0].increased_user_amount;
      jobpost_amount = data[0].jobpost_amount;
      invitation_sent_amount = data[0].invitation_sent_amount;
      sale_amount = data[0].sale_amount;
      wx_page_view = data[0].wx_page_view;
      pc_page_view = data[0].pc_page_view;
      potential_user_amount = data[0].potential_user_amount;
      new_user_amount = data[0].new_user_amount;
      real_user_amount = data[0].real_user_amount;
      sum = data[0].wx_page_view + data[0].pc_page_view + data[0].potential_user_amount + data[0].new_user_amount + real_user_amount;
    }

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
                      {0}
                    </h1>
                    <h6 style={{ fontSize: "0.6rem" }}>{`上季度: ${0}`}</h6>
                  </div>
                </div>
                <div className="col">
                  <div className="title">
                    <span>新增企业用户</span>
                    <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
                      {increased_user_amount}
                    </h1>
                    <h6 style={{ fontSize: "0.6rem" }}>{`上季度: ${0}`}</h6>
                  </div>
                </div>
                <div className="col">
                  <div className="title">
                    <span>创建职位</span>
                    <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
                      {jobpost_amount}
                    </h1>
                    <h6 style={{ fontSize: "0.6rem" }}>{`上季度: ${0}`}</h6>
                  </div>
                </div>
                <div className="col">
                  <div className="title">
                    <span>邀请发送</span>
                    <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
                      {invitation_sent_amount}
                    </h1>
                    <h6 style={{ fontSize: "0.6rem" }}>{`上季度: ${0}`}</h6>
                  </div>
                </div>
                <div className="col">
                  <div className="title">
                    <span>销售额</span>
                    <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
                      {sale_amount}
                    </h1>
                    <h6 style={{ fontSize: "0.6rem" }}>{`上季度: ${0}`}</h6>
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
                          style={{ width: `${pc_page_view/sum*100}%` }}
                          aria-valuenow="0"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {`${pc_page_view/sum*100}%`}
                        </div>
                      </div>
                      <div className="progress">
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          style={{ width: `${wx_page_view/sum*100}%` }}
                          aria-valuenow="0"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {`${wx_page_view/sum*100}%`}
                        </div>
                      </div>
                    </td>
                    <td>{`${wx_page_view + pc_page_view}(${wx_page_view + pc_page_view/sum*100}%)`}</td>
                  </tr>
                  <tr>
                    <th scope="row">潜在用户(报名公测)</th>
                    <td>
                      <div className="progress">
                        <div
                          className="progress-bar bg-warning"
                          style={{ width: `${potential_user_amount/sum*100}%` }}
                          role="progressbar"
                          aria-valuenow="0"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {`${potential_user_amount/sum*100}%`}
                        </div>
                      </div>
                    </td>
                    <td>{`${potential_user_amount}(${potential_user_amount/sum*100}%)`}</td>
                  </tr>
                  <tr>
                    <th scope="row">新用户(已登录,创建职位)</th>
                    <td>
                      <div className="progress">
                        <div
                          className="progress-bar bg-danger"
                          style={{ width: `${new_user_amount/sum*100}%` }}
                          role="progressbar"
                          aria-valuenow="0"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {`${new_user_amount/sum*100}%`}
                        </div>
                      </div>
                    </td>
                    <td>{`${new_user_amount}(${new_user_amount/sum*100}%)`}</td>
                  </tr>
                  <tr>
                    <th scope="row">真实用户(发送测试邀请)</th>
                    <td>
                      <div className="progress">
                        <div
                          className="progress-bar bg-success"
                          style={{ width: `${real_user_amount/sum*100}%` }}
                          role="progressbar"
                          aria-valuenow="0"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {`${real_user_amount/sum*100}%`}
                        </div>
                      </div>
                    </td>
                    <td>{`${real_user_amount}(${real_user_amount/sum*100}%)`}</td>
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
