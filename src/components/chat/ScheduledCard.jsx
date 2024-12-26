import React from 'react';
import styled from 'styled-components';

// 스타일링
const CardContainer = styled.div`
  width: 128px;
  height: 102px;
  background: linear-gradient(#4973E3, #7AB6F4); // 그라데이션
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const TimeText = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const TitleText = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const LocationText = styled.div`
  font-size: 14px;
  opacity: 0.8;
`;

const ScheduleCard = () => {
  return (
    <CardContainer>
      <TimeText>13:00-15:00</TimeText>
      <TitleText>모션그래픽스</TitleText>
      <LocationText>군자관205</LocationText>
    </CardContainer>
  );
};

export default ScheduleCard;
