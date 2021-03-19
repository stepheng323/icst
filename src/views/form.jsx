import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Form() {
  const [values, setValues] = useState({ name: '', category: '' });
  const [loadingCatergory, setLoadingCategory] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const catergoriesUrl = 'http://questence.tqfe.net/api/v1/categories';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(catergoriesUrl);
        setCategoryOptions(data.data);
        setLoadingCategory(false);
      } catch (error) {
        throw error;
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input onChange={handleChange} type="text" name="name" />
        </label>

        <label>
          Category:
          <select name="category" onChange={handleChange}>
            {!loadingCatergory ? (
              categoryOptions.map((categoryOption) => {
                const { name, id } = categoryOption;
                return (
                  <option key={id} value={name}>
                    {name}
                  </option>
                );
              })
            ) : (
              <option>Loading</option>
            )}
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
      {showResult && (
        <div>
          <p>Name: {values.name}</p>
          <p>Category: {values.category}</p>
        </div>
      )}
    </div>
  );
}

export default Form;
