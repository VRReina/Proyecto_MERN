import * as Yup  from "yup"

export function initialValues(){
    return{
        email: "",
        password: "",
    }
}

export function validationSchema(){
    return Yup.object({
        email: Yup.string().email("el amil no es valido").required("campo obligatiorio"),
        password: Yup.string().required("el campo requerido"),
    })
}
