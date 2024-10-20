import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

    instituicaoForm: FormGroup;

    instituicao: string = null;
    curso: string = null;
    notageral: number = null;
    notaporcurso: number = null;
    media: number = null;

    public mensagemsucesso: boolean = false;
    public mensagemerro: boolean = false;
    public isLoadingResults = false;

    constructor(
        private dashboardService: DashboardService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.instituicaoForm = this.formBuilder.group({
            'instituicao': [null, Validators.required],
            'notageral': [null, Validators.required],
            'curso': [null, Validators.required],
            'notaporcurso': [null, Validators.required],
            'media': [null, Validators.required]
        });

        this.mensagemsucesso = false;
        this.mensagemerro = false;
    }

    onFormSubmit(form: NgForm) {
        console.log(form)
        this.isLoadingResults = true;
        this.dashboardService.addInstituicao(form).subscribe(response => {
            this.isLoadingResults = false;
            if (response) {
                this.mensagemsucesso = true;
                setTimeout(() => { this.mensagemsucesso = false; }, 5000);
            } else {
                this.mensagemerro = true;
                setTimeout(() => { this.mensagemerro = false; }, 5000);
            }
        }, error => {
            console.log(error);
            this.isLoadingResults = false;
            this.mensagemerro = true;
            setTimeout(() => { this.mensagemerro = false; }, 5000);
        });
    }

}
