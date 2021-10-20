import { useState, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../utils/axiosInstance";

type Inputs = {
  username: string,
  password: string,
};

type AxiosResponse = {
  accessToken: string
}

const LoginPage = () => {
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState("")
  const [loading, setLoading] = useState(false)
  const { authentication } = useContext(AuthContext);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const payload = {
      username: data.username,
      password: data.password,
    }

    try {
      setLoading(true)
      const { data: { accessToken } } = await api().post<AxiosResponse>(`/auth/signin`, payload)
      localStorage.setItem('accessToken', accessToken)
      history.push("/");
      authentication();
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
        <h3>Login</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input
          {...register("username", { required: true })}
        />
        {errors.username && <p>This username field is required</p>}

        <label>Password</label>
        <input
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === "required" && <p>This password field is required</p>}
        {errors.password && errors.password.type === "minLength" && <p>Password must have at least 6 characters</p>}

        {errorFromSubmit &&
          <p>{errorFromSubmit}</p>
        }

        <input type="submit" disabled={loading} />
        <Link style={{ color: 'gray', textDecoration: 'none' }} to="register">아직 아이디가 없다면...  </Link>
      </form>
    </div>
  )
}

export default LoginPage