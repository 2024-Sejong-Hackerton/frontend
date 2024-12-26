import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #4973E3;
`;

const Header = styled.div`
  width: 100%;
  height: 352px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 33px 33px;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 352px;
  margin-bottom: 10px;
`;

const FileContainer = styled.div`
    display: flex;
    align-items: center;
  flex-direction: column;
  background: white;
  padding: 20px;
  border-radius: 33px 33px 0 0 ;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 629px;
  z-index: 2;
  
`;
const Blank = styled.div`
    height: 60px;
`

const UploadContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    padding: 20px;
    width: 80%;
    max-width: 400px;
    border: 2px dashed #ccc;
    border-radius: 15px;
    background-color: #f9f9f9;
    text-align: center;
    cursor: pointer;
`;

const UploadText = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 10px;
`;


const Title = styled.p`
    color: black;
    font-size:20px;
    font-weight: bold;
    margin:0;
`;

const SubTitle = styled.p`
    color: #909090;
    font-size:13px;
    font-weight:bold;
`;

const GetTTPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState('');
  // const [postSuccess,setPostSuccess] = useState(false);

  // 엑셀 파일을 읽어들이는 함수
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setData(jsonData);
      setFileName(file.name);
    };
    // api 호출과 함께 post : data -> setPostSuccess(true) 사용해야함
    reader.readAsBinaryString(file); 
  };
  if(data){
    navigate('/main');
  }
  return (
    <Container>
      <Header>
        <LogoImage src="/images/buddydim.png" alt="Buddy Dim Logo" />
      </Header>
        <FileContainer>
        <Blank/>
        <Title>Upload your Timetable</Title>
        <SubTitle>Only Excel files(.csv) can be uploaded</SubTitle>
        <label htmlFor="file-upload" style={{display:"flex",justifyContent:"center",alignItems:"center",width:"268px"}}>
        <UploadContainer>
          <img src="/images/File.png" alt="File Icon" width="50" />
          <UploadText>Drop & Drag your files here</UploadText>
        </UploadContainer>
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".xlsx, .xls"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
        </FileContainer>
    </Container>
  );
};

export default GetTTPage;
