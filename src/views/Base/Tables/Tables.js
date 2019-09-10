import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import moment from 'moment';

class Tables extends Component {
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
        'x-api-token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJBZG1pbiBGaXJzdCBOYW1lIn0sImlhdCI6MTU2NTcwMjU1MSwiZXhwIjoxNTcwODg2NTUxfQ.33C6P_5KwPiYFoYfMRu9os-jcA4dvkWYdEL60EnspiY',
        'Content-Type': 'application/json'
      }
    });
    data = await data.json();
    this.setState({ events: data.results, total: data.total });
  }

  btnClick(event) {
    // this.setState({ page: +event.currentTarget.value });
    this.state.page = +event.currentTarget.value;
    this.getData();
  }

  componentDidMount() {
    this.getData();
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  render() {

    const eventList = this.state.events.map((item) =>
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
          <PaginationItem active onClick={this.btnClick} value={i}>
            <PaginationLink tag="button">{i}</PaginationLink>
          </PaginationItem>
        );
      } else {
        paginationItems.push(
          <PaginationItem onClick={this.btnClick} value={i}>
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
        {/*<Row>*/}
          {/*<Col xs="12" lg="6">*/}
            {/*<Card>*/}
              {/*<CardHeader>*/}
                {/*<i className="fa fa-align-justify"></i> Simple Table*/}
              {/*</CardHeader>*/}
              {/*<CardBody>*/}
                {/*<Table responsive>*/}
                  {/*<thead>*/}
                  {/*<tr>*/}
                    {/*<th>Username</th>*/}
                    {/*<th>Date registered</th>*/}
                    {/*<th>Role</th>*/}
                    {/*<th>Status</th>*/}
                  {/*</tr>*/}
                  {/*</thead>*/}
                  {/*<tbody>*/}
                  {/*<tr>*/}
                    {/*<td>Samppa Nori</td>*/}
                    {/*<td>2012/01/01</td>*/}
                    {/*<td>Member</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="success">Active</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                    {/*<td>Estavan Lykos</td>*/}
                    {/*<td>2012/02/01</td>*/}
                    {/*<td>Staff</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="danger">Banned</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                    {/*<td>Chetan Mohamed</td>*/}
                    {/*<td>2012/02/01</td>*/}
                    {/*<td>Admin</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="secondary">Inactive</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                    {/*<td>Derick Maximinus</td>*/}
                    {/*<td>2012/03/01</td>*/}
                    {/*<td>Member</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="warning">Pending</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                    {/*<td>Friderik Dávid</td>*/}
                    {/*<td>2012/01/21</td>*/}
                    {/*<td>Staff</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="success">Active</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*</tbody>*/}
                {/*</Table>*/}
                {/*<Pagination>*/}
                  {/*<PaginationItem>*/}
                    {/*<PaginationLink previous tag="button"></PaginationLink>*/}
                  {/*</PaginationItem>*/}
                  {/*<PaginationItem active>*/}
                    {/*<PaginationLink tag="button">1</PaginationLink>*/}
                  {/*</PaginationItem>*/}
                  {/*<PaginationItem>*/}
                    {/*<PaginationLink tag="button">2</PaginationLink>*/}
                  {/*</PaginationItem>*/}
                  {/*<PaginationItem>*/}
                    {/*<PaginationLink tag="button">3</PaginationLink>*/}
                  {/*</PaginationItem>*/}
                  {/*<PaginationItem>*/}
                    {/*<PaginationLink tag="button">4</PaginationLink>*/}
                  {/*</PaginationItem>*/}
                  {/*<PaginationItem>*/}
                    {/*<PaginationLink next tag="button"></PaginationLink>*/}
                  {/*</PaginationItem>*/}
                {/*</Pagination>*/}
              {/*</CardBody>*/}
            {/*</Card>*/}
          {/*</Col>*/}

          {/*<Col xs="12" lg="6">*/}
            {/*<Card>*/}
              {/*<CardHeader>*/}
                {/*<i className="fa fa-align-justify"></i> Striped Table*/}
              {/*</CardHeader>*/}
              {/*<CardBody>*/}
                {/*<Table responsive striped>*/}
                  {/*<thead>*/}
                  {/*<tr>*/}
                    {/*<th>Username</th>*/}
                    {/*<th>Date registered</th>*/}
                    {/*<th>Role</th>*/}
                    {/*<th>Status</th>*/}
                  {/*</tr>*/}
                  {/*</thead>*/}
                  {/*<tbody>*/}
                  {/*<tr>*/}
                    {/*<td>Yiorgos Avraamu</td>*/}
                    {/*<td>2012/01/01</td>*/}
                    {/*<td>Member</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="success">Active</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                    {/*<td>Avram Tarasios</td>*/}
                    {/*<td>2012/02/01</td>*/}
                    {/*<td>Staff</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="danger">Banned</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                    {/*<td>Quintin Ed</td>*/}
                    {/*<td>2012/02/01</td>*/}
                    {/*<td>Admin</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="secondary">Inactive</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                    {/*<td>Enéas Kwadwo</td>*/}
                    {/*<td>2012/03/01</td>*/}
                    {/*<td>Member</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="warning">Pending</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                    {/*<td>Agapetus Tadeáš</td>*/}
                    {/*<td>2012/01/21</td>*/}
                    {/*<td>Staff</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="success">Active</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*</tbody>*/}
                {/*</Table>*/}
                {/*<Pagination>*/}
                  {/*<PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>*/}
                  {/*<PaginationItem active>*/}
                    {/*<PaginationLink tag="button">1</PaginationLink>*/}
                  {/*</PaginationItem>*/}
                  {/*<PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>*/}
                  {/*<PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>*/}
                  {/*<PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>*/}
                  {/*<PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>*/}
                {/*</Pagination>*/}
              {/*</CardBody>*/}
            {/*</Card>*/}
          {/*</Col>*/}
        {/*</Row>*/}

        {/*<Row>*/}

          {/*<Col xs="12" lg="6">*/}
            {/*<Card>*/}
              {/*<CardHeader>*/}
                {/*<i className="fa fa-align-justify"></i> Condensed Table*/}
              {/*</CardHeader>*/}
              {/*<CardBody>*/}
                {/*<Table responsive size="sm">*/}
                  {/*<thead>*/}
                  {/*<tr>*/}
                    {/*<th>Username</th>*/}
                    {/*<th>Date registered</th>*/}
                    {/*<th>Role</th>*/}
                    {/*<th>Status</th>*/}
                  {/*</tr>*/}
                  {/*</thead>*/}
                  {/*<tbody>*/}
                  {/*<tr>*/}
                    {/*<td>Carwyn Fachtna</td>*/}
                    {/*<td>2012/01/01</td>*/}
                    {/*<td>Member</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="success">Active</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                    {/*<td>Nehemiah Tatius</td>*/}
                    {/*<td>2012/02/01</td>*/}
                    {/*<td>Staff</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="danger">Banned</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                    {/*<td>Ebbe Gemariah</td>*/}
                    {/*<td>2012/02/01</td>*/}
                    {/*<td>Admin</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="secondary">Inactive</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                    {/*<td>Eustorgios Amulius</td>*/}
                    {/*<td>2012/03/01</td>*/}
                    {/*<td>Member</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="warning">Pending</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                    {/*<td>Leopold Gáspár</td>*/}
                    {/*<td>2012/01/21</td>*/}
                    {/*<td>Staff</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="success">Active</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*</tbody>*/}
                {/*</Table>*/}
                {/*<Pagination>*/}
                  {/*<PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>*/}
                  {/*<PaginationItem active>*/}
                    {/*<PaginationLink tag="button">1</PaginationLink>*/}
                  {/*</PaginationItem>*/}
                  {/*<PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>*/}
                  {/*<PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>*/}
                  {/*<PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>*/}
                  {/*<PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>*/}
                {/*</Pagination>*/}
              {/*</CardBody>*/}
            {/*</Card>*/}
          {/*</Col>*/}

          {/*<Col xs="12" lg="6">*/}
            {/*<Card>*/}
              {/*<CardHeader>*/}
                {/*<i className="fa fa-align-justify"></i> Bordered Table*/}
              {/*</CardHeader>*/}
              {/*<CardBody>*/}
                {/*<Table responsive bordered>*/}
                  {/*<thead>*/}
                  {/*<tr>*/}
                    {/*<th>Username</th>*/}
                    {/*<th>Date registered</th>*/}
                    {/*<th>Role</th>*/}
                    {/*<th>Status</th>*/}
                  {/*</tr>*/}
                  {/*</thead>*/}
                  {/*<tbody>*/}
                  {/*<tr>*/}
                    {/*<td>Pompeius René</td>*/}
                    {/*<td>2012/01/01</td>*/}
                    {/*<td>Member</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="success">Active</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                    {/*<td>Paĉjo Jadon</td>*/}
                    {/*<td>2012/02/01</td>*/}
                    {/*<td>Staff</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="danger">Banned</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                    {/*<td>Micheal Mercurius</td>*/}
                    {/*<td>2012/02/01</td>*/}
                    {/*<td>Admin</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="secondary">Inactive</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                    {/*<td>Ganesha Dubhghall</td>*/}
                    {/*<td>2012/03/01</td>*/}
                    {/*<td>Member</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="warning">Pending</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                    {/*<td>Hiroto Šimun</td>*/}
                    {/*<td>2012/01/21</td>*/}
                    {/*<td>Staff</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="success">Active</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*</tbody>*/}
                {/*</Table>*/}
                {/*<Pagination>*/}
                  {/*<PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>*/}
                  {/*<PaginationItem active>*/}
                    {/*<PaginationLink tag="button">1</PaginationLink>*/}
                  {/*</PaginationItem>*/}
                  {/*<PaginationItem className="page-item"><PaginationLink tag="button">2</PaginationLink></PaginationItem>*/}
                  {/*<PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>*/}
                  {/*<PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>*/}
                  {/*<PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>*/}
                {/*</Pagination>*/}
              {/*</CardBody>*/}
            {/*</Card>*/}
          {/*</Col>*/}

        {/*</Row>*/}

        {/*<Row>*/}
          {/*<Col>*/}
            {/*<Card>*/}
              {/*<CardHeader>*/}
                {/*<i className="fa fa-align-justify"></i> Combined All Table*/}
              {/*</CardHeader>*/}
              {/*<CardBody>*/}
                {/*<Table hover bordered striped responsive size="sm">*/}
                  {/*<thead>*/}
                  {/*<tr>*/}
                    {/*<th>Username</th>*/}
                    {/*<th>Date registered</th>*/}
                    {/*<th>Role</th>*/}
                    {/*<th>Status</th>*/}
                  {/*</tr>*/}
                  {/*</thead>*/}
                  {/*<tbody>*/}
                  {/*<tr>*/}
                    {/*<td>Vishnu Serghei</td>*/}
                    {/*<td>2012/01/01</td>*/}
                    {/*<td>Member</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="success">Active</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                    {/*<td>Zbyněk Phoibos</td>*/}
                    {/*<td>2012/02/01</td>*/}
                    {/*<td>Staff</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="danger">Banned</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                    {/*<td>Einar Randall</td>*/}
                    {/*<td>2012/02/01</td>*/}
                    {/*<td>Admin</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="secondary">Inactive</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                    {/*<td>Félix Troels</td>*/}
                    {/*<td>2012/03/01</td>*/}
                    {/*<td>Member</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="warning">Pending</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*<tr>*/}
                    {/*<td>Aulus Agmundr</td>*/}
                    {/*<td>2012/01/21</td>*/}
                    {/*<td>Staff</td>*/}
                    {/*<td>*/}
                      {/*<Badge color="success">Active</Badge>*/}
                    {/*</td>*/}
                  {/*</tr>*/}
                  {/*</tbody>*/}
                {/*</Table>*/}
                {/*<nav>*/}
                  {/*<Pagination>*/}
                    {/*<PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>*/}
                    {/*<PaginationItem active>*/}
                      {/*<PaginationLink tag="button">1</PaginationLink>*/}
                    {/*</PaginationItem>*/}
                    {/*<PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>*/}
                    {/*<PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>*/}
                    {/*<PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>*/}
                    {/*<PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>*/}
                  {/*</Pagination>*/}
                {/*</nav>*/}
              {/*</CardBody>*/}
            {/*</Card>*/}
          {/*</Col>*/}
        {/*</Row>*/}
      </div>

    );
  }
}

export default Tables;
