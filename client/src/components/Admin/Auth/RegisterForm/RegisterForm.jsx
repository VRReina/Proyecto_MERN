import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { Auth } from "../../../../api"
import { initialValues , validationSchema} from './RegisterForm.form'
import "./RegisterForm.scss"

const  authController = new Auth()

export  function RegisterForm(props) {

    const { openLogin } = props
    const [error, setError] =  useState("")
    
    const formik = useFormik({
      initialValues : initialValues(),
      validationSchema: validationSchema(),
      validateOnChange: false,

      onSubmit: async (formValue) =>{
        try{
          setError("")
          await authController.register(formValue)
          openLogin()
          
        } catch (error){
          setError("error en el servidor")
          
        }
      }
    })
  return (
    <Form className='register-form' onSubmit={formik.handleSubmit}>
      <Form.Input name='firstname' type='text' placeholder="Nombres" onChange={formik.handleChange} value={formik.values.firstname} error={formik.errors.firstname} />
      <Form.Input name='lastname'  type='text' placeholder="Apellidos" onChange={formik.handleChange} value={formik.values.lastname} error={formik.errors.lastname} />
      <Form.Input name='email' placeholder="Correo Electronico" onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email} />
      <Form.Input  name="password" type='password' placeholder="Contraseña" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password}/>
      <Form.Input  name="repeatPassword" type='password' placeholder="Repetir Contraseña" onChange={formik.handleChange} value={formik.values.repeatPassword } error={formik.errors.repeatPassword} />
      <Form.Checkbox name='conditionsAccepted' label="He leido y acepto las politicas de privacidad" onChange={ (_, data) => formik.setFieldValue 
       ("conditionsAccepted", data.checked)} checked={formik.values.conditionsAccepted } error={formik.errors.conditionsAccepted}/>
      <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>Crear Cuenta</Form.Button>

      <p className='register-form__error'>{error}</p>
    </Form>
  )
}
