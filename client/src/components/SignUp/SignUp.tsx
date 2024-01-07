import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import styles from './SignUp.module.css';
import api from '../../utils/api';

const SignUp = () => {
  const initialFormData = {
    name: '',
    email: '',
    password: '',
    type: 'customer' as 'customer' | 'seller'
  };

  const [formData, setFormData] = useState(initialFormData);

  const postFormData = async (formData: typeof initialFormData) => {
    try {
      const response = await api({
        method: 'post',
        url: 'sign-up',
        data: formData
      });

      return response?.data;
    } catch (error) {
      console.error('error in postFormData: ', error);
    }
  };

  const { mutate, data, isSuccess } = useMutation({
    mutationFn: postFormData
  });

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(formData);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const getInputs = () => {
    const inputs = [
      {
        id: 'name',
        label: 'Full Name',
        placeholder: 'Your name'
      },
      {
        id: 'email',
        label: 'Email',
        placeholder: 'Your email',
        type: 'email'
      },
      {
        id: 'password',
        label: 'Password',
        placeholder: 'Create a password',
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

  const getError = () => {
    return isSuccess && !data && <p className={styles.error}>Error in creating account !</p>;
  };

  return (
    <main className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create user account</h1>

        <form className={styles.form} onSubmit={handleOnSubmit}>
          {getInputs()}
          <button className={styles.button}>Sign Up</button>
          {getError()}
        </form>

        <h2 className={styles.subtitle}>
          Already have an account?{' '}
          <Link className={styles.link} to='/login'>
            Sign In
          </Link>
        </h2>
      </div>
    </main>
  );
};

export default SignUp;
