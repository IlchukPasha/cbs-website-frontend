import React, { Component } from "react";
import RichTextEditor from "react-rte";
import {
  // Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  // Collapse,
  // DropdownItem,
  // DropdownMenu,
  // DropdownToggle,
  // Fade,
  Form,
  FormGroup,
  FormText,
  // FormFeedback,
  Input,
  // InputGroup,
  // InputGroupAddon,
  // InputGroupButtonDropdown,
  // InputGroupText,
  Label,
  Row
  // Table,
  // Pagination,
  // PaginationItem,
  // PaginationLink
} from "reactstrap";
// import moment from 'moment';

const validDateRegex = RegExp(/^\d{4}-\d{2}-\d{2}$/);
const validTimeRegex = RegExp(/^\d{2}:\d{2}$/);

class EventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      address: "",
      shortDescription: "",
      description: RichTextEditor.createEmptyValue(),
      date: null,
      startedAt: null,
      finishedAt: null,
      errors: {
        title: "Назва мусить бути мінімум 3, максимум 50 символів!",
        address: "Адреса мусить бути мінімум 3, максимум 150 символів!",
        shortDescription:
          "Короткий опис мусить бути мінімум 5, максимум 150 символів!",
        description:
          "Повний опис мусить бути мінімум 10, максимум 5000 символів!",
        date: "Невалідна дата!",
        startedAt: "Невалідний час!",
        finishedAt: "Невалідний час!"
      },
      createBtnDisabled: true
    };

    this.createEvent = this.createEvent.bind(this);
    this.submitCreateBtn = this.submitCreateBtn.bind(this);
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    let createBtnDisabled = this.state.createBtnDisabled;

    switch (name) {
      case "title":
        const invalid = value.length < 3 || value.length > 50;
        if (invalid) {
          errors.title = "Назва мусить бути мінімум 3, максимум 50 символів!";
        } else {
          errors.title = "";
        }
        break;
      case "address":
        errors.address =
          value.length < 3 || value.length > 150
            ? "Адреса мусить бути мінімум 3, максимум 150 символів!"
            : "";
        break;
      case "shortDescription":
        errors.shortDescription =
          value.length < 5 || value.length > 150
            ? "Короткий опис мусить бути мінімум 5, максимум 150 символів!"
            : "";
        break;
      case "date":
        errors.date = validDateRegex.test(value) ? "" : "Невалідна дата!";
        break;
      case "startedAt":
        errors.startedAt = validTimeRegex.test(value) ? "" : "Невалідний час!";
        break;
      case "finishedAt":
        errors.finishedAt = validTimeRegex.test(value) ? "" : "Невалідний час!";
        break;
      default:
        break;
    }

    createBtnDisabled = !(
      errors.title.length === 0 &&
      errors.address.length === 0 &&
      errors.shortDescription.length === 0 &&
      errors.description.length === 0 &&
      errors.date.length === 0 &&
      errors.startedAt.length === 0 &&
      errors.finishedAt.length === 0
    );

    this.setState({ errors, createBtnDisabled, [name]: value });
  };

  handleDescriptionChange = value => {
    let errors = this.state.errors;
    let createBtnDisabled = this.state.createBtnDisabled;
    const valueConverted = value.toString("markdown");

    errors.description =
      valueConverted.length < 10 || valueConverted.length > 5000
        ? "Повний опис мусить бути мінімум 10, максимум 5000 символів!"
        : "";

    createBtnDisabled = !(
      errors.title.length === 0 &&
      errors.address.length === 0 &&
      errors.shortDescription.length === 0 &&
      errors.description.length === 0 &&
      errors.date.length === 0 &&
      errors.startedAt.length === 0 &&
      errors.finishedAt.length === 0
    );

    this.setState({ errors, createBtnDisabled, description: value });
  };

  async createEvent(data) {
    fetch(`/api/admin/events`, {
      method: "POST",
      headers: {
        "x-api-token": window.localStorage.getItem("jwt"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => {
      console.log("res.status ", res.status);
      if (res.status === 201) {
        window.location.href = "#/events";
      }
    });
  }

  submitCreateBtn(event) {
    event.preventDefault();
    const {
      title,
      address,
      shortDescription,
      description,
      date,
      startedAt,
      finishedAt
    } = this.state;
    this.createEvent({
      title,
      address,
      shortDescription,
      description: description.toString("html"),
      date,
      startedAt,
      finishedAt
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
                <Form
                  className="form-horizontal"
                  onSubmit={this.submitCreateBtn}
                >
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="title-input">Назва</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="title-input"
                        name="title"
                        placeholder="Text"
                        onChange={this.handleChange}
                      />
                      <FormText color="muted">{this.state.errors.title}</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="address-input">Адреса</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="address-input"
                        name="address"
                        placeholder="Text"
                        onChange={this.handleChange}
                      />
                      <FormText color="muted">{this.state.errors.address}</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="date-input">Дата</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="date"
                        id="date-input"
                        name="date"
                        placeholder="date"
                        onChange={this.handleChange}
                      />
                      <FormText color="muted">{this.state.errors.date}</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="startedAt-input">Час початку</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="time"
                        id="startedAt-input"
                        name="startedAt"
                        placeholder="time"
                        onChange={this.handleChange}
                      />
                      <FormText color="muted">{this.state.errors.startedAt}</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="finishedAt-input">Час закінчення</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="time"
                        id="finishedAt-input"
                        name="finishedAt"
                        placeholder="time"
                        onChange={this.handleChange}
                      />
                      <FormText color="muted">{this.state.errors.finishedAt}</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="shortDescription-input">
                        Короткий опис
                      </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="shortDescription-input"
                        name="shortDescription"
                        placeholder="Text"
                        onChange={this.handleChange}
                      />
                      <FormText color="muted">{this.state.errors.shortDescription}</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="description-textarea-input">
                        Повний опис
                      </Label>
                    </Col>
                    <Col xs="12" md="9">
                      <RichTextEditor
                        value={this.state.description}
                        onChange={this.handleDescriptionChange}
                      />
                      <FormText color="muted">{this.state.errors.description}</FormText>
                    </Col>
                  </FormGroup>
                  <Button
                    size="sm"
                    color="primary"
                    disabled={this.state.createBtnDisabled}
                  >
                    {/* <i className="fa fa-dot-circle-o"></i> */}
                    Створити
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EventForm;
