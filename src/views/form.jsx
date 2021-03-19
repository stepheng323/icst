import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Form() {
  const [values, setValues] = useState({ name: '', category: '' });
  const [loadingCatergory, setLoadingCategory] = useState(true);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [displayValue, setDisplayValue]= useState(null);
  
  
  useEffect(() => {
    const fetchCategories = async () => {
      const catergoriesUrl = 'http://questence.tqfe.net/api/v1/categories';
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
    if(!values.category || !values.name){
      return
    }
    setDisplayValue(values);
    setValues({ name: '', category: '' })
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input onChange={handleChange} value={values.name} type="text" name="name" />
        </label>

        <label>
          Category:
          <select name="category" value={values.category} onChange={handleChange}>
          <option>Please select</option>
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
      {displayValue && (
        <div>
          <p>Name: {displayValue.name}</p>
          <p>Category: {displayValue.category}</p>
        </div>
      )}
    </div>
  );
}

export default Form;
