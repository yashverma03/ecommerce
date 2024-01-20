import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import styles from './SignUp.module.css';
import { signUpUser } from '../../utils/api';

const SignUp = () => {
  const navigate = useNavigate();

  const initialFormData = {
    name: '',
    email: '',
    password: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const { mutate, data, isPending, isSuccess, isError } = useMutation({
    mutationFn: signUpUser,
    onSuccess: (mutationData) => {
      if (mutationData !== undefined) {
        setFormData(initialFormData);
        navigate('/login');
      }
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(formData);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
            onChange={handleInputChange}
            required
          />
        </div>
      );
    });
  };

  const buttonText = isPending ? 'Creating your account...' : 'Sign Up';

  const getError = () => {
    return (
      ((isSuccess && data === undefined) || isError) && (
        <p className={styles.error}>Error in creating account</p>
      )
    );
  };

  return (
    <main className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create your account</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          {getInputs()}
          <button className={styles.button}>{buttonText}</button>
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
