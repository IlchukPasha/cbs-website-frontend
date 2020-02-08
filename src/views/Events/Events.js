import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import moment from 'moment';

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      perPage: 5,
      events: [],
      total: 0
    };

    this.getData = this.getData.bind(this);
    this.btnClick = this.btnClick.bind(this);
  }

  async getData() {
    let data = await fetch(`/api/admin/events?page=${this.state.page}&perPage=${this.state.perPage}`, {
      method: 'GET',
      headers: {
        'x-api-token': window.localStorage.getItem('jwt'),
        'Content-Type': 'application/json'
      }
    });
    data = await data.json();
    this.setState({ events: data.results, total: data.total });
  }

  btnClick(event) {
    this.setState({ page: +event.currentTarget.value }, this.getData);
  }

  componentDidMount() {
    this.getData();
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  render() {

    const eventList = this.state.events && this.state.events.map((item) =>
      <tr key={item.id}>
        <td>{item.title}</td>
        <td>{item.address}</td>
        <td>{item.shortDescription}</td>
        <td>
          {moment(item.date).format('YYYY-MM-DD')} {moment(item.startedAt, 'HH:mm:ss').format('HH:mm')}-{moment(item.finishedAt, 'HH:mm:ss').format('HH:mm')}
        </td>
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
        <Link to="/event-form" className="nav-link">Створити подію</Link>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-users"></i> Події
              </CardHeader>
              <CardBody>
                <Table responsive bordered>
                  <thead>
                  <tr>
                    <th>Назва</th>
                    <th>Адреса</th>
                    <th>Короткий опис</th>
                    <th>Дата</th>
                  </tr>
                  </thead>
                  <tbody>
                  {eventList}
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

export default Events;
