import React from 'react';
import { Link } from 'react-router-dom';
import Rank from './dataRank';
import './ranking.css';

const arrNames = ['', 'Nome', 'Mês', 'Semana', 'Dia'];

class RankCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataRank: Rank.sort((a, b) => b.porcentageMonth - a.porcentageMonth),
      oldState: null,
      selectedrisk: '',
    };
  }

  componentDidMount() {
    const { dataRank } = this.state;
    this.setState({ dataRank: dataRank.filter((item) => item.active) });
  }

  riskRankChange(event, name) {
    const { oldState } = this.state;
    const { value } = event.target;
    const stateManager = Rank.filter((elem) => elem.risk === value);
    this.setState({
      [name]: value,
      dataRank: value === '' ? oldState : stateManager,
    });
  }

  filterRank(item) {
    const { dataRank } = this.state;
    this.setState({ dataRank: dataRank.sort((a, b) => b[item] - a[item]) });
  }

  TableHead() {
    const { dataRank, selectedrisk } = this.state;
    const arrKeys = Object.keys(dataRank[0]);
    return (
      <thead>
        <tr className="thead-css">
          {arrKeys.map((item, index) => {
            if (item === 'risk') {
              return (
                <th key={item}>
                  <select
                    value={selectedrisk}
                    onChange={(event) =>
                      this.riskRankChange(event, 'selectedrisk')
                    }
                  >
                    <option value="">Todos</option>
                    <option value="Alto">Alto</option>
                    <option value="Médio">Médio</option>
                    <option value="Baixo">Baixo</option>
                  </select>
                </th>
              );
            }
            if (index > 5) return null;
            if (item !== 'imagePath') {
              return (
                <th key={item} onClick={() => this.filterRank(item)}>
                  {arrNames[index]}
                </th>
              );
            }
            return <th key={item}>{null}</th>;
          })}
        </tr>
      </thead>
    );
  }

  tdCreator(info) {
    return (
      Object.values(info).map((body, index) => {
        if (index < 6) {
          return (
            <th key={`${body} - ${Math.random()}`}>
              <Link to={{
                pathname: `/profile/${info.name}/${info.porcentageMonth}/${info.porcentageWeek}/${info.porcentageday}/${info.risk}/${info.imagePath}`,
              }}>{body}</Link>
            </th>
          );
        }
        return null;
      })
    );
}
  TableBody() {
    const { dataRank } = this.state;
    return (
      <tbody>
        {dataRank.map((info) => (
          <tr key={info.id}>{this.tdCreator(info)}</tr>
        ))}
      </tbody>
    );
  }

  render() {
    return (
      <div>
        <h1>Melhores Consultores de Investimento</h1>
        <table className="rank-table">
          {this.TableHead()}
          {this.TableBody()}
        </table>
      </div>
    );
  }
}

export default RankCreator;
