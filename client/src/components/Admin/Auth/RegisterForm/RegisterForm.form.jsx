import * as Yup  from "yup"

export function initialValues(){
    return{
        email:"",
        password: "",
        repetPassword: "",
        conditionsAccepted: false,

    }
}

export function validationSchema(){
    return Yup.object({
        firstname: Yup.string().required("campo obligatorio"),
        lastname: Yup.string().required("campo obligatorio"),
        email: Yup.string().email("el email no es valido").required("campo obligatorio"),
        password: Yup.string().required("campo obligatorio"),
        repeatPassword: Yup.string().required("campo obligatorio").oneOf([Yup.ref("password")],"las contraseñas deben ser iguales"),
        conditionsAccepted: Yup.bool().isTrue(true),
    })
}