import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import axios from "axios";
import setRequestHeaders from "../RequestHeaders";
import { optionsMap } from '../../utilities';

const ClientForm = ({ createClient, categories }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState(null);

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setSelectedCategories(null);
  }

  useEffect(() => {
    if (categories) {
      setCategoryOptions(optionsMap(categories));
    }
  }, [categories])

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequestHeaders();
    const categoryIds = selectedCategories.map((category) => category.value);
    axios
      .post("/api/v1/clients", {
        client: {
          first_name: firstName,
          last_name: lastName,
          email,
          category_ids: categoryIds,
        },
      })
      .then((response) => {
        const client = response.data;
        createClient(client);
        resetForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Accordion>
      <Accordion.Header>
        Create New Client
      </Accordion.Header>
      <Accordion.Body>
        <form onSubmit={(e) => handleSubmit(e)} className="my-3">
          <Row>
            <Col>
              <input
                type="text"
                name="firstName"
                required
                className="form-control"
                id="firstName"
                placeholder='first name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                name="lastName"
                required
                className="form-control"
                id="lastName"
                value={lastName}
                placeholder='last name'
                onChange={(e) => setLastName(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                name="email"
                required
                className="form-control"
                id="email"
                value={email}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
            <Col>
              <Select
                placeholder="select client types"
                defaultValue={selectedCategories}
                onChange={setSelectedCategories}
                options={categoryOptions}
                value={selectedCategories}
                isMulti
              />
            </Col>
            <Col>
              <Button onClick={(e) => handleSubmit(e)} variant="outline-success">
                Add Client
              </Button>
            </Col>
          </Row>
        </form>
      </Accordion.Body>
    </Accordion>
  );
}

export default ClientForm;

ClientForm.propTypes = {
  createClient: PropTypes.func.isRequired,
};
