import { useRef, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { api } from '../../utils/axiosInstance';

type Inputs = {
  username: string,
  password: string,
};

const RegisterPage = () => {

  const history = useHistory();
  const { register, watch, formState: { errors }, handleSubmit } = useForm();
  const password = useRef();
  password.current = watch("password");
  const [errorFromSubmit, setErrorFromSubmit] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    const payload = {
      username: data.username,
      password: data.password,
      image: `http://gravatar.com/avatar/${data.username}?d=identicon`
    }

    try {
      setLoading(true)
      await api().post(`/auth/signup`, payload)
      history.push("/login");
      setLoading(false)
    } catch (error: any) {
      setErrorFromSubmit(error.message)
      setLoading(false)
      setTimeout(() => {
        setErrorFromSubmit("")
      }, 5000);
    }
  };

  return (
    <div className="auth-wrapper">
      <div style={{ textAlign: 'center' }}>
        <h3>Register</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>

        <label>Username</label>
        <input
          {...register("username", { required: true })}
        />
        {errors.username && errors.username.type === "required" && <p>This username field is required</p>}

        <label>Password</label>
        <input
          type="password"
          {...register("password", { required: true, minLength: 8 })}
        />
        {errors.password && errors.password.type === "required" && <p>This password field is required</p>}
        {errors.password && errors.password.type === "minLength" && <p>Password must have at least 8 characters</p>}

        <label>Password Confirm</label>
        <input
          type="password"
          {...register("password_confirm", {
            required: true,
            validate: (value) =>
              value === password.current
          })}
        />
        {errors.password_confirm && errors.password_confirm.type === "required" && <p>This password confirm field is required</p>}
        {errors.password_confirm && errors.password_confirm.type === "validate" && <p>The passwords do not match</p>}

        {errorFromSubmit &&
          <p>{errorFromSubmit}</p>
        }

        <input type="submit" disabled={loading} />
        <Link style={{ color: 'gray', textDecoration: 'none' }} to="login">이미 아이디가 있다면...  </Link>
      </form>

    </div>
  )
}

export default RegisterPage

