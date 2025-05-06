import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import jsPDF from "jspdf";
import "jspdf-autotable";

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

    const exportToPDF = () => {
      const doc = new jsPDF();
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(128, 0, 128); 
      doc.text("Listado de Unicornios Mágicos", 14, 20);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      const today = new Date().toLocaleDateString();
      doc.text(`Generado el: ${today}`, 14, 30);

      const tableData = unicorns.map((unicorn) => [
        unicorn.name,
        unicorn.color,
        unicorn.power,
        unicorn.age.toString()
      ]);

      doc.autoTable({
        startY: 35,
        head: [['Nombre', 'Color', 'Poder', 'Edad']],
        body: tableData,
        theme: "grid",
        headStyles: {
          fillColor: [147, 112, 219], 
          textColor: [255, 255, 255],
          fontStyle: "bold"
        },
        alternateRowStyles: {
          fillColor: [245, 245, 255] 
        },
        margin: { top: 35 }
      });
      
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(
          `Página ${i} de ${pageCount}`,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: "center" }
        );
      }
   
      doc.save("listado-unicornios.pdf");
    };

  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-3">
        <h2>Gestión de Unicornios 🦄</h2>
        <Button 
          label="Exportar PDF" 
          icon="pi pi-file-pdf" 
          className="p-button-info" 
          onClick={exportToPDF} 
          style={{ backgroundColor: '#8a2be2', borderColor: '#8a2be2' }}
        />
      </div>

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
