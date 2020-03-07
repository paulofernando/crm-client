import React from "react";
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Typeahead } from "react-bootstrap-typeahead"

const GET_CASES_TITLES = gql`
  query {
    courtCases {
      id
      title
    }
  }
`;

class AutocompleteCase extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: ""
    };
    
  }

  render() {
    return (
      <Query query={GET_CASES_TITLES}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching...</div>
          if (error) return <div>Error</div>

          const options = []
          data.courtCases.map(item => (
            options.push({label: item.title, id: item.id})
          ))

          return (
            <Typeahead
                id="autocompleteCases"
                value={this.props.value}
                onChange={selected => this.setState({ selected })}
                options={options}
                placeholder="Choose a case..."
              />
          )
        }}
      </Query>
    )
  }
}

export default AutocompleteCase;