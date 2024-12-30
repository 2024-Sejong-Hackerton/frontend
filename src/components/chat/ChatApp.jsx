import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { getChatComplete, getChatStatus, getText } from '../../lib/api/api';

// Styled-components
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 402px;
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #f9f9f9;
  overflow-y: scroll;
  border-radius: 20px 20px 0 0;
`;

const Container = styled.div`
  height: 600px;
  display: flex;
  flex-direction: column; 
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Message = styled.div`
  align-self: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  background-color: ${(props) => (props.isUser ? '#7AB6F4' : '#F3F7FF')};
  color: ${(props) => (props.isUser ? '#F3F7FF' : '#4973E3')};
  padding: 8px 15px;
  border-radius: 15px;
  max-width: 60%;
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  border-radius: 15px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  width: 100px;
  background-color: #1C4DCF;
  border: none;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 10px;
`;

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const chatEndRef = useRef(null);
  const [id, setId] = useState("");
  const [status, setStatus] = useState("IN_PROGRESS");

  const getTimestamp = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}`;
  };

  const sendMessage = async () => {
    if (inputText.trim()) {
      const newMessage = { text: inputText, isUser: true, timestamp: getTimestamp() };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // 새로운 질문에 대해 ID와 상태 초기화
      setId(""); 
      setStatus("IN_PROGRESS");

      try {
        const res = await getChatStatus(inputText);
        const newId = res.headers.location; // 새로운 ID 저장
        setId(newId); // 상태 업데이트
      } catch (error) {
        console.error("Error sending message:", error);
        throw new Error('메시지 전송에 실패했습니다.');
      }
      setInputText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      setInputText(inputText + '\n');
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (e) => {
    setIsComposing(false);
    setInputText(e.target.value);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatMessage = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  useEffect(() => {
    let intervalId;

    const fetchStatus = async () => {
      if (id) {
        try {
          const response = await getChatComplete({ id });
          const statusFromResponse = response.data;
          console.log("Current Status:", statusFromResponse);
          setStatus(statusFromResponse);

          if (statusFromResponse === "COMPLETED") {
            clearInterval(intervalId);

            const chatId = response.request.responseURL.split("/").pop();
            const responsekk = await getText({ id: chatId });
              
            console.log("Chat Response:", responsekk.data);
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: responsekk.data, isUser: false, timestamp: getTimestamp() },
            ]);
          }
        } catch (error) {
          console.error("Error fetching status:", error);
          clearInterval(intervalId);
        }
      }
    };

    if (status === "IN_PROGRESS") {
      intervalId = setInterval(fetchStatus, 500);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [id, status]);

  return (
    <Container>
      <ChatContainer>
        <MessageContainer>
          {messages.map((msg, index) => (
            <Message key={index} isUser={msg.isUser}>
              <div>
                <strong style={{ color: "gray" }}>{msg.isUser ? 'Me' : 'DiDim'}</strong> {' '}
                <span style={{ color: "lightgray" }}>{msg.timestamp}</span>
              </div>
              <div>{formatMessage(msg.text)}</div>
            </Message>
          ))}
          <div ref={chatEndRef} />
        </MessageContainer>
      </ChatContainer>
      <InputContainer>
        <Input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          placeholder="메시지를 입력하세요..."
        />
        <Button onClick={sendMessage}>전송</Button>
      </InputContainer>
    </Container>
  );
};

export default ChatApp;
