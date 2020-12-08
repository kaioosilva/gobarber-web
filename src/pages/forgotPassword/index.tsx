import React, { useRef, useCallback, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { useToast } from '../../hooks/Toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';
import api from '../../services/api';

interface FogotPasswordFormData {
    email: string;
  }

const FogotPassword: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const formRef = useRef<FormHandles>(null);

    const { addToast } = useToast();

    const handleSubmit = useCallback(async (data: FogotPasswordFormData) => {
        try {
            setLoading(true);

            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string().required('Email required').email('Please insert a valid email'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('password/forgot', {
                email: data.email
            });

            addToast({
                type: 'success',
                title: 'Recovery link sent sucessfully.',
                description: 'An email has been sent to the address you have provided. Please follow the link in the email to complete your password reset request.'
            });

        } catch (err) {
            // console.log(err);
            if(err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Forgot password error',
                description: 'The email you entered did not match our records. Please double-check and try again.',
            });
            
        } finally {
            setLoading(false);
        }

    }, [addToast]);

    return (
        <Container >
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber"/>

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Forgot password</h1>

                        <Input name="email" icon={FiMail} placeholder="E-mail" />

                        <Button loading={loading} type="submit">Email me a recovery link</Button>

                    </Form>

                    <Link to="/">
                        <FiLogIn />
                        Sign In
                    </Link>
                </AnimationContainer>
            </Content>

            <Background />
        </Container>
    );
}

export default FogotPassword;