import React from 'react'
import { Modal } from 'semantic-ui-react'
Modal

export  function BasicModal(props) {

    const { show, close, title, size, children} = props

  return (
    <Modal closeIcon open={show} onClose={close} size={size}>
        {title && <Modal.Header>{title}</Modal.Header>}
        <Modal.Content>{children}</Modal.Content>      
    </Modal>
  )
}


