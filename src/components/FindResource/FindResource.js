import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import SearchResultLeftPanel from '../SearchResultLeftPanel/SearchResultLeftPanel';
import SearchResultRightPanel from '../SearchResultRightPanel/SearchResultRightPanel';
import Select from 'react-select'
import AutocompleteSearchBox from '../AutocompleteSearchBox/AutocompleteSearchBox';

import './FindResource.css';

class FindResource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      lat: null,
      long: null,
      showNarrowSearch: false,
      showSearchResults: false,
      narrowSearchOptions: {
        distanceInMilesSelection: 5,
      },
      searchResults: null,
    }
  }

  handleMileDropdownChange = event => {
    const { narrowSearchOptions } = this.state;

    this.setState({
      narrowSearchOptions: {
        ...narrowSearchOptions,
        distanceInMilesSelection: parseInt(event.target.value)
      }
    });
  }

  handleNarrowSearchChange = (category, event) => {
    const { narrowSearchOptions } = this.state;
    narrowSearchOptions[category] = event == null ? [] : event.map(x => x.value);
    this.setState(narrowSearchOptions);
  }

  renderNarrowSearch = () => {
    const { narrowSearchOptions } = this.state;
    const { distanceInMilesSelection } = narrowSearchOptions;
    const preventionOptions = [
      { value: 'Awareness and Education', label: 'Awareness and Education' },
      { value: 'Physician Education', label: 'Physician Education' },
      { value: 'Political Advocacy', label: 'Political Advocacy' },
    ]
    const recoveryOptions = [
      { value: 'Medicated Assisted Treatment', label: 'Medicated Assisted Treatment' },
      { value: 'Inpatient Rehabilitation', label: 'Inpatient Rehabilitation' },
      { value: 'Outpatient Rehabilitation', label: 'Outpatient Rehabilitation' },
      { value: 'Gender-Specific Treatment', label: 'Gender-Specific Treatment' },
      { value: 'Intervention Specialists', label: 'Intervention Specialists' },
      { value: 'Recovery Residences', label: 'Recovery Residences' },
    ]
    const mentalHealthOptions = [
      { value: 'Counseling/Therapy', label: 'Counseling/Therapy' },
      { value: 'Support Groups', label: 'Support Groups' },
    ]
    const payOptions = [
          { value: 'Sliding Scale', label: 'Sliding Scale' },
          { value: 'Free', label: 'Free' },
          { value: 'Paid', label: 'Paid' },
    ]
    const harmReductionOptions = [
      { value: 'Overdose Response', label: 'Overdose Response' },
      { value: 'Needle Exchange Programs', label: 'Needle Exchange Programs' },
      { value: 'Vaccine and Prophylaxis Clinics', label: 'Vaccine and Prophylaxis Clinics' },
    ]
    const pregnancyOptions = [
      { value: 'Pregnancy Support', label: 'Pregnancy Support' },
    ]
    const transportOptions = [
      { value: 'Transportation', label: 'Transportation' },
    ]
    const demographicOptions = [
      { value: 'Adults', label: 'Adults' },
      { value: 'LGBTQ+', label: 'LGBTQ+' },
      { value: 'Veterans', label: 'Veterans' },
      { value: 'Seniors', label: 'Seniors' },
      { value: 'Children', label: 'Children' },
      { value: 'Adolescents', label: 'Adolescents' },
      { value: 'Young Adults', label: 'Young Adults' },
      { value: 'Homeless', label: 'Homeless' },
    ]

    return (
      <Card className="narrow-search-card">
        <Card.Body className="narrow-search-field-card" style={{'marginTop': '10px'}}>
          <Container>
            <Row>
              <Col lg={6} xl={4}>Prevention:</Col>
              <Col><Select closeMenuOnSelect={false} isMulti options={preventionOptions} onChange={e => this.handleNarrowSearchChange('Prevention', e)} /></Col>
            </Row>
            <Row>
              <Col lg={6} xl={4}>Recovery:</Col>
              <Col><Select closeMenuOnSelect={false} isMulti options={recoveryOptions} onChange={e => this.handleNarrowSearchChange('Recovery', e)} /></Col>
            </Row>
            <Row>
              <Col lg={6} xl={4}>Mental Health Resources:</Col>
              <Col><Select closeMenuOnSelect={false} isMulti options={mentalHealthOptions} onChange={e => this.handleNarrowSearchChange('Mental Health Resources', e)} /></Col>
            </Row>
            <Row>
              <Col lg={6} xl={4}>Payment:</Col>
              <Col><Select closeMenuOnSelect={false} isMulti options={payOptions} onChange={e => this.handleNarrowSearchChange('Payment', e)} /></Col>
            </Row>
            <Row>
              <Col lg={6} xl={4}>Harm Reduction:</Col>
              <Col><Select closeMenuOnSelect={false} isMulti options={harmReductionOptions} onChange={e => this.handleNarrowSearchChange('Harm Reduction', e)} /></Col>
            </Row>
            <Row>
              <Col lg={6} xl={4}>Pregnancy Support:</Col>
              <Col><Select closeMenuOnSelect={false} isMulti options={pregnancyOptions} onChange={e => this.handleNarrowSearchChange('Pregnancy Support', e)} /></Col>
            </Row>
            <Row>
              <Col lg={6} xl={4}>Transportation:</Col>
              <Col><Select closeMenuOnSelect={false} isMulti options={transportOptions} onChange={e => this.handleNarrowSearchChange('Transportation', e)} /></Col>
            </Row>
            <Row>
              <Col lg={6} xl={4}>Demographic:</Col>
              <Col><Select closeMenuOnSelect={false} isMulti options={demographicOptions} onChange={e => this.handleNarrowSearchChange('Demographic', e)} /></Col>
            </Row>
            <Row style={{'marginTop': '20px'}}>
              <Col xs xl={4}>Distance in Miles:</Col>
              <Col xs="auto">
                <Form>
                  <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Control as="select" value={distanceInMilesSelection} onChange={this.handleMileDropdownChange} custom>
                      <option>5</option>
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }

  handlePlaceSelect = (query, lat, lng) => {
    const {
      narrowSearchOptions
    } = this.state;
    const {
      distanceInMilesSelection,
    } = narrowSearchOptions;
    let allTags = [];
    for(const [key, value] of Object.entries(narrowSearchOptions)) {
      if (key !== 'distanceInMilesSelection') {
        allTags = allTags.concat(value);
      }
    }

    if (query && lat && lng) {
      this.setState({
        query,
        lat,
        long: lng,
        showSearchResults: true,
      }, () => {
        fetch(`/api/v1/data/resources?lat=${lat}&long=${lng}&radius=${distanceInMilesSelection}&tags=${allTags.toString()}`)
          .then(res => res.json())
          .then(results => this.setState({searchResults: results}))
      });
    }
  }

  handleQueryChange = (query) => this.setState({ query });

  render(){
    const {
      showNarrowSearch,
      showSearchResults,
      narrowSearchOptions,
      query,
      lat,
      long,
      searchResults,
    } = this.state;

    return (
      <div className="FindResource">
        {!showSearchResults &&
          <Container fluid className="top-container">
            <Row className="justify-content-md-center">
              <Col xs={12} sm={12} md={6} lg={6}>
                <h3 className="home-main-text">Millions of Americans Have an Opiod-Use Disorder and Even More Misuse Them. <br/> Help is available.</h3>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs={12} sm={12} md={6} lg={6} style={{'marginTop': '20px', 'float': 'left'}}>
                <AutocompleteSearchBox
                  query={query}
                  onQueryChange={this.handleQueryChange}
                  onPlaceSelect={this.handlePlaceSelect}
                />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs={12} sm={12} md={6} lg={6} className="narrow-search-button-col">
                <Button className="justify-content-md-start shadow-none" id="narrow-search-button" onClick={() => this.setState({showNarrowSearch: !this.state.showNarrowSearch})}>Narrow Search &gt;&gt;</Button>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs={12} sm={12} md={6} lg={6}>
                {showNarrowSearch && this.renderNarrowSearch()}
              </Col>
            </Row>
          </Container>
        }
        {!showSearchResults &&
          <Card className="container" id="card-home-blurb-container">
            <Card.Body>
              <div className="card-main-text">
                Welcome to CORAbase, a confidential and anonymous source of information and resources for persons seeking opioid-related resources in the United States or U.S. Territories. We are the nation’s most comprehensive database of resources for opioid-use/addiction treatment, prevention, overdose response, and <b>resources in rural areas.</b>
              </div>
              <div className="card-note-text">
                PLEASE NOTE: Your personal information and the search criteria you enter into the Locator is secure and anonymous. CORA does not collect or maintain any information you provide.
              </div>
                <Nav.Link href="/general-info"><Button id="learn-cora-button"><b>Learn More About Corabase</b></Button></Nav.Link>
            </Card.Body>
          </Card>
        }
        {showSearchResults &&
          <div className="results-container">
            <div className="left-panel">
              <SearchResultLeftPanel
                address={query}
                narrowSearchOptions={narrowSearchOptions}
              />
            </div>
            <div className="right-panel">
              <SearchResultRightPanel
                lat={lat}
                long={long}
                searchResults={searchResults}
              />
            </div>
          </div>
        }
      </div>
    )
  }
}

export default FindResource;
