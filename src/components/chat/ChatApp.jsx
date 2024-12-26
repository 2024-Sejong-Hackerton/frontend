import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

// Styled-components
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 402px;
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #f9f9f9;
  overflow-y: scroll;
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
  word-wrap: break-word; /* 자동 줄 바꿈 */
  white-space: pre-wrap; /* 개행 문자 처리 */
  overflow-wrap: break-word; /* 긴 단어가 박스를 넘지 않도록 처리 */
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
  width: 15%;
  background-color: #8ab4f8;
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

  // 타임스탬프 추가 함수
  const getTimestamp = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}`;
  };

  // 메시지 전송 함수
  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputText, isUser: true, timestamp: getTimestamp() },
      ]);
      setInputText('');
    }
  };

  // Enter 키로 메시지 전송
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Shift + Enter로 개행 처리
  const handleKeyUp = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      setInputText(inputText + '\n');
    }
  };

  // 조합문자 입력 시작
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  // 조합문자 입력 끝
  const handleCompositionEnd = (e) => {
    setIsComposing(false);
    setInputText(e.target.value);
  };

  // 메시지 스크롤 자동 내려가기
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 메시지 포맷팅 함수 (개행 문자 처리)
  const formatMessage = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div>
      <ChatContainer>
        <MessageContainer>
          {messages.map((msg, index) => (
            <Message key={index} isUser={msg.isUser}>
              <div>
                <strong style={{color:"gray"}}>{msg.isUser ? 'Me' : 'Other'}</strong> {' '}
                <span style={{color:"lightgray"}}>{msg.timestamp}</span>
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
    </div>
  );
};

export default ChatApp;
