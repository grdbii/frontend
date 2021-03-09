import React, { useReducer, useEffect } from "react"
import styled from "styled-components"
import axios from "axios"
import Katex from "react-latex"
import Select from "react-select"

import ScrollArea from "./ScrollArea"

import "katex/dist/katex.min.css"
import "../assets/styles.css"

const Container = styled.div`
  display: flex;
  justify-content: center;

  position: relative;
  width: max(60vw, 60rem);
  height: 60%;

  font-size: 1.25rem;
`

const Viewport = styled.div`
  position: relative;

  background-color: var(--light-grey-2);
  box-shadow: inset var(--shadow-active);
  border-radius: 1rem;
`

const ControllerContainer = styled(Viewport)`
  flex-grow: 1;
`

const EquationContainer = styled(Viewport)`
  flex-grow: 2;

  margin: 0 1rem;
  height: 100%;

  font-size: ${props => props.fontSize};
`

const ScrollContainer = styled(ScrollArea)`
  margin: 1rem 2rem;
`

const EquationBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`

const KatexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: fit-content;
`

const DataContainer = styled.div`
  margin-bottom: 1rem;
`

const DataTitle = styled.h3``

const DataContent = styled.div``

const CoordinateSelect = styled(Select)`
  width: 90%;
  margin-bottom: 1rem;
  padding: 2px;

  background-color: var(--light-grey-2);
  outline: none;
`

const Separator = styled.hr`
  margin: 1.5rem;
`

const Button = styled.button`
  box-sizing: border-box;
  min-height: 38px;
  width: 90%;
  margin-left: 1px;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  border-color: hsl(0, 0%, 80%);
  background-color: white;
  transition: all 100ms;

  &:not(:first-child) {
    margin-top: 0.5rem;
  }

  &:hover {
    border-color: #2684ff;
    box-shadow: 0 0 0 1px #2684ff;
  }
`

const Data = props => (
  <DataContainer>
    <DataTitle>{props.title}:</DataTitle>
    <DataContent>{props.children}</DataContent>
  </DataContainer>
)

const DataList = props =>
  React.Children.count(props.children) !== 0 ? (
    <Data title={props.title}>{props.children}</Data>
  ) : null

const VariationSelect = props => {
  if (!props.variations || !props.variations.length) {
    return
  }

  const sets = props.variations.reduce((acc, metric) => {
    acc[metric["coordinate_type"]] = [
      ...(acc[metric["coordinate_type"]] || []),
      metric,
    ]
    return acc
  }, {})

  const singleOptions = Object.entries(sets)
    .filter(entry => entry[1].length === 1)
    .map(entry => ({ label: entry[0], value: entry[1][0] }))

  const groupOptions = Object.entries(sets)
    .filter(entry => entry[1].length > 1)
    .map(entry => ({
      label: entry[0],
      options: entry[1].map(e => ({ label: e.notes || "TODO", value: e })),
    }))

  return (
    <CoordinateSelect
      defaultValue={{
        label: props.defaultValue["coordinate_type"],
        value: props.defaultValue,
      }}
      options={[...singleOptions, ...groupOptions]}
      isSearchable={false}
      onChange={props.onChange}
    />
  )
}

const Equation = props => {
  return (
    <KatexContainer>
      <Katex displayMode={true}>{props.children}</Katex>
    </KatexContainer>
  )
}

const Latex = props => {
  const [state, setState] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "fetch":
          return { ...state, calculation: action.calculation, loading: true }

        case "update":
          return { ...state, metric: action.metric, loading: true }

        case "sync":
          return { ...state, equations: action.equations, loading: false }

        default:
          return state
      }
    },
    {
      calculation: "metric",
      metric: props.metric,
      equations: props.metric.metric,
      loading: false,
    }
  )

  useEffect(() => {
    if (!state.loading) {
      return
    }

    const fetchData = async () => {
      const result = await axios(
        `http://localhost:4001/calc?id=${state.metric.id}&attr=${state.calculation}`
      )
      setState({ type: "sync", equations: result.data })
    }

    const metricCalculation = state.metric[state.calculation]
    if (metricCalculation && metricCalculation.length !== 0) {
      setState({ type: "sync", equations: metricCalculation })
    } else {
      fetchData()
    }
  }, [state.loading, state.metric, state.calculation])

  const buttons = [
    ["Metric", "metric"],
    ["Christoffel Symbols", "christoffel"],
    ["Riemann Tensor", "riemann"],
    ["Ricci Tensor", "ricci_tensor"],
    ["Ricci Scalar", "ricci_scalar"],
    ["Einstein Tensor", "einstein"],
    ["Weyl Tensor", "weyl"],
  ].map((info, index) => (
    <Button
      key={index}
      onClick={() => setState({ type: "fetch", calculation: info[1] })}
    >
      {info[0]}
    </Button>
  ))

  const equationFontSize =
    100 * (1 + 1 / (1 + Math.exp(state.equations.length - 4)))

  const equations = Array.isArray(state.equations) ? (
    state.equations.map((equation, index) => (
      <Equation key={`${state.metric.id}/${state.calculation}/${index}`}>
        {`$$ ${equation} $$`}
      </Equation>
    ))
  ) : (
    <Equation>{`$$ ${state.equations} $$`}</Equation>
  )

  return (
    <Container>
      <ControllerContainer>
        <ScrollContainer>
          <Data title="Variations">
            <VariationSelect
              defaultValue={state.metric}
              variations={props.variations}
              onChange={e => setState({ type: "update", metric: e.value })}
            />
          </Data>

          <Data title="Coordinates">
            <Katex>{`$ (${state.metric.coordinates}) $`}</Katex>
          </Data>

          <DataList title="Symmetry">
            <p>{state.metric.symmetries?.join(", ")}</p>
          </DataList>

          <DataList title="References">
            {state.metric.references?.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </DataList>

          <Separator />

          <Data title="Display">{buttons}</Data>
        </ScrollContainer>
      </ControllerContainer>

      <EquationContainer fontSize={`${equationFontSize}%`}>
        <ScrollContainer>
          {!state.loading && <EquationBox>{equations}</EquationBox>}
        </ScrollContainer>
      </EquationContainer>
    </Container>
  )
}

export default Latex
