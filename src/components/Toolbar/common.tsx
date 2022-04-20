import React from "react";
import styled from "styled-components"

export interface ToolbarItemProps {
    isActive?: boolean;
}

export const Container = styled.div`
  display: flex;
  margin-right: 7px;
`

export const ToolbarItem = styled.div<ToolbarItemProps>`
  width: 28px;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  box-shadow: 0 0 3px 1px rgba(15, 15, 15, 0.17);
  background-color: #FFF;
  color: #0d2e6e;
  font-size: 16px;
  font-family: Oxygen sans-serif;
  transition: all 250ms ease-in-out;
  cursor: pointer;
  
  ${props => props.isActive && 
  `
  
  transform: translateY(1px);
  color: #FFF;
  background-color: #0d2e6e;
  box-shadow: none;
  border: 1px solid #34495E;
  `
}
  &:hover {
    transform: translateY(1px);
    color: #FFF;
    background-color: #0d2e6e;
    box-shadow: none;
    border: 1px solid #34495E;
  }
  
`
