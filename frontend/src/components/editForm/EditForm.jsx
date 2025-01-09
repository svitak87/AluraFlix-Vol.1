import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { updateVideo } from "../../redux/actions";
import PopUpEditSuccess from "./popup/PopUpEditSuccess";
import * as Yup from "yup";
import "./EditForm.css";

const EditForm = ({
  setShowEditForm,
  setRefresh,
  id,
  title,
  description,
  embedUrl,
  thumbnail,
}) => {
  const[showPopUp, setShowPopUp] = useState(false)
  const dispatch = useDispatch();

  const initialValues = {
    title: "",
    description: "",
    embedUrl: "",
    thumbnail: "",
    category: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string(),
    description: Yup.string(),
    embedUrl: Yup.string().url("La url debe ser válida"),
    thumbnail: Yup.string().url("Debe ser una URL válida"),
    category: Yup.string().oneOf(["Backend", "Frontend"]),
  });

  const handleSubmit = async (values) => {
    try {
      await dispatch(updateVideo(id, values));
      setRefresh((prevState) => !prevState);
      setShowPopUp((prevState) => !prevState)
    } catch (error) {
      console.log(error);
    }
  };
  const closeEditForm = () => {
    setShowEditForm((prevState) => !prevState);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ resetForm }) => (
        <div className="overlay">
          <Form className="edit-form-container">
            <h2 className="title-edit-form">Editar video</h2>
            <IoMdCloseCircleOutline
              className="close-edit-form-icon"
              onClick={closeEditForm}
            />
            <div className="fields-container">
              <label htmlFor="title">Título:</label>
              <Field
                name="title"
                type="text"
                placeholder={title}
                className="input"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="error-message"
              />
            </div>

            <div className="fields-container">
              <label htmlFor="category">Categoría:</label>
              <Field as="select" name="category" className="input">
                <option value="">Selecciona una categoría</option>
                <option value="Backend">Backend</option>
                <option value="Frontend">Frontend</option>
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="error-message"
              />
            </div>

            <div className="fields-container">
              <label htmlFor="thumbnail">Imagen:</label>
              <Field
                name="thumbnail"
                type="text"
                placeholder={thumbnail}
                className="input"
              />
              <ErrorMessage
                name="thumbnail"
                component="div"
                className="error-message"
              />
            </div>

            <div className="fields-container">
              <label htmlFor="embedUrl">Enlace del Video:</label>
              <Field
                name="embedUrl"
                type="text"
                placeholder={embedUrl}
                className="input"
              />
              <ErrorMessage
                name="embedUrl"
                component="div"
                className="error-message"
              />
            </div>

            <div className="fields-container">
              <label htmlFor="description">Descripción:</label>
              <Field
                as="textarea"
                name="description"
                placeholder={description}
                className="input"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="error-message"
              />
            </div>
            <div className="buttons-edit-container">
              <button type="submit">Guardar</button>
              <button onClick={resetForm}>Limpiar</button>
            </div>
          </Form>
          {showPopUp && <PopUpEditSuccess setShowPopUp={setShowPopUp} setShowEditForm={setShowEditForm}/>}
        </div>
      )}
    </Formik>
  );
};

export default EditForm;
