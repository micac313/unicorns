import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const UnicornsView = ({
  unicorn,
  unicorns,
  setUnicorn,
  createUnicorn,
  deleteUnicorn,
  startEdit,
  updateUnicorn,
  editingId
}) => {
  return (
    <div className="p-4">
      <h2>Gestión de Unicornios 🦄</h2>

      <div className="p-fluid grid formgrid">
        <div className="field col">
          <label>Nombre</label>
          <InputText value={unicorn.name} onChange={(e) => setUnicorn({ ...unicorn, name: e.target.value })} />
        </div>
        <div className="field col">
          <label>Color</label>
          <InputText value={unicorn.color} onChange={(e) => setUnicorn({ ...unicorn, color: e.target.value })} />
        </div>
        <div className="field col">
          <label>Edad</label>
          <InputText value={unicorn.age} onChange={(e) => setUnicorn({ ...unicorn, age: e.target.value })} />
        </div>
        <div className="field col">
          <label>Poder</label>
          <InputText value={unicorn.power} onChange={(e) => setUnicorn({ ...unicorn, power: e.target.value })} />
        </div>
      </div>

      <Button
        label={editingId ? "Actualizar Unicornio" : "Crear Unicornio"}
        icon="pi pi-check"
        className="p-button-success my-3"
        onClick={editingId ? updateUnicorn : createUnicorn}
      />

      <DataTable value={unicorns} tableStyle={{ minWidth: '50rem' }}>
        <Column field="name" header="Nombre" />
        <Column field="color" header="Color" />
        <Column field="age" header="Edad" />
        <Column field="power" header="Poder" />
        <Column
          header="Acciones"
          body={(rowData) => (
            <div className="flex gap-2">
              <Button 
                icon="pi pi-pencil" 
                className="p-button-warning" 
                style={{ backgroundColor: '#f59e0b', borderColor: '#f59e0b', color: 'white' }}
                onClick={() => startEdit(rowData)} 
            />

            <Button 
                icon="pi pi-trash" 
                className="p-button-danger" 
                style={{ backgroundColor: '#ef4444', borderColor: '#ef4444', color: 'white' }}
                onClick={() => deleteUnicorn(rowData._id)} 
            />

            </div>
          )}
        />
      </DataTable>
    </div>
  );
};

export default UnicornsView;
