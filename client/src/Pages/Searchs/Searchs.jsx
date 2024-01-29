import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;
import { useContext } from 'react';
import { MyContext } from '../../component/MyContext';

const Searchs = () => {
    const navigate = useNavigate();
    const { setSearch } = useContext(MyContext);
    const onSearch = async (value) => {
        setSearch(value);
        navigate('/searchResult');
    };
    return (
        <div>
            <div>
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                />
            </div>
        </div>
    )
}

export default Searchs;