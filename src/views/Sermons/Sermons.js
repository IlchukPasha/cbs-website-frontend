import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import moment from 'moment';

class Sermons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      perPage: 10,
      sermons: [],
      total: 0
    };

    this.getData = this.getData.bind(this);
    this.btnClick = this.btnClick.bind(this);
  }

  async getData() {
    let data = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/sermons?page=${this.state.page}&perPage=${this.state.perPage}`, {
      method: 'GET',
      headers: {
        'x-api-token': window.localStorage.getItem('jwt'),
        'Content-Type': 'application/json'
      }
    });
    data = await data.json();
    this.setState({ sermons: data.results, total: data.total });
  }

  btnClick(event) {
    this.setState({ page: +event.currentTarget.value }, this.getData);
  }

  componentDidMount() {
    this.getData();
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  render() {
    const sermonList = this.state.sermons && this.state.sermons.map((item) =>
      <tr key={item.id}>
        <td>{item.title}</td>
        <td>{item.subject}</td>
        <td>{item.speaker}</td>
        <td>{item.text.substr(0, 50)}...</td>
        <td>{moment(item.date).format('YYYY-MM-DD')}</td>
      </tr>
    );

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
    const paginations = <Pagination>
      {/*<PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>*/}
      {paginationItems}
      {/*<PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>*/}
    </Pagination>;

    return (
      <div className="animated fadeIn">
        <Link to="/sermon-form" className="nav-link">Створити проповідь</Link>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-users"></i> Проповіді
              </CardHeader>
              <CardBody>
                <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Назва</th>
                    <th>Тема</th>
                    <th>Проповідник</th>
                    <th>Проповідь</th>
                    <th>Дата</th>
                  </tr>
                  </thead>
                  <tbody>
                  {sermonList}
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

export default Sermons;
