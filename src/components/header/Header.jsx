import styled from 'styled-components';

const HeaderContainer = styled.header`
    background-color : #4973E3;
    width: 402px;
    height: 114px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
`;

const TitleImage = styled.img`
    width: 27px;
    height: 30px;
    margin-bottom: 15px;
    margin-left: 30px;
`;

const IconContainer = styled.div`
    width: 71px;
    height: 28px;
    margin-bottom: 15px;
    margin-right: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const IconImage = styled.img`
    width: 28px;
    height: 28px;
    cursor: pointer;
`;
const Header = () => {
    
    return (
        <HeaderContainer>
            <TitleImage src="/images/dimWord.png" />
            <IconContainer>
                <IconImage src="/images/Watch.png" />
                <IconImage src="/images/User.png" />
            </IconContainer>
        </HeaderContainer>
    );
}

export default Header;