import React, { useCallback, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiClock, FiPower } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/Auth';

import { 
    Container, 
    Header, 
    HeaderContent, 
    Profile, 
    Content, 
    Schedule, 
    NextAppointment, 
    Section,
    Appointment,
    Calendar } 
from './styles';

const Dashboard: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { signOut, user } = useAuth();

    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if(modifiers.available) {
            setSelectedDate(day);
        }
    }, []);

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt="GoBarber"/>

                    <Profile>
                        <img 
                            src={user.avatar_url} 
                            alt={user.name}
                        />
                        <div>
                            <span>Welcome,</span>
                            <strong>{user.name}</strong>
                        </div>
                    </Profile>

                    <button type="button" onClick={signOut}>
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>

            <Content>
                <Schedule>
                    <h1>Appointments</h1>
                    <p>
                        <span>Today</span>
                        <span>Day 06</span>
                        <span>Monday</span>
                    </p>

                    <NextAppointment>
                       <strong>Next appointment</strong> 
                       <div>
                            <img 
                                src="https://avatars1.githubusercontent.com/u/60159866?s=460&u=a969fab6599ad3a034deac2927fbb76959e8cd14&v=4" 
                                alt="Kaio Silva"
                            />

                            <strong>Kaio Silva</strong>
                            <span>
                                <FiClock />
                                08:00
                            </span>
                       </div>
                    </NextAppointment>

                    <Section>
                        <strong>Morning</strong>

                        <Appointment>
                            <span>
                                <FiClock />
                                08:00
                            </span>

                            <div>
                                <img 
                                    src="https://avatars1.githubusercontent.com/u/60159866?s=460&u=a969fab6599ad3a034deac2927fbb76959e8cd14&v=4" 
                                    alt="Kaio Silva"
                                />

                                <strong>Kaio Silva</strong>
                            </div>
                        </Appointment>

                        <Appointment>
                            <span>
                                <FiClock />
                                08:00
                            </span>

                            <div>
                                <img 
                                    src="https://avatars1.githubusercontent.com/u/60159866?s=460&u=a969fab6599ad3a034deac2927fbb76959e8cd14&v=4" 
                                    alt="Kaio Silva"
                                />

                                <strong>Kaio Silva</strong>
                            </div>
                        </Appointment>
                    </Section>

                    <Section>
                        <strong>Afternoon</strong>

                        <Appointment>
                            <span>
                                <FiClock />
                                08:00
                            </span>

                            <div>
                                <img 
                                    src="https://avatars1.githubusercontent.com/u/60159866?s=460&u=a969fab6599ad3a034deac2927fbb76959e8cd14&v=4" 
                                    alt="Kaio Silva"
                                />

                                <strong>Kaio Silva</strong>
                            </div>
                        </Appointment>
                    </Section>
                </Schedule>
                <Calendar>
                    <DayPicker 
                        fromMonth={new Date()}
                        disabledDays={[{ daysOfWeek: [0,6] }]}
                        modifiers={{
                            available: { daysOfWeek: [1, 2, 3, 4, 5] },
                        }}
                        selectedDays={selectedDate}
                        onDayClick={handleDateChange}
                    />
                </Calendar>
            </Content>
        </Container>
    );
};

export default Dashboard;