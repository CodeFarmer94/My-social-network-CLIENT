import './login.css';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from 'react-query';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import * as yup from 'yup';

export default function LoginForm() {
  
  
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Form validation via yup
  const schema = yup.object().shape({
    username: yup.string().email().required(),
    password: yup.string().min(8, 'Password must be at least 8 characters').required(),
  })

  // React Hook Form
  const { register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  });

  // Login mutation
  const postLogin = async (body) => {
    try {
      const res = await fetch('http://localhost:8030/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if(res.ok){
        navigate('/profile/me')
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const { mutate, onSuccess } = useMutation({mutationFn: postLogin, onSuccess: () => queryClient.invalidateQueries('myUser')});
  const onSubmit  = (data, e) => {
    e.preventDefault();
    mutate(data);
  };
  
  
  
  return (
    <div className='flex-column wid-100 center '>
      <form onSubmit={handleSubmit(onSubmit)} className='wid-100 login-form'>
      
        <p className="error">{errors.email?.message}</p>
        <input
          name="email" // Add name attribute
          placeholder="Inserisci la tua e-mail"
          className="pad-1 mar-05-auto bor-rad-5 wid-100 f-size-12 block "
          required
          {...register('username')}
        />
        <p className="error">{errors.password?.message}</p>
        <input
          name="password" // Add name attribute
          placeholder="Inserisci la tua password"
          className="pad-1 mar-05-auto bor-rad-5 wid-100 f-size-12 block"
          required
          {...register('password')}
        />
        <p 
        className='bold pointer f-size-12 mar-1' 
        onClick= {() => navigate('/access/register')}>
          Non sei ancora registrato?<span className='react-icon'><BsBoxArrowInUpRight/></span></p>
        <button className="pad-05 mar-05-auto block bg-btn-green wid-70 bor-rad-5 f-size-13 c-white bold pointer">
          Accedi
        </button>
      </form>
    </div>
  );
}
