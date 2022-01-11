import React from "react";
import styled from "styled-components";
import Template from "../Template";
import Header from "../Header";
import { CheckBox } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
// import Ax from "../../ax";

// 리스트 컬럼 정리
const THBlock = styled.div`
  display: flex;
  justify-content: space-between;
  /* background: lightblue; */
  height: 45px;
  color: black;

  span {
    margin: auto 25px;
  }
`;
//리스트 백그라운드
const ListStyled = styled.div`
  background: white;

  width: 100%;
  display: inline;

  a:link,
  a:visited {
    text-decoration: none;
    color: inherit;
  }
  a:hover {
    text-decoration: underline;
  }

  div {
    /* display: flex; */
    justify-content: space-around;
  }
  .plist {
    display: flex;
    justify-content: space-between;
    margin: 0 10%;
  }
`;


const ListContents = styled.div`
  width: 90%;
  color: black;
  
  display: flex;
  /* justify-conent: space-between; */
  margin: 15px auto;
  padding: 10px;
  font-size: 18px;
  
  background: white;
  border-radius: 10px;
  border: solid lightgray 1px;
  
  div {
    margin: auto 0;
    display: flex;
  }
  `;
export default function Lists() {
  const urlpath = "http://localhost:3001/mypage/buylist"
  // const resp = await axios.get(urlpath)
  // console.log(resp);
  const [lists, setLists] = useState([])
  
  const callApi = async() => {
    const response = await axios.get("http://localhost:3001/mypage/buylist")
    setLists([...lists,...response.data])
  }
  console.log(lists);

  useEffect(() => {
    callApi();
  },[]);


  const pHeader = ["상품명", "이미지", "가격", "날짜"];
  const dt = new Date(); //will be change
  const products = [
    {
      id: 1,
      title: "1234",
      url: "/list1",
      img: "https://placeimg.com/64/64/1",
      price: 3300,
      date: dt.toLocaleDateString()
    },
  ];
  // console.log(products);
  const title = "구매내역";

  // 체크박스 넘버 가져올때 ref

  return (
    <>
      <Template>
        <Header props={title} />
        <THBlock>
          <CheckBox value="chkAll" />
          {pHeader.map((hh) => (
            <span>{hh}</span>
          ))}
        </THBlock>
        <hr />
        <ListStyled>
          {lists.map((tt) => (
            <ListContents>
              <CheckBox value={tt.id} key={tt.id} maxWith="5%" />
              <div className="plist"></div>
              <a  className="plist">
                <div>{tt.title}</div>
                <img src={tt.image} alt="상품 로딩중.." />
                <div> {tt.price}</div>
                <div> {tt.tradeDate}</div>
              </a>
            </ListContents>
          ))}
        </ListStyled>
      </Template>
    </>
  );
}
