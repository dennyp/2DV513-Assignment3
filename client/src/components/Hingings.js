import React, { Fragment } from 'react'
import { Col, Dropdown } from 'react-bootstrap'

const Hingings = props => {
  const onSelectHingeHandler = (eventKey, event) => {
    const hingingName = event.target.textContent
    props.onHingeSelect(hingingName, eventKey)
  }

  const onSelectHandleHandler = (eventKey, event) => {
    const handleName = event.target.textContent
    props.onHandleSelect(handleName, eventKey)
  }

  return (
    <Fragment>
      <Col>
        <Dropdown>
          <Dropdown.Toggle variant='success' id='dropdown-basic'>
            {props.selectedHinge}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {props.hingings.map(hinging => {
              if (hinging.Type === 1) {
                return (
                  <Dropdown.Item
                    key={hinging.HingingId}
                    eventKey={hinging.HingingId}
                    onSelect={onSelectHingeHandler}
                  >
                    {hinging.Name}
                  </Dropdown.Item>
                )
              }
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
      <Col>
        <Dropdown>
          <Dropdown.Toggle variant='success' id='dropdown-basic'>
            {props.selectedHandle}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {props.hingings.map(hinging => {
              if (hinging.Type === 11) {
                return (
                  <Dropdown.Item
                    key={hinging.HingingId}
                    eventKey={hinging.HingingId}
                    onSelect={onSelectHandleHandler}
                  >
                    {hinging.Name}
                  </Dropdown.Item>
                )
              }
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Fragment>
  )
}

export default Hingings
