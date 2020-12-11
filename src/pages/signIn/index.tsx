import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignInFormData {
    email: string;
    password: string;
  }

const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const { signIn } = useAuth();
    const { addToast } = useToast();
    const history = useHistory();

    // console.log(user);

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {

            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string().required('Email required').email('Please insert a valid email'),
                password: Yup.string().required('Password required'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await signIn({
                email: data.email,
                password: data.password,
            });

            history.push('/dashboard');
        } catch (err) {
            // console.log(err);
            if(err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Authentication error',
                description: 'Authentication failure check credential properties.',
            });
            
        }

    }, [signIn, addToast, history]);

    return (
        <Container >
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber"/>

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Join GoBarber today</h1>

                        <Input name="email" icon={FiMail} placeholder="E-mail" />

                        <Input name="password" icon={FiLock} type="password" placeholder="Password" />

                        <Button type="submit">Log in</Button>

                        <Link to="/forgot-password">Forgot password?</Link>

                    </Form>

                    <Link to="/signup">
                        <FiLogIn />
                        Sign Up
                    </Link>
                </AnimationContainer>
            </Content>

            <Background />
        </Container>
    );
}

export default SignIn;