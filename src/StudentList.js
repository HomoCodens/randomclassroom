import React, { Component } from 'react';

class StudentList extends Component {
  render() {
    return (<div>
      <label>Students</label>
      {this.props.students.map((name, i) => {
        return (<div key={i}>
          <input
            type='text'
            value={name}
            onChange={
              (e) => this.props.onChange(e.target.value, i)
            }></input>
            <button
              type='button'
              onClick={() => this.props.onRemove(i)}
            >-</button>
          </div>)
      })}
      <button
        type='button'
        onClick={this.props.newStudent}
        >+</button>
    </div>);
  }
}

export default StudentList;
