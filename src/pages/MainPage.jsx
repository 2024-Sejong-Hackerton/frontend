import { useState } from 'react';
import Header from '../components/header/Header';
import styled,{ keyframes } from 'styled-components';
import ChatApp from '../components/chat/ChatApp';

let name = "indigo";

const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 1;
  }
`;

const MainContainer = styled.div`
    display: flex;
    height: 760px;
    width: 402px;
    background-color: #4973E3;
    flex-direction: column;
`;

const HelloText = styled.p`
    font-size:20px;
    color: #ffffff;
    font-weight: bold;
    margin-left: 30px;
    animation: ${blink} 3s infinite;
`;

const BackgroundImage = styled.img`
    width: 100%;
    height: 308px;
`;

const DimImage = styled.img`
    width: 200px;
    height: 190px;
    z-index: 999;
    position: absolute;
    transform:translate(100px,250px);
`;
const BlueEllipseImage = styled.img`
    width: 178px;
    height: 32px;
    position:absolute;
    transform:translate(110px, 420px);
`;
const MainPage = () => {
    // const [isOpen,setIsOpen] = useState(false);
    return (
        <> 
            <Header/>
            <MainContainer>
                <HelloText>Hi! {name} <br/> Have a nice day!</HelloText>
                <BackgroundImage src='./images/background.png'/>
                <DimImage src='./images/didimecharacter.png'/>
                <BlueEllipseImage src='./images/blueEllipse.png'/>
                <ChatApp /> 
            </MainContainer>
        </>
       
        
    );
};

export default MainPage;