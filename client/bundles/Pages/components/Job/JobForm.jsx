import React, { useState } from "react";
import PropTypes from "prop-types";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import axios from "axios";
import setRequestHeaders from "../RequestHeaders";
import { statuses } from '../../utilities';
import { AccordionBody, AccordionHeader } from "react-bootstrap";

const JobForm = ({ createJob, clients, categories }) => {
  const [clientId, setClientId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear() - 1);
  const [status, setStatus] = useState('todo');
  const [price, setPrice] = useState(0);
  const [paid, setPaid] = useState(false);

  const resetForm = () => {
    setClientId(null);
    setYear(new Date().getFullYear() - 1);
    setStatus('todo');
    setPaid(false);
    setPrice(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestHeaders();
    axios.post("/api/v1/jobs", {
      job: {
        client_id: clientId,
        year,
        status,
        category_id: categoryId,
        price,
        paid,
      },
    })
      .then((response) => {
        const job = response.data;
        createJob(job);
        resetForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container fluid>
      <Accordion>
        <AccordionHeader>
          Create New Job
        </AccordionHeader>
        <AccordionBody>
          <form onSubmit={(e) => handleSubmit(e)} className="my-3">
            <Row>
              <Col>
                <label> Client
                  <select className="form-select" onChange={(e) => setClientId(e.target.value)}>
                    <option selected>Select a client</option>
                    {clients && clients.filter((client) => !client.archived).map((client) => <option value={client.id}> {`${client.last_name}, ${client.first_name}`} </option>
                    )}
                  </select>
                </label>
              </Col>
              <Col>
                <label> Status
                  <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    {statuses.map((status) => <option value={status}> {status} </option>
                    )}
                  </select>
                </label>
              </Col>
              <Col>
                <label> Type
                  <select className="form-select" onChange={(e) => setCategoryId(parseInt(e.target.value, 10))}>
                    <option selected>Select a type</option>
                    {categories && categories.map((category) => <option value={category.id}> {category.name} </option>
                    )}
                  </select>
                </label>
              </Col>
              <Col>
                <label>Year
                  <input
                    type="text"
                    name="year"
                    required
                    className="form-control"
                    id="year"
                    placeholder='Year'
                    defaultValue={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </label>
              </Col>
              <Col>
                <label>Price
                  <input
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-control"
                    placeholder='price'
                  />
                </label>
              </Col>
              <Col xs>
                <div class="form-check form-switch">
                  <Row>
                    <label class="form-check-label" for="flexSwitchCheckDefault">Paid?</label>
                  </Row>
                  <Row>
                    <Container>
                      <input type="checkbox" onChange={() => setPaid(!paid)} />
                    </Container>
                  </Row>
                </div>
              </Col>
              <Col>
                <Button onClick={(e) => handleSubmit(e)} variant="outline-success">
                  Add Job
                </Button>
              </Col>
            </Row>
          </form>
        </AccordionBody>
      </Accordion>
    </Container >
  );
}


export default JobForm;
