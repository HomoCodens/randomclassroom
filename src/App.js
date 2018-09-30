import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StudentList from './StudentList.js';
import DeskTable from './DeskTable';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = this.getInitState();
  }

  getInitState = () => {

    if(window.localStorage != null) {
      const item = window.localStorage.getItem('randomClassroomState');
      if(item != null) {
        return JSON.parse(item);
      } else {
        return {
          students: ['Alice', 'Bob', 'Charlice'],
          nRow: 5,
          nCol: 5,
          desks: [
            { row: 0, col: 0, name: '' },
            { row: 0, col: 1, name: '' },
            { row: 0, col: 2, name: '' },
            { row: 0, col: 3, name: '' },
            { row: 0, col: 4, name: '' },
            { row: 2, col: 0, name: '' },
            { row: 2, col: 1, name: '' },
            { row: 2, col: 2, name: '' },
            { row: 2, col: 3, name: '' },
            { row: 2, col: 4, name: '' },
            { row: 4, col: 0, name: '' },
            { row: 4, col: 1, name: '' },
            { row: 4, col: 2, name: '' },
            { row: 4, col: 3, name: '' },
            { row: 4, col: 4, name: '' },
          ]
        };
      }
    }
  }

  toggleDesk = (r, c) => {
    const { desks } = this.state;
    let newDesks = desks.filter((e, i, a) => !(e.row === r && e.col === c));
    // No desks was filtered -> we need to add it
    if(newDesks.length === desks.length) {
      newDesks = [...newDesks, { row: r, col: c, name: ''}];
    }
    this.setState({
      desks: newDesks
    })
  }

  newStudent = () => {
    this.setState({
      students: [...this.state.students, '']
    });
  }

  updateStudent = (name, idx) => {
    let { students } = this.state;
    if(idx === students.length) {
      students = [...students, ''];
    }
    this.setState({
      students: students.map((s, i) => {
        if(i === idx) {
          return name;
        } else {
          return s;
        }
      })
    });
  }

  removeStudent = (idx) => {
    const { students } = this.state;
    this.setState({
      students: students.filter((student, i, arr) => {
        return i !== idx;
      })
    });
  }

  shuffleStudents = () => {
    const { desks, students } = this.state;
    if(desks.length < students.length) {
      alert('There are fewer desks than students!');
      return;
    }

    // Reset all desks
    let newDesks = desks.map((e, i) => {
      const { row, col } = e;
      return {
        row,
        col,
        name: ''
      }
    });

    let indices = desks.map((e, i) => i);
    indices = this.shuffle(indices);

    for(let i = 0; i < students.length; i++) {
      newDesks[indices[i]].name = students[i];
    }

    this.setState({
      desks: newDesks
    });
  }

  shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  setRows = (v) => {
    if(v >= 5) {
      const newDesks = this.state.desks.filter((e, i, a) => e.row < v);
      this.setState({
        desks: newDesks,
        nRow: v
      });
    }
  }

  setCols = (v) => {
    if(v >= 5) {
      const newDesks = this.state.desks.filter((e, i, a) => e.col < v);
      this.setState({
        desks: newDesks,
        nCol: v
      });
    }
  }

  setState = (state) => {
    super.setState(state);
    window.setTimeout(() => window.localStorage.setItem('randomClassroomState', JSON.stringify(this.state)), 10);
  }

  render() {
    const { students, nRow, nCol, desks } = this.state;
    return (
      <div className="App">
        <DeskTable
          toggleDesk={this.toggleDesk}
          nRow={nRow}
          nCol={nCol}
          desks={desks}
        />
        <div style={{float: 'right'}}>
          <div>
            <label>Zeilen </label>
            <input
              type='number'
              value={nRow}
              onChange={(e) => this.setRows(e.target.value)}
            />
          </div>
          <div>
            <label>Spalten </label>
            <input
              type='number'
              value={nCol}
              onChange={(e) => this.setCols(e.target.value)}
            />
          </div>
          <br/>
          <StudentList
            students={students}
            newStudent={this.newStudent}
            onChange={this.updateStudent}
            onRemove={this.removeStudent}
          />
          <button
            type='button'
            onClick={this.shuffleStudents}
            >Magic!</button>
        </div>
      </div>
    );
  }
}

export default App;
