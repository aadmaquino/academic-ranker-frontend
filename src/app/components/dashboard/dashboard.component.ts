import { Component, OnInit, HostListener } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Instituicao } from '../../resources/classes/instituicao.class';
import { MdbTableService } from 'angular-bootstrap-md';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    elements: Instituicao[] = [];
    searchText: string = '';
    previous: string;
    isLoadingResults = true;

    constructor(
        private dashboardService: DashboardService,
        private tableService: MdbTableService
    ) { }

    @HostListener('input') oninput() {
        this.searchItems();
    }

    ngOnInit() {
        this.dashboardService.getInstituicoes().subscribe(response => {
            this.elements = JSON.parse(JSON.stringify(response.sort((x, y) => x.notageral > y.notageral ? -1 : 1)));
            this.isLoadingResults = false;

            this.tableService.setDataSource(this.elements);
            this.elements = this.tableService.getDataSource();
            this.previous = this.tableService.getDataSource();
        }, error => {
            console.log(error);
            this.isLoadingResults = false;
        });
    }

    searchItems() {
        const prev = this.tableService.getDataSource();
        if (!this.searchText) {
            this.tableService.setDataSource(this.previous);
            this.elements = this.tableService.getDataSource();
        }
        if (this.searchText) {
            this.elements = this.tableService.searchLocalDataBy(this.searchText.toLowerCase());
            this.tableService.setDataSource(prev);
        }
    }
}
