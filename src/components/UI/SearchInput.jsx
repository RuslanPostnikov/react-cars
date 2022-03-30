const SearchInput = ({setSearchTerm, searchTerm}) => (
        <input
            type="text"
            style={{width: '100%', marginBottom: 20, paddingLeft: 10, outline: 'none'}}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={`Search ${searchTerm}`}
        />
);


export default SearchInput;
