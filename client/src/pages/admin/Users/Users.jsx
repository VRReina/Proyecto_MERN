import React, { useState } from 'react'
import { Tab , Button } from 'semantic-ui-react'
import { BasicModal } from '../../../components/shared'
import { UserForm, ListUser } from '../../../components/Admin/Users'
import "./Users.scss"


export  function Users() {

const [showModal, setShowModal] = useState(false)
const [reload, setReload] = useState(false)

const  onOpenCloseModal = () => setShowModal((prevState) => !prevState)
const  onReload = () => setReload((prevState) => !prevState)

const panes = [
  {
  menuItem: "usuario activos",
  render: () => (
    <Tab.Pane attached={false}>
      <ListUser usersActive={true} reload={reload} onReload={onReload}/>
    </Tab.Pane>
  )
},
{
  menuItem: "usuario inactivos",
  render: () => (
    <Tab.Pane attached={false}>
      <ListUser usersActive={false} reload={reload} onReload={onReload}/>
    </Tab.Pane>
  )
},
]
  return (
    <> 
    <div className='users-page'>
      <Button className='users-page__add' primary onClick={onOpenCloseModal }>
        nuevo usuario
      </Button>
      <Tab menu={{secondary: true}} panes={panes} />
    </div>

    <BasicModal show={showModal} close={onOpenCloseModal} title=" crear nuevo usuario">
      <UserForm close={onOpenCloseModal}  onReload={onReload} />
    </BasicModal>

    </>
  )
}
