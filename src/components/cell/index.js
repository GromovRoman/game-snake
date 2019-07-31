import React from 'react';
import cn from 'classnames';
import PropsType from 'prop-types';
import {Context} from '../../App';
import './cell.css';

export default class Cell extends React.Component {
    static propTypes = {
        index: PropsType.number,
    }

    render() {
        return(
        <Context.Consumer>
            {context => {
                let isSnake = false,
                    isFruit = false;

                context.snake.forEach(element => {
                    if(element[0] === this.props.columIndex && element[1] === this.props.index) {
                        isSnake = true;
                    }
                });

                if(context.fruit[0] === this.props.columIndex && context.fruit[1] === this.props.index) {
                    isFruit = true;
                }

                return  <div className={cn('cell', {snake: isSnake, fruit: isFruit})}>
                        </div>  
                }
            }
        </Context.Consumer>  
        );
    }
}