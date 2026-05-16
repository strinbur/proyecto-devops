import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

export const FormDespacho = ({ venta, onClose }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const jsonData = {
      fechaDespacho: data.fechaDespacho,
      patenteCamion: data.patenteCamion,
      intento: 0,
      despachado: false,
      idCompra: venta.idVenta,
      direccionCompra: venta.direccionCompra,
      valorCompra: venta.valorCompra,
    };

    const jsonDataSales = {
      despachoGenerado: true,
    };

    try {
      // 1. actualizar venta
      await axios.put(
        `http://localhost:8080/api/v1/ventas/${venta.idVenta}`,
        jsonDataSales,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      // 2. crear despacho
      await axios.post(
        `http://localhost:8081/api/v1/despachos`,
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      Swal.fire({
        title: "Despacho registrado 🛻!",
        text: "El despacho fue creado correctamente",
        icon: "success",
        confirmButtonText: "OK",
      });

      onClose();
    } catch (error) {
      console.error("Error creando despacho:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center text-center px-24 text-xl"
    >
      <h2 className="text-3xl font-bold mb-10 text-teal-600">
        Ingreso de orden de despacho
      </h2>

      <input type="date" {...register("fechaDespacho", { required: true })} />
      <input type="text" {...register("patenteCamion", { required: true })} />

      <input disabled value={venta.idVenta} />
      <input disabled value={venta.direccionCompra} />
      <input disabled value={venta.valorCompra} />

      <button type="submit">Asignar despacho</button>
    </form>
  );
};