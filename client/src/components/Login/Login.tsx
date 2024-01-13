import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import styles from './Login.module.css';
import api from '../../utils/api';

const Login = () => {
  const navigate = useNavigate();

  const initialFormData = {
    email: '',
    password: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const postFormData = async (formData: typeof initialFormData) => {
    try {
      const response = await api({
        method: 'post',
        url: 'login',
        data: formData
      });

      return response?.data;
    } catch (error) {
      console.error('error in logging: ', error);
    }
  };

  const handleOnSuccess = (mutationData: any) => {
    if (mutationData !== undefined) {
      localStorage.setItem('token', mutationData.token as string);
      setFormData(initialFormData);
      navigate('/');
    }
  };

  const mutation = useMutation({
    mutationFn: postFormData,
    onSuccess: handleOnSuccess
  });

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(formData);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const getInputs = () => {
    const inputs = [
      {
        id: 'email',
        label: 'Email',
        placeholder: 'Your email',
        type: 'email'
      },
      {
        id: 'password',
        label: 'Password',
        placeholder: 'Your password',
        type: 'password'
      }
    ];

    return inputs.map((input) => {
      return (
        <div className={styles.inputWrap} key={input.id}>
          <h3 className={styles.label}>{input.label}</h3>
          <input
            className={styles.input}
            id={input.id}
            placeholder={input.placeholder}
            type={input.type ?? 'text'}
            value={formData[input.id as keyof typeof formData]}
            onChange={handleOnChange}
            required
          />
        </div>
      );
    });
  };

  const getButton = () => {
    const buttonText = mutation.isPending ? 'Logging you in...' : 'Login';
    return <button className={styles.button}>{buttonText}</button>;
  };

  const getError = () => {
    return (
      mutation.isSuccess &&
      mutation.data === undefined && <p className={styles.error}>Error in logging</p>
    );
  };

  return (
    <main className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.title}>Login your account</h1>

        <form className={styles.form} onSubmit={handleOnSubmit}>
          {getInputs()}
          {getButton()}
          {getError()}
        </form>

        <h2 className={styles.subtitle}>
          Don't have an account?{' '}
          <Link className={styles.link} to='/sign-up'>
            Sign Up
          </Link>
        </h2>
      </div>
    </main>
  );
};

export default Login;
