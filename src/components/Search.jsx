import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faListUl } from "@fortawesome/free-solid-svg-icons"
import ReactTooltip from "react-tooltip"

import { ModalContext } from "./Modal"

import "../assets/styles.css"

const Container = styled.div`
  position: relative;
  width: 58rem;
  height: 3.75rem;
  z-index: 10;

  background-color: white;
  border-radius: 1.9rem;

  font-size: 1.5rem;
`

const SearchBox = styled.div`
  display: grid;
  grid-template-columns: 4rem auto 4rem;
  justify-items: stretch;
  align-items: center;

  min-height: 3.75rem;
  width: 100%;

  background-color: white;
  border: 1px solid var(--light-grey-0);
  border-radius: 1.9rem;
  box-shadow: ${props => (props.highlight ? "var(--shadow-active)" : "none")};

  &:hover {
    box-shadow: var(--shadow-active);
  }

  &:before {
    content: "";

    grid-row: 1;
    grid-column: 1 / span 3;

    padding-top: 3.75rem;
  }
`

const SearchIcon = styled.div`
  display: inline-flex;
  justify-content: center;
  grid-row: 1;
  grid-column: 1;

  color: var(--color-inactive-1);
`

const Input = styled.input`
  grid-row: 1;
  grid-column: 2;

  padding: 0;

  font-family: sans-serif;
  opacity: 0.8;
  background: transparent;
`

const ListAll = styled.button`
  display: inline-flex;
  justify-content: center;
  grid-row: 1;
  grid-column: 3;

  padding: 0;

  color: var(--color-inactive-1);

  transition: color 100ms ease;

  &:hover {
    color: var(--color-active-1);
  }
`

const Tooltip = styled(ReactTooltip)`
  padding: 0.4rem 1rem;

  font-size: 1.2rem !important;
  font-family: sans-serif;
`

const SuggestionContainer = styled.ul`
  grid-row: 2;
  grid-column: 1 / span 3;

  margin: 0;

  font-family: sans-serif;
  list-style-type: none;
  border-bottom-left-radius: 1.9rem;
  border-bottom-right-radius: 1.9rem;

  li {
    margin: 0;
    padding: 0.4rem 0 0.4rem 4rem;

    cursor: default;
  }

  li:hover {
    background: var(--light-grey-1);
  }

  a:last-child li:last-child {
    border-bottom-left-radius: 1.9rem;
    border-bottom-right-radius: 1.9rem;
  }
`

const Link = styled.a``

const Item = styled.li``

const Search = () => {
  const setModal = useContext(ModalContext)

  const [items, setItems] = useState([])
  const [query, setQuery] = useState("")
  const [highlight, setHighlight] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:4001/search?q=${query}`)
      setItems(result.data || [])
    }

    if (query) {
      fetchData()
    } else {
      setItems([])
    }
  }, [query])

  const suggestions = items.map((item, index) => (
    <Link key={`${query}/${index}`} href={`/view?id=${item.id}`}>
      <Item dangerouslySetInnerHTML={{ __html: item.match }} />
    </Link>
  ))

  return (
    <Container>
      <SearchBox highlight={highlight}>
        <SearchIcon>
          <FontAwesomeIcon icon={faSearch} />
        </SearchIcon>
        <Input
          type="text"
          name="query"
          placeholder="Search spacetimes..."
          aria-label="Search GRDBII Database"
          maxLength="2048"
          spellCheck="false"
          autoCorrect="false"
          autoComplete="false"
          onChange={event => setQuery(event.target.value)}
          onFocus={() => setHighlight(true)}
          onBlur={() => setHighlight(false)}
        />
        <ListAll data-tip data-for="ListAll" onClick={() => setModal(true)}>
          <FontAwesomeIcon icon={faListUl} />
        </ListAll>
        <Tooltip id="ListAll" effect="solid">
          <span>List All Metrics</span>
        </Tooltip>
        <SuggestionContainer>{suggestions}</SuggestionContainer>
      </SearchBox>
    </Container>
  )
}

export default Search
