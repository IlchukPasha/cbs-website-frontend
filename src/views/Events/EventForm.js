import React, { Component } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import moment from 'moment';

class EventForm extends Component {
  constructor(props) {
    super(props);

    // this.toggle = this.toggle.bind(this);
    // this.toggleFade = this.toggleFade.bind(this);
    // this.state = {
    //   collapse: true,
    //   fadeIn: true,
    //   timeout: 300
    // };

    this.createEvent = this.createEvent.bind(this);
    this.submitCreateBtn = this.submitCreateBtn.bind(this);
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  // toggle() {
  //   this.setState({ collapse: !this.state.collapse });
  // }
  //
  // toggleFade() {
  //   this.setState((prevState) => { return { fadeIn: !prevState }});
  // }

  async createEvent(data) {
    fetch(`/api/admin/events`, {
      method: 'POST',
      headers: {
        'x-api-token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJBZG1pbiBGaXJzdCBOYW1lIn0sImlhdCI6MTU2NTcwMjU1MSwiZXhwIjoxNTcwODg2NTUxfQ.33C6P_5KwPiYFoYfMRu9os-jcA4dvkWYdEL60EnspiY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      console.log('res.status ', res.status);
      if (res.status === 201) {
        window.location.href = '#/base/tables';
      }
    });
  }

  submitCreateBtn(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    this.createEvent({
      title: data.get('title'),
      address: data.get('address'),
      shortDescription: data.get('shortDescription'),
      description: data.get('description'),
      date: data.get('date'),
      startedAt: data.get('startedAt'),
      finishedAt: data.get('finishedAt')
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="8">
            <Card>
              <CardHeader>
                <strong>Створити подію</strong>
              </CardHeader>
              <CardBody>
                <Form className="form-horizontal" onSubmit={this.submitCreateBtn}>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="title-input">Назва</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="title-input" name="title" placeholder="Text" />
                      {/*<FormText color="muted">This is a help text</FormText>*/}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="address-input">Адреса</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="address-input" name="address" placeholder="Text" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="date-input">Дата</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="date" id="date-input" name="date" placeholder="date" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="startedAt-input">Час початку</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="time" id="startedAt-input" name="startedAt" placeholder="time" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="finishedAt-input">Час закінчення</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="time" id="finishedAt-input" name="finishedAt" placeholder="time" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="shortDescription-input">Короткий опис</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="shortDescription-input" name="shortDescription" placeholder="Text" />
                      {/*<FormText color="muted">This is a help text</FormText>*/}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="description-textarea-input">Повний опис</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" name="description" id="description-textarea-input" rows="9"
                             placeholder="Content..." />
                    </Col>
                  </FormGroup>
                  <Button size="sm" color="primary">
                    {/*<i className="fa fa-dot-circle-o"></i>*/}
                    Створити
                  </Button>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary">
                  {/*<i className="fa fa-dot-circle-o"></i>*/}
                  Створити
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EventForm;
