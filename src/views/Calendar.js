import React from 'react';
import Text from '../components/atom/Text';
import Button from '../components/atom/Button';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';


function CalendarView() {
  moment.locale('ko-KR')
  const localizer = momentLocalizer(moment)
  return (
    <div className="gt-container">
      <Text text="고스트타운 입고 달력" fontSize="24px" fontWeight={700} />
      <Calendar
        localizer={localizer}
        events={[
          {
            title: "고스트타운 입고",
            allDay: false,
            start: new Date(2022, 2, 2, 10, 0), // 10.00 AM
            end: new Date(2022, 2, 2, 14, 0) // 2.00 PM
          }
        ]}
        view="month"
        views={["month"]}
        components={{
          toolbar: Toolbar,
        }}
        style={{ height: "500px", maxWidth: 800, margin: '50px auto 0px' }}
      />
    </div>
  );
}

export default CalendarView;

const StyledToolBar = styled.div`
  display: flex;
  button{
    margin-right: 16px;
  }
`;

function Toolbar(props) {
  const {
    date,
  } = props;

  const navigate = (action) => {
    props.onNavigate(action);
  };

  return (
    <StyledToolBar className="rbc-toolbar" style={{ marginBottom: 30 }}>
      <Button
        onClick={navigate.bind(null, 'PREV')}
        text="이전"
        style={{ marginRight: 16 }}
      />
      <Text fontWeight={500} text={`${date.getFullYear()}년 ${date.getMonth() + 1}월`} />
      <Button
        onClick={navigate.bind(null, 'NEXT')}
        text="다음"
        style={{ marginLeft: 16 }}
      />
    </StyledToolBar>
  );
}