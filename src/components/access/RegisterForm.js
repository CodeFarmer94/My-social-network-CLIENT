import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useState } from 'react';
export default function RegisterForm() {
    
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const postRegister = async (body) => {
        try {
            const res = await fetch('http://localhost:8030/register', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if(res.ok){
                navigate('/access/login')
            } else {
                setError(data.message)
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8, 'Password must be at least 8 characters').required(),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
        firstName: yup.string().required(),
        lastName: yup.string().required(),
    })
    const { register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) => {
        mutate(data);
    }
    const { mutate } = useMutation(postRegister);
    
    return(
        <div className='flex-column wid-100 center'>
      <form className='wid-100' onSubmit={handleSubmit(onSubmit)}>
        <p className="error">{errors.email?.message}</p>
        <input
          name="email" // Add name attribute
          placeholder="Inserisci la tua e-mail"
          className="pad-1 mar-05-auto bor-rad-5 wid-80 f-size-12 block " 
          required
          type = 'email'
          {...register('email')}
        />
        <p className="error">{errors.password?.message}</p>
        <input
          name="password" // Add name attribute
          placeholder="Inserisci la tua password"
          className="pad-1 mar-05-auto bor-rad-5 wid-80 f-size-12 block"
          type= 'password'
          required
            {...register('password')}
        />
        <p className="error">{errors.confirmPassword?.message}</p>
        <input
          name="confirmPassword" // Add name attribute
          placeholder="Conferma la tua password"
          className="pad-1 mar-05-auto bor-rad-5 wid-80 f-size-12 block"
          {...register('confirmPassword')}
          type= 'password'
          required
            />
        <p className="error">{errors.firstName?.message}</p>
        <input  
            name='firstName'
            placeholder='Inserisci il tuo nome'
            className="pad-1 mar-05-auto bor-rad-5 wid-80 f-size-12 block"
            {...register('firstName')}
            required/>
        <p className="error">{errors.lastName?.message}</p>
        <input 
            name='lastName'
            placeholder='Inserisci il tuo cognome'
            className="pad-1 mar-05-auto bor-rad-5 wid-80 f-size-12 block"
            {...register('lastName')}
            required/>

        <button className="pad-05 mar-1-auto block bg-btn-green wid-70 bor-rad-5 f-size-13 c-white">
          Registrati
        </button>
      </form>
    </div>
    )}
