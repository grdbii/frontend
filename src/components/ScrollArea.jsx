import styled from "styled-components"

import "../assets/styles.css"

const ScrollArea = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  overflow: auto;

  &::-webkit-scrollbar {
    width: 1rem;
    height: 1rem;
  }

  &::-webkit-scrollbar-corner {
    color: transparent;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-inactive);
    box-shadow: inset var(--shadow-inactive);
    border-radius: 2rem;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: var(--color-active);
    box-shadow: inset var(--shadow-active);
  }
`

export default ScrollArea
