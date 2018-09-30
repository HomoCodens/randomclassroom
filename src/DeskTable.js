import React from 'react';
import './DeskTable.css'

class DeskTable extends React.Component {
  getDeskInfo = (r, c) => {
    const { desks } = this.props;
    for(let i = 0; i < desks.length; i++) {
      const desk = desks[i];
      if(desk.row === r && desk.col === c) {
        return ({
          class: 'desk',
          name: desk.name
        });
      }
    }

    return ({
      class: 'blank',
      name: ''
    });
  }

  createTable = () => {
    const { nRow, nCol } = this.props;
    const tableDim = 800;
    const cellDim = tableDim/Math.max(5, nRow, nCol);
    let table = [];

    for (let i = 0; i < nRow; i++) {
      let children = []
      for (let j = 0; j < nCol; j++) {
        const info = this.getDeskInfo(i, j);
        children.push(<td
            onClick={() => this.props.toggleDesk(i, j)}
            className={info.class}
            key={''+i+'-'+j}
            style={{
              width: cellDim + 'px',
              height: cellDim + 'px'
            }}
          >{info.name}</td>)
      }
      table.push(<tr key={i}>{ children }</tr>)
    }
    return (<tbody>{ table }</tbody>);
}

  render() {
    return (<div style={{float: 'left'}}>
      <table className='deskTable'>
          { this.createTable() }
        </table>
      <label>Click cells to switch them between desk and open space.</label>
    </div>)
  }
}

export default DeskTable;
