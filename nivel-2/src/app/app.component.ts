import { Component } from '@angular/core';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'nivel-2';
    expandedRows = {};
    products = [];

    dispositivos = [
        {
            id: 1,
            segmento: 'Segmento I',
            cliente: 'Municipio de Ciudad Juarez',
            host: 'SW-Plaza-X',
            ip: '10.10.26.147',
            estado: 'Disponible',
            fechaCaida: 'N/A',
            fechaResolucion: 'N/A',
            noSerial: 'System-001',
            macAddress: 'A8:F7:E0:67:67:CE',
            marca: 'PlanetsGS-5220-8G',
            disponible: true
        },
        {
            id: 2,
            segmento: 'Segmento II',
            cliente: 'Empresa ABC',
            host: 'SW-Plaza-Y',
            ip: '10.10.27.148',
            estado: 'No Disponible',
            fechaCaida: '1 Sept 2024, 12:00',
            fechaResolucion: 'N/A',
            noSerial: 'System-002',
            macAddress: 'B9:F8:E1:68:68:DF',
            marca: 'PlanetsGS-5220-8G',
            disponible: false
        },
        {
            id: 3,
            segmento: 'Segmento III',
            cliente: 'Hospital General',
            host: 'SW-Plaza-Z',
            ip: '10.10.28.149',
            estado: 'Disponible',
            fechaCaida: 'N/A',
            fechaResolucion: 'N/A',
            noSerial: 'System-003',
            macAddress: 'C1:G2:H3:J4:K5:L6',
            marca: 'Cisco-X-3500',
            disponible: true
        },
        {
            id: 4,
            segmento: 'Segmento IV',
            cliente: 'Universidad UASLP',
            host: 'SW-Campus',
            ip: '10.10.29.150',
            estado: 'No Disponible',
            fechaCaida: '31 August 2024, 08:30',
            fechaResolucion: '31 August 2024, 16:00',
            noSerial: 'System-004',
            macAddress: 'D7:E8:F9:12:34:56',
            marca: 'HP-Switch-3800',
            disponible: false
        },
        {
            id: 5,
            segmento: 'Segmento V',
            cliente: 'Compañía XYZ',
            host: 'SW-Central',
            ip: '10.10.30.151',
            estado: 'Disponible',
            fechaCaida: 'N/A',
            fechaResolucion: 'N/A',
            noSerial: 'System-005',
            macAddress: 'E1:E2:E3:E4:E5:E6',
            marca: 'D-Link-DGS-1210',
            disponible: true
        },
        {
            id: 6,
            segmento: 'Segmento VI',
            cliente: 'Banco Nacional',
            host: 'SW-Norte',
            ip: '10.10.31.152',
            estado: 'Disponible',
            fechaCaida: 'N/A',
            fechaResolucion: 'N/A',
            noSerial: 'System-006',
            macAddress: 'F7:G8:H9:01:23:45',
            marca: 'Netgear-GS110TP',
            disponible: true
        },
        {
            id: 7,
            segmento: 'Segmento VII',
            cliente: 'Telecomunicaciones XYZ',
            host: 'SW-Sur',
            ip: '10.10.32.153',
            estado: 'No Disponible',
            fechaCaida: '2 Sept 2024, 09:00',
            fechaResolucion: '2 Sept 2024, 15:30',
            noSerial: 'System-007',
            macAddress: 'G1:H2:I3:J4:K5:L6',
            marca: 'TP-Link-SG2008',
            disponible: false
        },
        {
            id: 8,
            segmento: 'Segmento VIII',
            cliente: 'Empresa de Energía',
            host: 'SW-Oeste',
            ip: '10.10.33.154',
            estado: 'Disponible',
            fechaCaida: 'N/A',
            fechaResolucion: 'N/A',
            noSerial: 'System-008',
            macAddress: 'H7:I8:J9:12:34:56',
            marca: 'MikroTik-CCR1036',
            disponible: true
        },
        {
            id: 9,
            segmento: 'Segmento IX',
            cliente: 'Agencia de Gobierno',
            host: 'SW-Noreste',
            ip: '10.10.34.155',
            estado: 'No Disponible',
            fechaCaida: '3 Sept 2024, 10:45',
            fechaResolucion: 'N/A',
            noSerial: 'System-009',
            macAddress: 'I1:J2:K3:L4:M5:N6',
            marca: 'Huawei-S5700',
            disponible: false
        },
        {
            id: 10,
            segmento: 'Segmento X',
            cliente: 'Centro de Investigación ABC',
            host: 'SW-Sureste',
            ip: '10.10.35.156',
            estado: 'Disponible',
            fechaCaida: 'N/A',
            fechaResolucion: 'N/A',
            noSerial: 'System-010',
            macAddress: 'J7:K8:L9:01:23:45',
            marca: 'Juniper-EX3300',
            disponible: true
        },
        {
            id: 11,
            segmento: 'Segmento XI',
            cliente: 'Fábrica de Manufactura',
            host: 'SW-Noroeste',
            ip: '10.10.36.157',
            estado: 'Disponible',
            fechaCaida: 'N/A',
            fechaResolucion: 'N/A',
            noSerial: 'System-011',
            macAddress: 'K1:L2:M3:N4:O5:P6',
            marca: 'Aruba-2930F',
            disponible: true
        },
    ];

    constructor() { }

    expandAll() {
        // this.expandedRows = this.products.reduce((acc, p) => (acc[p.id] = true) && acc, {});
    }

    collapseAll() {
        this.expandedRows = {};
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
        }
    }

    getStatusSeverity(status: string) {
        switch (status) {
            case 'PENDING':
                return 'warning';
            case 'DELIVERED':
                return 'success';
            case 'CANCELLED':
                return 'danger';
        }
    }

    onRowExpand(event: TableRowExpandEvent) {
        // this.messageService.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
    }

    onRowCollapse(event: TableRowCollapseEvent) {
        // this.messageService.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
    }

}
