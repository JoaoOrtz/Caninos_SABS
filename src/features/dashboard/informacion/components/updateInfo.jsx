import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInfo, putInfo } from "../services/info.service";
import { AlertSuccess } from "../../../../shared/alert/success";

export const UpdateInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formInfo, setFormInfo] = useState({
    tittleLanding: "",
    tittleWelcom: "",
    text1Welcom: "",
    text2Welcom: "",
    imageLogoWelcom: "",
    tittleOffer: "",
    tittleOfferCard1: "",
    textOfferCard1: "",
    tittleOfferCard2: "",
    textOfferCard2: "",
    tittleOfferCard3: "",
    textOfferCard3: "",
    tittleOfferCard4: "",
    textOfferCard4: "",
    tittleAbout: "",
    imageAbout: "",
    text1About: "",
    text2About: "",
    text3About: "",
    tittleAboutcard1: "",
    text1Aboutcard1: "",
    text2Aboutcard1: "",
    tittleAboutcard2: "",
    text1Aboutcard2: "",
    text2Aboutcard2: "",
    tittleAboutcard3: "",
    text1Aboutcard3: "",
    text2Aboutcard3: "",
    tittleMVO: "",
    imageMVOCard1: "",
    tittleMVOCard1: "",
    textMVOCard1: "",
    imageMVOCard2: "",
    tittleMVOCard2: "",
    textMVOCard2: "",
    imageMVOCard3: "",
    tittleMVOCard3: "",
    textMVOCard3: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await getInfo(id);
          console.log(response);

          if (response.data) {
            setFormInfo(response.data[0]);
          }
        }
      } catch (error) {
        console.error("Error obteniendo datos:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await putInfo(id, formInfo);
      if (response.status === 200) {
        navigate("/dashboard/Informacion");
        AlertSuccess(
          "Información actualizada",
          "La información se ha actualizado correctamente"
        );
      }
    } catch (error) {
      console.error("Error actualizando información:", error);
    }
  };
  const back = () => {
    navigate("/dashboard/Informacion");
  };
  return (
    <>
      <button
        type="button"
        onClick={back}
        className="btn btn-primary rounded-circle d-flex align-items-center p-2 justify-content-center"
        style={{ width: "40px", height: "40px" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          style={{ width: "20px", height: "20px" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <div className="container mt-4">
        <h2 className="mb-4">Editar Información General</h2>

        <form onSubmit={handleSubmit}>
          {/* Sección Welcome */}
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              Sección Bienvenida
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Título Bienvenida</label>
                <input
                  type="text"
                  name="tittleWelcom"
                  value={formInfo.tittleWelcom}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Texto Bienvenida 1</label>
                <textarea
                  name="text1Welcom"
                  value={formInfo.text1Welcom}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Texto Bienvenida 2</label>
                <textarea
                  name="text2Welcom"
                  value={formInfo.text2Welcom}
                  onChange={handleChange}
                  className="form-control"
                  rows="3"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">URL Logo</label>
                <input
                  type="text"
                  name="imageLogoWelcom"
                  value={formInfo.imageLogoWelcom}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="https://ejemplo.com/logo.png"
                />
              </div>
            </div>
          </div>

          {/* Sección Ofertas */}
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              Sección Ofertas
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Título Sección Ofertas</label>
                <input
                  type="text"
                  name="tittleOffer"
                  value={formInfo.tittleOffer}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="mb-4 border p-3">
                  <h5>Card {num}</h5>
                  <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input
                      type="text"
                      name={`tittleOfferCard${num}`}
                      value={formInfo[`tittleOfferCard${num}`]}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                      name={`textOfferCard${num}`}
                      value={formInfo[`textOfferCard${num}`]}
                      onChange={handleChange}
                      className="form-control"
                      rows="3"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sección Nosotros */}
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              Sección Nosotros
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Título Sección</label>
                <input
                  type="text"
                  name="tittleAbout"
                  value={formInfo.tittleAbout}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">URL Imagen</label>
                <input
                  type="text"
                  name="imageAbout"
                  value={formInfo.imageAbout}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
              {[1, 2, 3].map((num) => (
                <div key={num} className="mb-3">
                  <label className="form-label">Texto {num}</label>
                  <textarea
                    name={`text${num}About`}
                    value={formInfo[`text${num}About`]}
                    onChange={handleChange}
                    className="form-control"
                    rows="3"
                  />
                </div>
              ))}

              {[1, 2, 3].map((num) => (
                <div key={num} className="mb-4 border p-3">
                  <h5>Tarjeta {num}</h5>
                  <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input
                      type="text"
                      name={`tittleAboutcard${num}`}
                      value={formInfo[`tittleAboutcard${num}`]}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Texto 1</label>
                    <textarea
                      name={`text1Aboutcard${num}`}
                      value={formInfo[`text1Aboutcard${num}`]}
                      onChange={handleChange}
                      className="form-control"
                      rows="2"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Texto 2</label>
                    <textarea
                      name={`text2Aboutcard${num}`}
                      value={formInfo[`text2Aboutcard${num}`]}
                      onChange={handleChange}
                      className="form-control"
                      rows="2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sección MVO */}
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">Sección MVO</div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Título Sección</label>
                <input
                  type="text"
                  name="tittleMVO"
                  value={formInfo.tittleMVO}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {[1, 2, 3].map((num) => (
                <div key={num} className="mb-4 border p-3">
                  <h5>Card {num}</h5>
                  <div className="mb-3">
                    <label className="form-label">URL Imagen</label>
                    <input
                      type="text"
                      name={`imageMVOCard${num}`}
                      value={formInfo[`imageMVOCard${num}`]}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input
                      type="text"
                      name={`tittleMVOCard${num}`}
                      value={formInfo[`tittleMVOCard${num}`]}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                      name={`textMVOCard${num}`}
                      value={formInfo[`textMVOCard${num}`]}
                      onChange={handleChange}
                      className="form-control"
                      rows="3"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="d-flex gap-2 justify-content-end mt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/Informacion")}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
