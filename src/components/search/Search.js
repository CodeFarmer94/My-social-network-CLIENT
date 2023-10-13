import { TbWorldSearch } from "react-icons/tb";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import './search.css'
import SearchList from "./searchList/SearchList";
import { useState } from "react";

function Search() {
    // Local State
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchInput, setSearchInput] = useState(""); // State to store input value

    // Yup schema for form validation
    const schema = yup.object().shape({
        searchInput: yup.string().required(),
    });

    // React Hook Form
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const { data, isLoading, refetch } = useQuery(
        'search',
        async () => {
            try {
                const res = await fetch(`http://localhost:8030/user/search/${searchInput}`, { // Use searchInput as a variable
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });
                console.log('searching');
                const data = await res.json();
                return data;
            } catch (error) {
                console.log(error.message);
            }
        },
        {
            enabled: false,
        }
    );

    const trimmedSearchList = data?.splice(0, 5);

    const handleChange = (e) => {
        const inputValue = e.target.value;
        setSearchInput(inputValue); // Update the input value in state
        setIsSearchActive(true);
        refetch(); // Trigger the query with the updated input value
    };

    if (isLoading) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <form className='search-group'>
            <div className="input-container">
                <TbWorldSearch id='search-icon'/>
                <input
                    type="text"
                    placeholder="Search"
                    {...register('searchInput')}
                    value={searchInput}
                    onChange={handleChange}
                />
            </div>
            <div className="search-results">
                {isSearchActive && trimmedSearchList && <SearchList searchList={trimmedSearchList} />}
            </div>
        </form>
    );
}

export default Search;
