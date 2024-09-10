import { Component } from '@angular/core';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { DispositivosService } from './services/dispositivos.service';
import { Dispositivo } from './models/dispositivo.model';
import { DispositivoProblema } from './models/dispositivo-problema.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'nivel-2';
  expandedRows = {};
  dispositivos: Dispositivo[] = [];
  problemasInterfaces: { [key: number]: DispositivoProblema[] } = {};

  constructor(private dispositivosService: DispositivosService) { }

  ngOnInit(): void {
    const params = this.getParentUrlParams();
    this.cargarDispositivos(params);
  }

  getParentUrlParams(): any {
    let parentUrl;

    if (window !== window.parent) {
      try {
        parentUrl = window.parent.location.href;
      } catch (error) {
        console.error("No se puede acceder a la URL del padre por restricciones de CORS", error);
        parentUrl = 'http://10.71.35.121:3000/d/c1cccfd2-b9f5-49a2-9b86-b91e66293a4f/detalle-por-clientes-puntas?orgId=1&var-Cliente=All&var-Puntas=All&var-Segmento=All&var-Areas=All&var-Tenant=All&var-Proyecto=All&var-Sitio=All&var-Sucursal=All';
      }
    } else {
      parentUrl = 'http://10.71.35.121:3000/d/c1cccfd2-b9f5-49a2-9b86-b91e66293a4f/detalle-por-clientes-puntas?orgId=1&var-Cliente=All&var-Puntas=All&var-Segmento=All&var-Areas=All&var-Tenant=All&var-Proyecto=All&var-Sitio=All&var-Sucursal=All';
    }

    const urlParams = new URLSearchParams(new URL(parentUrl).search);

    const params = {
      cliente: urlParams.getAll('var-Cliente').length ? urlParams.getAll('var-Cliente') : ['All'],
      puntas: urlParams.getAll('var-Puntas').length ? urlParams.getAll('var-Puntas') : ['All'],
      afectadas: urlParams.get('var-Afectadas') || '0',
      hoy: urlParams.get('var-Hoy') || '0',
      segmento: urlParams.getAll('var-Segmento').length ? urlParams.getAll('var-Segmento') : ['All'],
      areas: urlParams.getAll('var-Areas').length ? urlParams.getAll('var-Areas') : ['All'],
      tenant: urlParams.getAll('var-Tenant').length ? urlParams.getAll('var-Tenant') : ['All'],
      proyecto: urlParams.getAll('var-Proyecto').length ? urlParams.getAll('var-Proyecto') : ['All'],
      sitio: urlParams.getAll('var-Sitio').length ? urlParams.getAll('var-Sitio') : ['All'],
      sucursal: urlParams.getAll('var-Sucursal').length ? urlParams.getAll('var-Sucursal') : ['All']
    };

    console.log('Parámetros extraídos de la URL:', params);
    return params;

  }

  cargarDispositivos(params: any): void {
    this.dispositivosService.obtenerDispositivos(params).subscribe((data) => {
      this.dispositivos = data.map((dispositivo, index) => ({
        ...dispositivo,
        id: index + 1
      }));
      console.log(this.dispositivos);
    });
  }

  onRowExpand(event: TableRowExpandEvent) {
    const dispositivo = event.data;

    this.dispositivosService.obtenerProblemasInterfaces(dispositivo.host).subscribe((data) => {
      this.problemasInterfaces[dispositivo.id] = data;
      console.log(`Problemas de interfaces para el dispositivo ${dispositivo.host}:`, data);
    });
  }

  onRowCollapse(event: TableRowCollapseEvent) {
    const dispositivo = event.data;
    delete this.problemasInterfaces[dispositivo.id];
  }

  expandAll() {
    this.expandedRows = this.dispositivos.reduce((acc: { [key: number]: boolean }, dispositivo: Dispositivo) => {
      acc[dispositivo.id] = true;
      return acc;
    }, {});
  }

  collapseAll() {
    this.expandedRows = {};
  }
}
