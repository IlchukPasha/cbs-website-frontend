import React, { Component } from "react";
import RichTextEditor from "react-rte";
import {
  // Badge,
  Button,
  Card,
  CardBody,
  // CardFooter,
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

class SermonForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      subject: "",
      speaker: "",
      text: RichTextEditor.createEmptyValue(),
      date: null,
      errors: {
        title: "Назва мусить бути мінімум 3, максимум 50 символів!",
        subject: "Тема мусить бути мінімум 3, максимум 50 символів!",
        speaker: "Проповідник мусить бути мінімум 3, максимум 50 символів!",
        text: "Текст мусить бути мінімум 10, максимум 30000 символів!",
        date: "Невалідна дата!"
      },
      createBtnDisabled: true
    };

    this.createSermon = this.createSermon.bind(this);
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
      case "subject":
        errors.subject =
          value.length < 3 || value.length > 50
            ? "Тема мусить бути мінімум 3, максимум 50 символів!"
            : "";
        break;
      case "speaker":
        errors.speaker =
          value.length < 3 || value.length > 50
            ? "Проповідник мусить бути мінімум 3, максимум 50 символів!"
            : "";
        break;
      case "date":
        errors.date = validDateRegex.test(value) ? "" : "Невалідна дата!";
        break;
      default:
        break;
    }

    createBtnDisabled = !(
      errors.title.length === 0 &&
      errors.subject.length === 0 &&
      errors.speaker.length === 0 &&
      errors.text.length === 0 &&
      errors.date.length === 0
    );

    this.setState({ errors, createBtnDisabled, [name]: value });
  };

  handleTextChange = value => {
    let errors = this.state.errors;
    let createBtnDisabled = this.state.createBtnDisabled;
    const valueConverted = value.toString('markdown');

    errors.text =
      valueConverted.length < 10 || valueConverted.length > 30000
        ? "Текст мусить бути мінімум 10, максимум 30000 символів!"
        : "";

    createBtnDisabled = !(
      errors.title.length === 0 &&
      errors.subject.length === 0 &&
      errors.speaker.length === 0 &&
      errors.text.length === 0 &&
      errors.date.length === 0
    );

    this.setState({ errors, createBtnDisabled, text: value });
  };

  async createSermon(data) {
    fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/admin/sermons`, {
      method: "POST",
      headers: {
        "x-api-token": window.localStorage.getItem("jwt"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => {
      if (res.status === 201) {
        window.location.href = "#/sermons";
      }
    });
  }

  submitCreateBtn(event) {
    event.preventDefault();
    const { title, subject, speaker, text, date } = this.state;
    this.createSermon({
      title,
      subject,
      speaker,
      text: text.toString("html"),
      date
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
                <Form
                  className="form-horizontal"
                  onSubmit={this.submitCreateBtn}
                >
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Назва</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="title-input"
                        name="title"
                        placeholder="Текст"
                        onChange={this.handleChange}
                      />
                      <FormText color="red">{this.state.errors.title}</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Тема</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="subject-input"
                        name="subject"
                        placeholder="Текст"
                        onChange={this.handleChange}
                      />
                      <FormText color="red">
                        {this.state.errors.subject}
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Проповідник</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="speaker-input"
                        name="speaker"
                        placeholder="Текст"
                        onChange={this.handleChange}
                      />
                      <FormText color="red">
                        {this.state.errors.speaker}
                      </FormText>
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
                      <FormText color="red">{this.state.errors.date}</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Проповідь</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <RichTextEditor
                        value={this.state.text}
                        onChange={this.handleTextChange}
                      />
                      <FormText color="red">{this.state.errors.text}</FormText>
                      {/* <Input type="textarea" name="sermon-text" id="textarea-sermon-text" rows="9"
                             placeholder="Content..."/> */}
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

export default SermonForm;
