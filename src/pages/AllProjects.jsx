import React from "react";
// Styles
import styled from "styled-components";
// State
import { useSelector } from "react-redux";
import { selectProjects } from "../app/projectsSlice";
import { useGetUsersQuery, useGetProjectsQuery } from "../app/apiSlice";
// Icons
import { Icon } from "@iconify/react/dist/iconify.js";
// Components
import {
  Col,
  Container,
  FormControl,
  InputGroup,
  Pagination,
  Row,
} from "react-bootstrap";
import Loading from "../components/Loading";
import Title from "../components/Title";
import ProjectCard from "../components/ProjectCard";
import BackToTop from "../components/BackToTop";
// Utils
import { updateTitle } from "../utils";
import { useTranslation } from 'react-i18next';

// #region styled-components
const StyledSection = styled.section`
  .input-group {
    max-width: 90vw;
  }

  @media screen and (min-width: 800px) {
    .input-group {
      width: 75%;
    }
  }
`;
// #endregion

// #region component
const AllProjects = () => {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = React.useState("");
  const [filteredResults, setFilteredResults] = React.useState([]);
  const [pageItems, setPageItems] = React.useState([]);
  const [activePage, setActivePage] = React.useState(1);
  const data = useSelector(selectProjects);
  const { data: userData } = useGetUsersQuery();
  const { isLoading, isSuccess, isError, error } = useGetProjectsQuery();
  let content;

  React.useEffect(() => {
    updateTitle(`${userData.name} | All Projects`);
  }, [userData]);

  React.useEffect(() => {
    let filteredData = [...data];
    if (searchInput !== "") {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
  
    const totalPages = Math.ceil(filteredData.length / 6);
    const pageStart = (activePage - 1) * 6;
    const pageEnd = activePage * 6;
  
    setFilteredResults(filteredData.slice(pageStart, pageEnd));
  
    const tempPageItems = [];
    for (let number = 1; number <= totalPages; number++) {
      tempPageItems.push(
        <Pagination.Item
          key={number}
          active={number === activePage}
          onClick={() => setActivePage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    setPageItems(tempPageItems);
  }, [searchInput, data, activePage]);

  React.useEffect(() => {
    setActivePage(1);
  }, [searchInput]);

  if (isLoading) {
    content = (
      <>
        <Container className="d-flex justify-content-center">
          <Title size={"h2"} text={t("All Projects")} />
        </Container>
        <Container className="d-flex flex-column justify-content-center">
          <Loading />
        </Container>
      </>
    );
  } else if (isSuccess) {
    content = (
      <>
        <Container className="d-flex justify-content-center">
          <Title size={"h2"} text={"All Projects"} />
        </Container>
        <Container>
          <InputGroup className="mx-auto mb-3">
            <InputGroup.Text id="search">
              <Icon icon="ic:round-search" />
            </InputGroup.Text>
            <FormControl
              placeholder={t("Project name")}
              aria-label="Search projects"
              aria-describedby="search"
              onChange={(e) => setSearchInput(e.currentTarget.value)}
            />
          </InputGroup>
          <Row xs={1} md={2} lg={3} className="g-4 justify-content-center row">
            {searchInput.length > 0
              ? filteredResults.map((element) => {
                  return (
                    <Col key={element.id}>
                      <ProjectCard
                        image={element.image}
                        name={element.name}
                        description={element.description}
                        url={element.html_url}
                        demo={element.homepage}
                      />
                    </Col>
                  );
                })
              : filteredResults.map((element) => {
                  return (
                    <Col key={element.id}>
                      <ProjectCard
                        image={element.image}
                        name={element.name}
                        description={element.description}
                        url={element.html_url}
                        demo={element.homepage}
                      />
                    </Col>
                  );
                })}
          </Row>
          <Container className="d-flex justify-content-center mt-5">
  {pageItems.length <= 2 ? (
    <Pagination size="lg">{pageItems}</Pagination> // Caso tenha poucas páginas
  ) : (
    <Pagination>
      <Pagination.Prev
        onClick={() =>
          activePage === 1
            ? setActivePage(pageItems.length)
            : setActivePage(activePage - 1)
        }
      />
      {/* Exibe todos os números de página */}
      {pageItems.map((item) => item)}
      <Pagination.Next
        onClick={() =>
          activePage === pageItems.length
            ? setActivePage(1)
            : setActivePage(activePage + 1)
        }
      />
    </Pagination>
  )}
</Container>

        </Container>
      </>
    );
  } else if (isError) {
    content = (
      <Container className="d-flex align-items-center justify-content-center">
        <h2>{`${error.status} - check URLs in  src/app/apiSlice.js`}</h2>
      </Container>
    );
  }

  return (
    <>
      <main>
        <StyledSection className="d-flex flex-column justify-content-center">
          {content}
        </StyledSection>
      </main>
      <BackToTop home={"Home"} />
    </>
  );
};
// #endregion

export default AllProjects;
