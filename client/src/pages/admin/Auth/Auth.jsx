import React, { useState}  from  'react'
import { Tab , Grid, GridColumn} from 'semantic-ui-react'
import { iconLogo} from '../../../assets'
import "./Auth.scss"
import {  LoginForm , RegisterForm} from "../../../components/Admin/Auth"


export  function Auth() {
  const [activeIndex, setActiveIndex] = useState(1)
  const openLogin = () => setActiveIndex(0)

  const panes = [
    {
      menuItem: "Entrar",
      render: () =>(
        <Tab.Pane>
          <LoginForm/>
        </Tab.Pane>
      )
    },
    {
      menuItem: "Nuevo Usuario",
      render: () =>(
        <Tab.Pane>
          <RegisterForm  openLogin={openLogin}/>
        </Tab.Pane>
      )
    }
  ]
  return (
    <Grid columns={1}>
      <GridColumn mobile={16} tablet={16} computer={16}>
       <div className='auth'>
       <div>
       <img src='/src/assets/svg/logo.svg' className='logo'/>
       </div>
       <Tab panes={panes} className="auth_forms"  activeIndex={activeIndex} onTabChange={(_, data) => setActiveIndex(data.activeIndex)}/>
       </div>
    </GridColumn>
    </Grid>
  )
}
