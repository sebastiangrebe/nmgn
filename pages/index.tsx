import * as React from 'react';
import * as css from '../styles/app.scss';
import Nav from '../components/nav';

class Index extends React.Component {
  render() {
    return (
      <div className={css.container}>
        <Nav />
        <div className={`${css['row']} ${css['mb-5']}`}>
          <div className={`${css['col-lg-12']} ${css['text-center']}`}>
            <h1 className={css['mt-5']}>Index page with user</h1>
          </div>
        </div>
        <div className={css.row}>
          <div className={css['col-lg-12']}>
          </div>
        </div>
      </div>
    );
  }
}

export default Index
