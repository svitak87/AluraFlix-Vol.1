import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import "./CreateForm.css";
import * as Yup from "yup";
import { createVideo } from "../redux/actions";
import PopUpSuccess from "./popup/PopUpSuccess";

const CreateForm = () => {
  const dispatch = useDispatch();
  const [showPopUp, setShowPopUp] = useState(false);

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
    console.log("Datos del formulario:", values);
    try {
      await dispatch(createVideo(values));
      setShowPopUp(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ resetForm }) => (
        <div>
          <Form className="form-container">
            <div className="header-form-createcontainer">
              <h2 className="title-form">NUEVO VIDEO</h2>
              <p>COMPLETA EL FORMULARIO PARA CREAR UN NUEVO VIDEO</p>
              <p>Crear tarjeta:</p>
            </div>
            <div className="sub-container">
              <label htmlFor="title">Título:</label>
              <Field
                name="title"
                type="text"
                placeholder="Escribe el título"
                className="text-input"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="error-message"
              />
            </div>

            <div className="sub-container">
              <label htmlFor="category">Categoría:</label>
              <Field as="select" name="category" className="text-input">
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

            <div className="sub-container">
              <label htmlFor="thumbnail">Imagen:</label>
              <Field
                name="thumbnail"
                type="text"
                placeholder="ingresa la url"
                className="text-input"
              />
              <ErrorMessage
                name="thumbnail"
                component="div"
                className="error-message"
              />
            </div>

            <div className="sub-container">
              <label htmlFor="embedUrl">Enlace del Video:</label>
              <Field
                name="embedUrl"
                type="text"
                placeholder="URL del video"
                className="text-input"
              />
              <ErrorMessage
                name="embedUrl"
                component="div"
                className="error-message"
              />
            </div>

            <div className="sub-container">
              <label htmlFor="description">Descripción:</label>
              <Field
                as="textarea"
                name="description"
                placeholder="Escribe una descripción"
                className="text-input"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="error-message"
              />
            </div>
            <div className="buttons-create-container">
              <button type="submit">
                Guardar
              </button>
              <button onClick={resetForm}>Limpiar</button>
            </div>
          </Form>
          {showPopUp && <PopUpSuccess setShowPopUp={setShowPopUp} />}
        </div>
      )}
    </Formik>
  );
};

export default CreateForm;
