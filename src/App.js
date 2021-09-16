import {Table} from 'antd';
import './App.css';

function App() {
  const dataSource = [];
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    }
  ];
  return (
    <div className='App'>
      <header className='App-header'>aaa</header>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
}

export default App;
