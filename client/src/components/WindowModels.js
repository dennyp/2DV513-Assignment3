import React, { Fragment } from 'react'
import { Dropdown } from 'react-bootstrap'

const WindowModels = props => {
  const onSelectHandler = (eventKey, event) => {
    const modelName = event.target.textContent
    props.onModelSelect(modelName, eventKey)
  }

  return (
    <Fragment>
      <Dropdown>
        <Dropdown.Toggle variant='success' id='dropdown-basic'>
          {props.selectedModel}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {props.models.map(model => {
            return (
              <Dropdown.Item
                key={model.ModelId}
                eventKey={model.ModelId}
                onSelect={onSelectHandler}
              >
                {model.Name}
              </Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>
    </Fragment>
  )
}

export default WindowModels
