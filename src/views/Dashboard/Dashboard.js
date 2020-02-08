import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import {
  // Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table
} from "reactstrap";
// import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      perPage: 5,
      users: [],
      total: 0
    };

    this.getData = this.getData.bind(this);
    this.btnClick = this.btnClick.bind(this);
  }

  // getData() {
  //   fetch(`/api/admin/users?page=${this.state.page}&perPage=${this.state.perPage}`, {
  //     method: 'GET',
  //     headers: {
  //       'x-api-token': window.localStorage.getItem('jwt'),
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(res => res.json())
  //     .then(data => {
  //       console.log('data ', data);
  //       // if (data.statusCode === 200) {
  //       this.setState({ users: data.results, total: data.total });
  //       // }
  //     })
  //     .catch(error => {
  //       console.log('Error: ', error);
  //     });
  // }

  async getData() {
    let data = await fetch(
      `/api/admin/users?page=${this.state.page}&perPage=${this.state.perPage}`,
      {
        method: "GET",
        headers: {
          "x-api-token": window.localStorage.getItem("jwt"),
          "Content-Type": "application/json"
        }
      }
    );
    data = await data.json();
    this.setState({ users: data.results, total: data.total });
  }

  btnClick(event) {
    // this not work because setState run async https://upmostly.com/tutorials/how-to-use-the-setstate-callback-in-react
    // this.setState({ page: +event.currentTarget.value });
    // this.getData();

    // this.setState((prevState, props) => ({
    //   page: +event.currentTarget.value
    // }));

    this.setState({ page: +event.currentTarget.value }, this.getData);
  }

  componentDidMount() {
    this.getData();
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    const totalPages = Math.ceil(this.state.total / this.state.perPage);
    const paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === this.state.page) {
        paginationItems.push(
          <PaginationItem key={i} active onClick={this.btnClick} value={i}>
            <PaginationLink tag="button">{i}</PaginationLink>
          </PaginationItem>
        );
      } else {
        paginationItems.push(
          <PaginationItem key={i} onClick={this.btnClick} value={i}>
            <PaginationLink tag="button">{i}</PaginationLink>
          </PaginationItem>
        );
      }
    }
    const paginations = (
      <Pagination>
        {/*<PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>*/}
        {paginationItems}
        {/*<PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>*/}
      </Pagination>
    );

    return (
      <div className="animated fadeIn">
        {/*<Link to="/user-form" className="nav-link">Створити користувача</Link>*/}
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-users"></i> Користувачі
              </CardHeader>
              <CardBody>
                <Table responsive bordered>
                  <thead>
                    <tr>
                      <th>Імя</th>
                      <th>Прізвище</th>
                      <th>Емейл</th>
                      <th>Дата створення</th>
                      <th>Роль</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.users &&
                      this.state.users.map(item => (
                        <tr key={item.id}>
                          <td>{item.firstName}</td>
                          <td>{item.lastName}</td>
                          <td>{item.email}</td>
                          <td>{item.createdAt}</td>
                          <td>{item.role}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                {paginations}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
