import React from 'react';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {

    const { signOut } = useAuth();

    const handleLogout = () => {
        signOut();
    }

    return (
        <>
            <h1>Dashboard</h1>
            <Button type="button" onClick={() => handleLogout()}>Logout</Button>
            
        </>
    );
};

export default Dashboard;