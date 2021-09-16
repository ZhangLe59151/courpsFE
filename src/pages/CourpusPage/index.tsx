import {Tabs} from 'antd';
import {inject, observer} from 'mobx-react';
import React, {FC, useEffect} from 'react';
import './index.less';

const {TabPane} = Tabs;

interface IProps {
  history?: any;
}

// English Corpus Mgt Page
const CorpusPage: FC<IProps> = ({history}) => {

  useEffect(() => {
    //
  }, []);

  return (
    <div className='a'>
      111
    </div>
  );
};

export default inject('commonStore')(observer(CorpusPage));
