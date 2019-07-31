import React from 'react';
import Cell from '../cell';
import PropsType from 'prop-types';
import {Context} from '../../App';
import './column.css';

export default class Column extends React.Component {
    static propTypes = {
        columIndex: PropsType.number,
    }
    
    showCell = (index, columIndex) => {
        return <Cell 
                    key={index}
                    index={index}
                    columIndex={columIndex}
                />
    }
    render() {
        let cell = [];
        return(
            <div className='column'>
                <Context.Consumer>
                    {context => {
                            for(let i = 0; i <= context.field.cell; i++) {
                                cell.push(this.showCell(i, this.props.columIndex));
                            }
                            return cell;
                        }
                    }
                </Context.Consumer> 
            </div>   
        );
    }
}