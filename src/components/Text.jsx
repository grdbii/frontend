import React from "react"
import styled from "styled-components"

import "../assets/styles.css"

const PrimaryHeader = styled.h1`
  text-align: center;
  font-family: "Libre Baskerville";
  font-weight: 700;
  font-size: ${props => props.fontSize};
`

const SecondaryHeader = styled.h2`
  text-align: center;
  font-family: "Libre Baskerville";
  font-weight: 700;
  font-size: ${props => props.fontSize};
`

const Title = props => (
  <PrimaryHeader {...props}>{props.children}</PrimaryHeader>
)

const SubTitle = props => (
  <SecondaryHeader {...props}>{props.children}</SecondaryHeader>
)

export { Title, SubTitle }
