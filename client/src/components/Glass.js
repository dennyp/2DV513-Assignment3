import React, { Fragment } from 'react'
import { Dropdown } from 'react-bootstrap'

const Glass = props => {
  const onSelectHandler = (eventKey, event) => {
    const glassName = event.target.textContent
    props.onGlassSelect(glassName, eventKey)
  }

  return (
    <Fragment>
      <Dropdown>
        <Dropdown.Toggle variant='success' id='dropdown-basic'>
          {props.selectedGlass}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {props.glass.map(glass => {
            return (
              <Dropdown.Item
                key={glass.GlassId}
                eventKey={glass.GlassId}
                onSelect={onSelectHandler}
              >
                {glass.Name}
              </Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>
    </Fragment>
  )
}

export default Glass
