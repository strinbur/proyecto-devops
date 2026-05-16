import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "./Modal";
import { FormCierreDespacho } from "./FormCierreDespacho";

export const TableDespachos = () => {
  const [despachos, setDespachos] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [despachoSeleccionado, setDespachoSeleccionado] = useState(null);

  // 🔥 FETCH CORREGIDO
  const cargarDespachos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/v1/despachos",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Despachos:", response.data);
      setDespachos(response.data);
    } catch (error) {
      console.error("Error cargando despachos:", error);
    }
  };

  useEffect(() => {
    cargarDespachos();
  }, []);

  const handleAbrirModal = (despacho) => {
    setDespachoSeleccionado(despacho);
    setOpenModal(true);
  };

  return (
    <>
      <section className="grid text-center grid-cols-12 mb-8">
        <div className="col-span-12 flex justify-center">
          <div className="col-span-10 p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-white h-full overflow-hidden">
            <table className="table-fixed">
              <thead>
                <tr className="py-10">
                  <th className="pr-10">Orden despacho</th>
                  <th className="pr-10">Orden compra</th>
                  <th className="pr-10">Dirección</th>
                  <th className="pr-10">Fecha</th>
                  <th className="pr-10">Patente</th>
                  <th className="pr-10">Estado</th>
                  <th className="pr-10">Intentos</th>
                </tr>
              </thead>

              <tbody>
                {despachos.map((d) => (
                  <tr key={d.idDespacho}>
                    <td className="pr-10 py-10">{d.idDespacho}</td>
                    <td className="pr-10 py-10">{d.idCompra}</td>
                    <td className="pr-10 py-10">{d.direccionCompra}</td>
                    <td className="pr-10 py-10">{d.fechaDespacho}</td>
                    <td className="pr-10 py-10">{d.patenteCamion}</td>

                    {/* 🔥 CORREGIDO: antes era "entregado" */}
                    <td className="pr-10 py-10">
                      {d.despachado
                        ? "Despacho entregado"
                        : "Despacho pendiente"}
                    </td>

                    <td className="pr-10 py-10">{d.intento}</td>

                    <td>
                      <button
                        onClick={() => handleAbrirModal(d)}
                        className="py-1 bg-orange-200 px-8 rounded-xl shadow-md hover:bg-orange-300/70 transition-all duration-300"
                      >
                        Cerrar despacho
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        {despachoSeleccionado && (
          <FormCierreDespacho
            despacho={despachoSeleccionado}
            onClose={() => {
              setOpenModal(false);
              cargarDespachos(); // refresca tabla
            }}
          />
        )}
      </Modal>
    </>
  );
};