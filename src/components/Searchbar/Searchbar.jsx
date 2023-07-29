import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { BsSearch } from 'react-icons/bs';

import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  ErrorText,
} from './Searchbar.styled';

const validationSchema = Yup.object().shape({
  searchInput: Yup.string().required('You need to type something'),
});

export const Searchbar = ({ handleSearch }) => {
  const handleSubmit = ({ searchInput }, { resetForm }) => {
    handleSearch(searchInput);
    console.log(handleSearch);
    resetForm();
  };

  return (
    <Header>
      <Formik
        initialValues={{ searchInput: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <SearchForm>
          <SearchFormButton type="submit">
            <BsSearch />
          </SearchFormButton>
          <SearchFormInput
            type="text"
            name="searchInput"
            autoComplete="off"
            autoFocus
            placeholder="Search images"
          />
          <ErrorText name="searchInput" component="div" />
        </SearchForm>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
