import styled from "styled-components";
import Box from "../Box";

export const ProfileRelationsBoxWrapper = styled(Box)`
  overflow: hidden;
  ul {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: 1fr 1fr 1fr; 
    max-height: 220px;
    list-style: none;
  }
  img {
    object-fit: cover;
    background-position: center center;
    width: 100%;
    height: 100%;
    position: relative;
  }
  ul li a {
    display: inline-block;
    background-color:  black;
    height: 102px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    .spanBG {
      width: 100%;
      text-align: center;
      background: rgba(0, 0, 0, 0.864);
      padding: 30px;
      position: absolute;
      left: 0;
      bottom: -10px;
      z-index: 2;
      padding: 5px 4px;
    }
    span {
      color: #FFFFFF;
      font-size: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-indeX: 1;
      background-image: linear-gradient(0deg,#00000073,transparent);
    }
  }
`;