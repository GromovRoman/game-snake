import React from 'react';
import Column from '../column';
import PropTypes from 'prop-types';
import './table.css';
import {Context} from '../../App';

export default class Table extends React.Component {
    renderColumn = (index) => {
        return <Column 
                    key={index}
                    columIndex={index}
                />
    }
    render() {
        let columns = [];
        return(
            <>
                <div className='table'>
                    <Context.Consumer>
                        {context => {
                                for(let i = 0; i <= context.field.column; i++) {
                                    columns.push(this.renderColumn(i));
                                }
                                return columns;
                            }
                        }
                    </Context.Consumer> 
                </div>
            </>
        );
    }
} 