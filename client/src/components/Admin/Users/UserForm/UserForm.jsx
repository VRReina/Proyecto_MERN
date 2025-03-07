import React , { useCallback }from 'react'
import { Form, Image } from 'semantic-ui-react'
import { useFormik } from 'formik'
import { useDropzone } from 'react-dropzone'
import { User } from '../../../../api/user'
import { useAuth } from '../../../../hooks'
import { image } from "../../../../assets"
import { ENV } from '../../../../utils'
import { initialValues , validationSchema } from './UserForm.form'
import "./UserForm.scss"

const userController = new User()

export  function UserForm(props) {

    const { close, onReload, user } = props

    const { accessToken } = useAuth()

    
    
 
    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: validationSchema(user),
        validateOnChange: false,

        onSubmit: async (formValue) => {
            try{
                
                if (!user) {
                  await userController.createUser(accessToken, formValue)
                } else {
                  await userController.updateUser(accessToken, user._id, formValue)
                    
                }                
                onReload()
                close()
                
            } catch ( error) {
                console.log(error)
                
            }
        }
    })

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0]
        formik.setFieldValue("avatar", URL.createObjectURL(file))
        formik.setFieldValue("fileAvatar", file)     
    })

    const { getRootProps, getInputProps } = useDropzone ({
        accept: "image/jpeg, image/jpg, image/png",
        onDrop,
    })

    const getAvatar = () => {

        if (formik.values.fileAvatar) {
            return formik.values.avatar
        } else if (formik.values.avatar){
            return `${ENV.BASE_PATH}/${formik.values.avatar}`
        }
        return image.noAvatar
    }
  
    return (
    <Form className='user-form' onSubmit={formik.handleSubmit}>

       <div className='user-form__avatar' {... getRootProps()}>
          <input {... getInputProps()} />
          <Image avatar size='small' src={getAvatar()}/>
       </div>

       <Form.Group widths='equal'>
           <Form.Input name="firstname" placeholder="nombres" onChange={formik.handleChange} value={formik.values.firstname} error={formik.errors.firstname}/>
           <Form.Input name="lastname" placeholder="apellidos" onChange={formik.handleChange} value={formik.values.lastname} error={formik.errors.lastname}/>
       </Form.Group>
       <Form.Group widths='equal'>
           <Form.Input name="email" placeholder="correo electronico" onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email}/>
           <Form.Dropdown  placeholder="seleciona tu rol" options={roleOptions} selection  onChange={(_, data) => formik.setFieldValue("role", data.value)} value={formik.values.role} error={formik.errors.role}/>
       </Form.Group>
       <Form.Input type='password' name="password" placeholder="contraseña" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password}/>
       <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
          {user ? "actualizar usuario" : "crear usuario"}
       </Form.Button>
    </Form>
  )
}

const roleOptions = [
    {
        key: "user",
        text: "usuario",
        value: "user",
    },
    {
        key: "admin",
        text: "administrador",
        value: "admin",
    },
]
