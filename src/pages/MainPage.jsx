import { useState } from 'react';
import Header from '../components/header/Header';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
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
  font-size: 20px;
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
  transform: translate(100px, 250px);
`;

const BlueEllipseImage = styled.img`
  width: 178px;
  height: 32px;
  position: absolute;
  transform: translate(110px, 420px);
`;

const ConstantContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 402px;
  height: 596px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 402px;
  height: 50px;
`;

const Button = styled.button`
  width: 302px;
  height: 60px;
  font-size: 24px;
  color: white;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: bold;
  background-color: #1C4DCF;
  border-radius: 39px;
  border-width: 0px;
  cursor: pointer;
  &:active {
    transform: scale(0.9);
  }
`;

const ModalBackground = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <MainContainer>
        <ConstantContainer>
          <HelloText>Hi! {name} <br /> Have a nice day!</HelloText>
          <BackgroundImage src='./images/background.png' />
          <DimImage src='./images/didimecharacter.png' />
          <BlueEllipseImage src='./images/blueEllipse.png' />
        </ConstantContainer>
        <ButtonContainer>
          <Button onClick={handleButtonClick}>Chat with Didim</Button>
        </ButtonContainer>

        {/* 모달이 열리면 ChatApp을 표시 */}
        {isModalOpen && (
          <ModalBackground
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "100vh" }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <ChatApp />
              <div style={{display:"flex",justifyContent:"center"}}>
                <Button onClick={handleCloseModal}>Close</Button>
              </div>
              
            </motion.div>
          </ModalBackground>
        )}
      </MainContainer>
    </>
  );
};

export default MainPage;
