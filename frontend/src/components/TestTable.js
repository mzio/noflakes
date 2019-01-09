import React, { Component } from "react";
import { hot } from "react-hot-loader";
import ReactDOM from "react-dom";
// import { Heading } from "rebass";

class PactRow extends React.Component {
  constructor(props) {
    super(props);
    // this.formatDateString = this.formatDateString(this);
  }
  // formatDateString(date) {
  //   console.log(date instanceof Date);
  //   stringDate = date.toLocaleDateString("en-US");
  //   stringTime = date.toLocaleTimeString("en-US");
  //   return stringDate + " " + stringTime;
  // }
  render() {
    const pact = this.props.pact;
    const name = pact.name;
    const endDate = pact.endDate;
    const stringDate = endDate.toLocaleDateString("en-US");
    const stringTime = endDate.toLocaleTimeString("en-US");
    return (
      <tr>
        <td>{name}</td>
        <td>
          {stringDate} {stringTime}
        </td>
      </tr>
    );
  }
}

class PactTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const rows = [];
    console.log(this.props.pacts);
    this.props.pacts.forEach(pactObject => {
      rows.push(<PactRow pact={pactObject} key={pactObject.id} />);
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    const filterText = this.props.filterText;
    return (
      <form>
        <input
          type="text"
          placeholder="Search for Pacts..."
          value={filterText}
        />
      </form>
    );
  }
}

class FilterablePactTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filterText: "" };
  }
  render() {
    return (
      <div>
        <SearchBar filterText={this.state} />
        <PactTable
          pacts={this.props.pacts}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}

class TestTable extends Component {
  render() {
    const PACTS = [
      {
        id: "1",
        name: "Pact1",
        description: "Description1",
        startDate: new Date(),
        endDate: new Date()
      },
      {
        id: "2",
        name: "Pact2",
        description: "Description2",
        startDate: new Date(),
        endDate: new Date()
      },
      {
        id: "3",
        name: "Pact3",
        description: "Description3",
        startDate: new Date(),
        endDate: new Date()
      },
      {
        id: "4",
        name: "Pact4",
        description: "Description4",
        startDate: new Date(),
        endDate: new Date()
      }
    ];
    return <FilterablePactTable pacts={PACTS} />;
  }
}

export default hot(module)(TestTable);
