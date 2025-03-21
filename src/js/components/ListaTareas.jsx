import "../../styles/index.css"; 
import { FaXmark } from "react-icons/fa6";

export const ListaTareas = ({ tareasAgregadas, eliminar }) => {
  

  return (
    <table>
      <thead>
        <tr>
          <th>
            <h2>Lista de tareas agregadas:</h2>
          </th>
        </tr>
      </thead>
      <tbody>
        {tareasAgregadas?.map((tareas) => (
          <tr key={tareas.label}>
            <td>
              {tareas.label} 
              <FaXmark className="icon" type="button" onClick={() => eliminar(tareas.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListaTareas;
