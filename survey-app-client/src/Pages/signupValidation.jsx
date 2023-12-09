import * as Yup from "yup";

export const signupValidation = Yup.object({
  name: Yup.string().min(3).required("Please Enter name"),
  email: Yup.string()
    .email("please enter valid email")
    .required("Please enter email"),
    password : Yup.string().min(6).required("please enter password"),
    photoUrl : Yup.string().required("Please valid photoUrl")
});
