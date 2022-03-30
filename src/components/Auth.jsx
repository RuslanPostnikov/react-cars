import {useFormik} from "formik";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/config";
import {useAuth} from "../shared/AuthContext";



const Auth = () => {
    const auth = useAuth();

    const signIn = values => {
        console.log(values);
        const fireAuth = getAuth(app);
        signInWithEmailAndPassword(fireAuth, values.email, values.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                auth.setAuth(true);
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage)
            });
    }


    const validate = values => {
        const errors = {}
        const emailValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!values.email) {
            errors.email = 'Required'
        } else if (!values.email.match(emailValidator)) {
            errors.email = 'Please enter correct email'
        }

        if (!values.password) {
            errors.password = 'Required'
        } else if (values.password.length < 6) {
            errors.password = 'Must be 6 characters or more'
        }

        return errors
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: signIn
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className={'form-group'}>
                    <label htmlFor="email">Email Address</label>
                    <input
                        className={'form-control'}
                        value={formik.values.email}
                        type="email" id={'email'} name={'email'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.email && formik.errors.email ? <div className='alert alert-danger p-1'>{formik.errors.email}</div> : null}
                </div>

                <div className={'form-group'}>
                    <label htmlFor="password">Password</label>
                    <input
                        className={'form-control'}
                        value={formik.values.password}
                        type="password" id={'password'} name={'password'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.password && formik.errors.password ? <p className='alert alert-danger p-1'>{formik.errors.password}</p> : null}
                </div>

                <button type={"submit"} className={'btn btn-primary mt-3'}>Sign in</button>
            </form>
        </div>
    );
};

export default Auth;

