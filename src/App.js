import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
    },
    {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
    },
  ];
  
const userService = {
  getUserName(user) {
  return user.firstname + ' ' + user.lastname;
  },
};

function isSearched(searchTerm) {
  return item => item.title.toLowerCase().includes(searchTerm.toLowerCase());
}

// Functional stateless components
const Button = ({ onClick, className = '', children }) => 
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>

const Search = ({ value, onChange, children }) =>
  <form>
    {children} <input
      type="text"
      value={value}
      onChange={onChange}
    />
  </form> 

const Table = ({ list, pattern, onDismiss }) =>
  <div className="table">
    {list.filter(isSearched(pattern)).map(item => 
      <div key={item.objectID} className="table-row">
        <span style={{ width: '40%' }}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: '30%' }}>{item.author}</span>
        <span style={{ width: '10%' }}>{item.num_comments}</span>
        <span style={{ width: '10%' }}>{item.points}</span>
        <span style={{ width: '10%' }}>
          <Button onClick={() => onDismiss(item.objectID)} className="button-inline">
            Dismiss
          </Button>
        </span>
      </div>
    )}
  </div>
   
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: '',
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }  
  
  render() {
    const { searchTerm, list } = this.state;
    return (
        <div className="page"> 
          <div className="interactions">
            <Search
              value={searchTerm}
              onChange={this.onSearchChange}
            />
          </div> 
          <Table
            list={list}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
        </div>
    );
  }

  

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }
    
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
    
}

export default App;


// Class component version of the Search component

// class Button extends Component {
//   render() {
//     const {
//       onClick,
//       className = '',
//       children,
//     } = this.props;

//     return (
//       <button
//         onClick={onClick}
//         className={className}
//         type="button"
//       >
//       {children}
//       </button>
//     );
//   }
// }
 
// class Search extends Component {
//   render() {
//     const { value, onChange } = this.props;
//     return (
//       <form>
//         <input
//           type="text"
//           value={value}
//           onChange={onChange}
//         />
//       </form>
//     );
//   }
// }

// class Table extends Component {
//   render() {
//     const { list, pattern, onDismiss } = this.props;
//     return (
//       <div>
//         {list.filter(isSearched(pattern)).map(item => 
//           <div key={item.objectID}>
//             <span>
//               <a href={item.url}>{item.title}</a>
//             </span>
//             <span>{item.author}</span>
//             <span>{item.num_comments}</span>
//             <span>{item.points}</span>
//             <span>
//             <Button onClick={() => onDismiss(item.objectID)}>
//               Dismiss
//             </Button>
//             </span>
//           </div>
//         )}
//       </div>
//     );
//   }
// }