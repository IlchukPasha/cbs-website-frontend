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

class SermonForm extends Component {
  constructor(props) {
    super(props);

    // this.toggle = this.toggle.bind(this);
    // this.toggleFade = this.toggleFade.bind(this);
    // this.state = {
    //   collapse: true,
    //   fadeIn: true,
    //   timeout: 300
    // };

    this.createSermon = this.createSermon.bind(this);
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

  async createSermon(data) {
    fetch(`/api/admin/sermons`, {
      method: 'POST',
      headers: {
        'x-api-token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJBZG1pbiBGaXJzdCBOYW1lIn0sImlhdCI6MTU2NTcwMjU1MSwiZXhwIjoxNTcwODg2NTUxfQ.33C6P_5KwPiYFoYfMRu9os-jcA4dvkWYdEL60EnspiY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      console.log('res.status ', res.status);
      if (res.status === 201) {
        window.location.href = '#/base/forms';
      }
    });
  }

  submitCreateBtn(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    this.createSermon({
      title: data.get('title'),
      subject: data.get('subject'),
      speaker: data.get('speaker'),
      text: data.get('sermon-text'),
      date: data.get('date')
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="8">
            <Card>
              <CardHeader>
                <strong>Створити проповідь</strong>
              </CardHeader>
              <CardBody>
                <Form className="form-horizontal" onSubmit={this.submitCreateBtn}>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Назва</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="title-input" name="title" placeholder="Text"/>
                      {/*<FormText color="muted">This is a help text</FormText>*/}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Тема</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="subject-input" name="subject" placeholder="Text"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Проповідник</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="speaker-input" name="speaker" placeholder="Text"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="date-input">Дата</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="date" id="date-input" name="date" placeholder="date"/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Проповідь</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" name="sermon-text" id="textarea-sermon-text" rows="9"
                             placeholder="Content..."/>
                    </Col>
                  </FormGroup>
                  <Button size="sm" color="primary">
                    {/*<i className="fa fa-dot-circle-o"></i>*/}
                    Створити
                  </Button>
                </Form>
              </CardBody>
              <CardFooter>
                <Button size="sm" color="primary">
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

export default SermonForm;
