import React, { ChangeEvent, FormEvent, useState } from "react";
import { searchProducts } from "../services/productsService";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
    onSearch: (results: any[]) => void;
}

/* const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    let navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await searchProducts(searchQuery);
            const data = response.data;
            onSearch(data);

        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    return (
        <form onSubmit={handleSearch} className="mb-5">
            <div className="search input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="מה אתה מחפש היום?"
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="submit">
                        חיפוש
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SearchBar;
 */
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    let navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await searchProducts(searchQuery);
            const data = response.data;
            onSearch(data);

            // After performing the search, navigate to the product page
            navigate('/products');

        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    return (
        <form onSubmit={handleSearch} className="mb-5">
            <div className="search input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="מה אתה מחפש היום?"
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="submit">
                        חיפוש
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SearchBar;