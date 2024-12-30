import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { timetable } from '../lib/api/api';

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
  border-radius: 33px 33px 0 0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 629px;
  z-index: 2;
`;

const Blank = styled.div`
  height: 60px;
`;

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
  font-size: 20px;
  font-weight: bold;
  margin: 0;
`;

const SubTitle = styled.p`
  color: #909090;
  font-size: 13px;
  font-weight: bold;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #4973E3;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #365bbf;
  }
`;

const GetTTPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null); // 파일 상태 추가
  const [test,setTest] = useState("");

  // 엑셀 파일을 읽어들이는 함수
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      const jsonStr = JSON.stringify(jsonData, null, 2);
      

      // data 상태를 업데이트
      setData(jsonData);
      setTest(jsonStr);
      setFileName(selectedFile.name);
      setFile(selectedFile); // 파일 상태 업데이트
    };

    reader.readAsBinaryString(selectedFile); // 파일을 바이너리 문자열로 읽어들임
  };

  // const makeTimetoString = () => {
  //   for(let i = 0;i<data.length;i++){
  //     if(data[i].startTime.indexOf('`')){
  //       let k = data[i].startTime.indexOf('`');

  //     }
  //   }
  // }
  // POST 요청을 보내는 함수
  const handleSubmit = () => {
    console.log("str test:",test);
    console.log("data:",data);
    if (!file) {
      alert("먼저 파일을 업로드하세요.");
      return;
    }
    timetable(data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("success");
          navigate('/main');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (  
    <Container>
      <Header>
        <LogoImage src="/images/buddydim.png" alt="Buddy Dim Logo" />
      </Header>
      <FileContainer>
        <Blank />
        <Title>Upload your Timetable</Title>
        <SubTitle>Only Excel files(.xlsx, .xls) can be uploaded</SubTitle>
        <label htmlFor="file-upload" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "268px" }}>
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
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton> {/* 버튼 추가 */}
      </FileContainer>
    </Container>
  );
};

export default GetTTPage;
