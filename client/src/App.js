import React, { Component, Fragment } from 'react'
import {
  Button,
  Dropdown,
  Row,
  Col,
  ListGroup,
  Container,
  InputGroup,
  FormControl,
  Form
} from 'react-bootstrap'
import './App.css'
import axios from 'axios'
import WindowModels from './components/WindowModels'
import Glass from './components/Glass'
import Hingings from './components/Hingings'

class App extends Component {
  state = {
    models: [],
    numberOfModels: 0,
    selectedModel: 'Choose Model',
    selectedGlass: 'Choose Glass',
    selectedHinge: 'Choose Hinge',
    selectedHandle: 'Choose Handle',
    selectedModelId: 0,
    selectedGlassId: 0,
    selectedHingeId: 0,
    selectedHandleId: 0,
    selectedGlassGroup: 0,
    selectedHingingGroup: 0,
    selectedSizeGroup: 0,
    glass: [],
    hingings: [],
    showItems: false,
    priceList: 1,
    basePrice: 0,
    glassPrice: 0,
    hingePrice: 0,
    handlePrice: 0,
    hingingType: 0,
    width: 0,
    height: 0
  }

  componentDidMount () {
    this.countModels()
    this.getModels()
  }

  resetSelectedStates () {
    this.setState({ selectedGlass: 'Choose Glass' })
    this.setState({ selectedGlassId: 0 })
    this.setState({ selectedHinge: 'Choose Hinge' })
    this.setState({ selectedHingeId: 0 })
    this.setState({ selectedHandle: 'Choose Handle' })
    this.setState({ selectedHandleId: 0 })
    this.setState({ glassPrice: 0 })
    this.setState({ hingePrice: 0 })
    this.setState({ handlePrice: 0 })
  }

  async getModels () {
    try {
      const res = await axios.get('/api/getModels')
      this.setState({ models: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  onModelSelect = (model, modelId) => {
    this.setState({ selectedModel: model })
    this.setState({ selectedModelId: parseInt(modelId) })

    this.resetSelectedStates()

    const filteredModelWithData = this.state.models.filter(model => {
      return model.ModelId == modelId
    })[0]

    this.setState({ selectedGlassGroup: filteredModelWithData.GlassGroupId })
    this.setState({
      selectedHingingGroup: filteredModelWithData.HingingGroupId
    })
    this.setState({ selectedSizeGroup: filteredModelWithData.SizeGroupId })

    this.getGlass(filteredModelWithData.GlassGroupId)
    this.setState({ showItems: true })

    this.getHingings(filteredModelWithData.HingingGroupId)
  }

  async getGlass (glassGroupId) {
    try {
      const res = await axios.get(`/api/getGlass/group/${glassGroupId}`)
      this.setState({ glass: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  onGlassSelect = (glassName, glassId) => {
    this.setState({ selectedGlass: glassName })
    this.setState({ selectedGlassId: glassId })
    this.getGlassPrice(glassId)
  }

  onHingeSelect = (hingingName, hingingId) => {
    this.setState({ selectedHinge: hingingName })
    this.setState({ selectedHingeId: hingingId })
    this.getHingingPrice(hingingId)
  }

  onHandleSelect = (hingingName, hingingId) => {
    this.setState({ selectedHandle: hingingName })
    this.setState({ selectedHandleId: hingingId })
    this.getHingingPrice(hingingId)
  }

  async getHingings (hingingsGroupId) {
    try {
      const res = await axios.get(`/api/getHingings/group/${hingingsGroupId}`)
      this.setState({ hingings: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  async countModels () {
    try {
      const res = await axios.get('/api/getModels/count')
      this.setState({ numberOfModels: res.data[0].COUNT })
    } catch (err) {
      console.log(err)
    }
  }

  async getGlassPrice (glassId) {
    const res = await axios.get(
      `/api/getPrice/glass/${glassId}/${this.state.priceList}`
    )
    this.setState({ glassPrice: res.data[0].Price })
  }

  async getHingingPrice (hingingId) {
    const hinge = this.state.hingings.filter(hinging => {
      return hinging.HingingId == hingingId
    })
    this.setState({ hingingType: hinge[0].Type })

    const res = await axios.get(
      `/api/getPrice/hinging/${hingingId}/${this.state.priceList}`
    )

    if (this.state.hingingType === 1) {
      this.setState({ hingePrice: res.data[0].Price })
    } else if (this.state.hingingType === 11) {
      this.setState({ handlePrice: res.data[0].Price })
    }
  }

  onWidthChange = event => {
    console.log(event.target.value)
    this.setState({ width: event.target.value })
  }

  onHeightChange = event => {
    this.setState({ height: event.target.value })
  }

  checkDimensionAndSaveRow = event => {
    this.checkDimensionsInDatabase()
  }

  async checkDimensionsInDatabase () {
    const res = await axios.get('/api/validateDimensions')
  }

  async calculateBasePrice () {
    const res = await axios.get(
      `/api/getPrice/model/${parseInt(this.state.selectedModelId)}/${
        this.state.priceList
      }/${parseInt(this.state.width)}/${parseInt(this.state.height)}`
    )
  }

  render () {
    return (
      <Fragment>
        <Container>
          <Row>
            <Col>
              <h5>
                Number of models in database queried from view:{' '}
                {this.state.numberOfModels}
              </h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <WindowModels
                models={this.state.models}
                selectedModel={this.state.selectedModel}
                onModelSelect={this.onModelSelect}
              />
            </Col>
            <Col>
              {this.state.showItems && (
                <Glass
                  glass={this.state.glass}
                  selectedGlass={this.state.selectedGlass}
                  onGlassSelect={this.onGlassSelect}
                />
              )}
            </Col>
            {this.state.showItems && (
              <Hingings
                hingings={this.state.hingings}
                selectedHinge={this.state.selectedHinge}
                selectedHandle={this.state.selectedHandle}
                onHingeSelect={this.onHingeSelect}
                onHandleSelect={this.onHandleSelect}
              />
            )}
          </Row>
          {this.state.showItems && (
            <Row>
              <Col>
                <Form>
                  <Form.Group controlId='formTitle'>
                    <Form.Label>Width</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Width'
                      autoFocus
                      onChange={this.onWidthChange}
                    />
                  </Form.Group>
                  <Form.Group controlId='formText'>
                    <Form.Label>Height</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Height'
                      onChange={this.onHeightChange}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          )}
          <Row>
            <Col>
              <ListGroup>
                <ListGroup.Item>
                  Base price: {this.state.basePrice} kr
                </ListGroup.Item>
                <ListGroup.Item>
                  Glass price: {this.state.glassPrice} kr
                </ListGroup.Item>
                <ListGroup.Item>
                  Hinge price: {this.state.hingePrice} kr
                </ListGroup.Item>
                <ListGroup.Item>
                  Handle price: {this.state.handlePrice} kr
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={this.calculateBasePrice}>
                Calculate base price
              </Button>
            </Col>
            <Col>
              <Button onClick={this.checkDimensionAndSaveRow}>Save row</Button>
            </Col>
            <Col>
              <Button>Send order</Button>
            </Col>
          </Row>
        </Container>
      </Fragment>
    )
  }
}

export default App
