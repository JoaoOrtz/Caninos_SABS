import React, { useEffect, useState } from "react";
import { getInfo } from "./services/info.service";
import { useNavigate } from "react-router-dom";

export const Informacion = () => {
  const [dataInfo, setDataInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInfo();
        setDataInfo(response.data);
      } catch (error) {
        console.error("Error obteniendo datos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5 p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando información...</p>
      </div>
    );
  }

  if (dataInfo.length === 0) {
    return <div className="alert alert-warning m-5">No se encontraron datos</div>;
  }

  const mainData = dataInfo[0];

  const viweUpdateInfo = () => {
    navigate("/dashboard/Editar-info/" +mainData.id);
  };

  const Card = ({ id, title, text, content, image, icon, fullWidth }) => (
    <div
      id={`card-${id}`}
      className={`card h-100 ${fullWidth ? "bg-primary bg-opacity-10" : ""}`}
    >
      <div className="card-body d-flex flex-column">
        {!fullWidth && image && (
          <img
            src={image}
            alt={title}
            className="card-img-top mb-3 mx-auto w-50"
          />
        )}
        {icon && <div className="fs-4 mb-2 text-center">{icon}</div>}
        <h3
          className={`card-title ${
            fullWidth ? "fs-4 text-primary" : "fs-5"
          } text-center mb-3`}
        >
          {title}
        </h3>
        {content || (
          <p className="card-text text-secondary text-center fs-6">{text}</p>
        )}
        <button
          onClick={viweUpdateInfo}
          className="btn btn-primary btn-sm mt-auto mx-auto px-4"
        >
          Editar
        </button>
      </div>
    </div>
  );

  let cardId = 0;

  const sectionGroups = [
    // Sección Bienvenida
    {
      title: "Bienvenida",
      cards: [
        {
          id: cardId++,
          title: mainData.tittleWelcom,
          content: (
            <div className="d-flex flex-column flex-md-row align-items-center gap-3 p-3">
              <img
                src={mainData.imageLogoWelcom}
                alt="Logo"
                className="img-fluid w-25"
              />
              <div>
                <p className="text-secondary mb-2 fs-6">{mainData.text1Welcom}</p>
              </div>
            </div>
          ),
          fullWidth: true,
        },
      ],
    },
    // Sección Ofertas
    {
      title: "Ofertas",
      cards: [1, 2, 3, 4].map((num) => ({
        id: cardId++,
        title: mainData[`tittleOfferCard${num}`],
        text: mainData[`textOfferCard${num}`],
      })),
    },
    // Sección Nosotros
    {
      title: "Nosotros",
      cards: [
        {
          id: cardId++,
          title: mainData.tittleAbout,
          content: (
            <div className="row g-3 p-3">
              <div className="col-md-6">
                <img
                  src={mainData.imageAbout}
                  alt="Nosotros"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-md-6">
                <p className="text-secondary fs-6">{mainData.text1About}</p>
                <p className="text-secondary fs-6">{mainData.text2About}</p>
                <p className="text-secondary fs-6">{mainData.text3About}</p>
              </div>
            </div>
          ),
          fullWidth: true,
        },
        ...[1, 2, 3].map((num) => ({
          id: cardId++,
          title: mainData[`tittleAboutcard${num}`],
          text: `${mainData[`text1Aboutcard${num}`]}\n${mainData[`text2Aboutcard${num}`]}`,
          icon: ["👥", "📅", "🐾"][num - 1],
        })),
      ],
    },
    // Sección MVO
    {
      title: "Misión, Visión y Objetivo",
      cards: [1, 2, 3].map((num) => ({
        id: cardId++,
        title: mainData[`tittleMVOCard${num}`],
        text: mainData[`textMVOCard${num}`],
        image: mainData[`imageMVOCard${num}`],
      })),
    },
  ];

  return (
    <div className="container py-4">
      <h1 className="text-center display-5 text-primary mb-4">
        {mainData.tittleLanding}
      </h1>

      {sectionGroups.map((section, index) => (
        <section key={index} className="mb-5">
          <h2 className="h4 mb-4 pb-2 border-bottom border-2 border-primary">
            {section.title}
          </h2>
          <div className="row g-4">
            {section.cards.map((card) => (
              <div
                key={card.id}
                className={`col-12 ${
                  card.fullWidth ? "" : "col-md-6 col-lg-4 col-xl-3"
                }`}
              >
                <Card {...card} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
