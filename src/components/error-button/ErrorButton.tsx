import type { ReactNode } from 'react';
import { Component } from 'react';
import styles from './styles.module.scss';

interface Props {}
type State = { isError: boolean };

export class ErrorButton extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isError: false };
  }

  private handleClick = (): void => {
    this.setState({ isError: true });
  };

  public render(): ReactNode {
    const { isError } = this.state;
    if (isError) {
      throw new Error('Throw error by button');
    }

    return (
      <div className={styles.containerButton}>
        <button className={styles.button} onClick={this.handleClick}>
          Error
        </button>
      </div>
    );
  }
}
