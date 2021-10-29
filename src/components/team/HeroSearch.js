import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { searchHeroAction } from "../../redux/heroReducer";
import Error from "../Error";

const HeroSearch = () => {
  const dispatch = useDispatch();
  const { error } = useSelector(store => store.hero)
  return (
    <div>
      <h2 className="text-white  ml-4">Search Hero</h2>
      <Formik
        initialValues={{
          heroName: "",
        }}
        validate={(value) => {
          const errors = {};
          if (value.heroName === "") errors.heroName = "empty";
          return errors;
        }}
        onSubmit={(value) => {
          console.log(value);
          dispatch(searchHeroAction(value));
        }}
      >
        <Form className="form-inline mb-5">
          <div className='form-group  mx-3 '>
         <Field
              className="form-control mb-2 ml-2 "
              id="heroName"
              name="heroName"
              placeholder="agree hero"
            />

            <button className="btn btn-primary ml-2 mb-2" type="submit">
              Search
            </button>
          </div>
          <div className="block">
            <ErrorMessage
              name="heroName"
              component="div"
              className="text-danger"
            />
          </div>
        </Form>
      </Formik>
        {error&&<Error error={error} />}
      
    </div>
  );
};
export default HeroSearch;
