import React, { Component } from 'react';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table
} from 'reactstrap';
import axios from 'axios';


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
  //       'x-api-token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJBZG1pbiBGaXJzdCBOYW1lIn0sImlhdCI6MTU2NTcwMjU1MSwiZXhwIjoxNTcwODg2NTUxfQ.33C6P_5KwPiYFoYfMRu9os-jcA4dvkWYdEL60EnspiY',
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
    console.log('this.state.page2 ', this.state.page);
    let data = await fetch(`/api/admin/users?page=${this.state.page}&perPage=${this.state.perPage}`, {
      method: 'GET',
      headers: {
        'x-api-token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJBZG1pbiBGaXJzdCBOYW1lIn0sImlhdCI6MTU2NTcwMjU1MSwiZXhwIjoxNTcwODg2NTUxfQ.33C6P_5KwPiYFoYfMRu9os-jcA4dvkWYdEL60EnspiY',
        'Content-Type': 'application/json'
      }
    });
    data = await data.json();
    this.setState({ users: data.results, total: data.total });
  }

  btnClick(event) {
    console.log(+event.currentTarget.value);
    // this.setState({ page: +event.currentTarget.value });
    this.state.page = +event.currentTarget.value;
    console.log('this.state.page1 ', this.state.page);
    this.getData();
  }

  componentDidMount() {
    this.getData();
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  render() {
    const userList = this.state.users.map((item) =>
      <tr key={item.id}>
        <td>{item.firstName}</td>
        <td>{item.lastName}</td>
        <td>{item.email}</td>
        <td>{item.createdAt}</td>
        <td>{item.role}</td>
      </tr>
    );

    const totalPages = Math.ceil(this.state.total / this.state.perPage);
    const paginationItems2 = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === this.state.page) {
        paginationItems2.push(
          <PaginationItem active onClick={this.btnClick} value={i}>
            <PaginationLink tag="button">{i}</PaginationLink>
          </PaginationItem>
        );
      } else {
        paginationItems2.push(
          <PaginationItem onClick={this.btnClick} value={i}>
            <PaginationLink tag="button">{i}</PaginationLink>
          </PaginationItem>
        );
      }
    }
    const paginationItems = <Pagination>
      {/*<PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>*/}
      {paginationItems2}
      {/*<PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>*/}
    </Pagination>;

    return (
      <div className="animated fadeIn">
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
                  {userList}
                  </tbody>
                </Table>
                {paginationItems}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
